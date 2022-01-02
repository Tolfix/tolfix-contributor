import { Application, Router } from "express";
import CacheDiscordLink from "../../../../Cache/Server/CacheDiscordLink";
import { Discord_Client_Id, Discord_Client_Secret, Discord_Guild_Id, Full_Domain, Github_Client_Id, Github_Client_Secret } from "../../../../Config";
import ContributorModel from "../../../../Database/Schemas/Contributor";
import { client } from "../../../../Discord/Client";
import AW from "../../../../Lib/AW";
import GetDiscordUser from "../../../../Lib/Discord/GetDiscordUser";
import { GetGithubUser } from "../../../../Lib/Github/GetGithubUser";
import Logger from "../../../../Lib/Logger";
import fetch from "node-fetch";

export default class JoinRouter
{
    private server: Application;
    private router = Router();

    constructor(server: Application, version: string)
    {
        this.server = server;
        this.server.use(`/api/${version}/link`, this.router);

        this.router.get("/discord", async (req, res) => {
            // Redirect to github to authorize, and once back, we authorize with discord
            // Check if they have a session
            const session = CacheDiscordLink.get(req.sessionID);
            if(!session)
            {
                let github_uri = `https://github.com/login/oauth/authorize?client_id=${Github_Client_Id}&scope=${encodeURIComponent("user:email read:user")}&redirect_uri=${encodeURIComponent(`${Full_Domain}/api/v1/link/discord/github/callback`)}`
                return res.redirect(github_uri);
            }

            // Now we authorize with discord.
            let discord_uri = `https://discord.com/oauth2/authorize?client_id=${Discord_Client_Id}&redirect_uri=${encodeURIComponent(`${Full_Domain}/api/v1/link/discord/callback`)}&response_type=code&scope=${encodeURIComponent("identify guilds.join")}`

            return res.redirect(discord_uri);
        });

        this.router.get("/discord/callback", async (req, res) => {
            const [auth, A_Error] = await AW(await fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                //@ts-ignore
                body: new URLSearchParams({
                    "client_id": Discord_Client_Id,
                    "client_secret": Discord_Client_Secret,
                    "grant_type": "authorization_code",
                    "code": req.query.code,
                    "redirect_uri": `${Full_Domain}/api/v1/link/discord/callback`,
                    "scope": "identify"
                })
            }));

            if(!auth || A_Error)
                return res.status(500).send("Error to fetch token information from discord");

            let token = (await auth.json())["access_token"];
            
            // Now we get the user
            const user = await GetDiscordUser(token);

            if(!user)
                return res.status(500).send("Error to fetch user from discord");

            // And for safety, check if someone has already been linking with this user id
            const [contributor, e_contributor] = await AW(await ContributorModel.findOne({ discord_id: user }));

            if(contributor || e_contributor)
                return res.status(500).send("Error contributor already exists with id, contact administrator for change");

            // Now we can link the user
            const [contributor_, e_contributor_] = await AW(
                await ContributorModel.findOneAndUpdate(
                    { email: CacheDiscordLink.get(req.sessionID) }, 
                    { discord_id: user }
                )
            );

            if(!contributor_)
                return res.status(500).send("Error contributor_");

            // And remove the session
            CacheDiscordLink.delete(req.sessionID);
            
            // We can also make them join our guild now
            (client.guilds.cache.get(Discord_Guild_Id))?.members.add(await client.users?.fetch(user), {
                accessToken: token,
            }).then((user) => Logger.info(`Added user ${user.user.id} to the guild.`));

            return res.redirect(`https://github.tolfix.com/`);
        });

        this.router.get("/discord/github/callback", async (req, res) => {
            let url = `https://github.com/login/oauth/access_token?client_id=${Github_Client_Id}&client_secret=${Github_Client_Secret}&code=${req.query.code}`
            const [auth, A_Error] = await AW(await fetch(url, {
                method: "POST",
                headers: {
                    accept: "application/json"
                },
            }));

            if(!auth || A_Error)
                return res.status(500).send("Something went wrong, please try again later");

            let token = (await auth.json() as any)["access_token"];

            const [user, e_user] = await AW(await GetGithubUser(token));

            if(!user || e_user)
                return res.status(500).send("Something went wrong, please try again later");

            // Check if this user has an account in the first place.
            let [contributor, e_contributor] = await AW(await ContributorModel.findOne({ github_id: user.github_id }));

            if(!contributor)
            {
                // Create one and continue
                contributor = await (new ContributorModel({
                    github_id: user.github_id,
                    email: user.email,
                    github_email: user.email,
                }).save());
            }

            // Now we have a contributor, lets link with discord.
            CacheDiscordLink.set(req.sessionID, contributor.email);

            // And redirect to discord
            return res.redirect("/api/v1/link/discord");
        });

    }
}