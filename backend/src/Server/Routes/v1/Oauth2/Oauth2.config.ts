import { Application, Router } from "express";
import AW from "../../../../Lib/AW";
import fetch from "node-fetch";
import { Full_Domain, Github_Client_Id, Github_Client_Secret } from "../../../../Config";
import { GetGithubUser } from "../../../../Lib/Github/GetGithubUser";
import ContributorModel from "../../../../Database/Schemas/Contributor";
import CacheSession from "../../../../Cache/Server/CacheSession";
import { SendEmail } from "../../../../Email/SendEmail";

export default class Oauth2Router
{
    private server: Application;
    private router = Router();

    constructor(server: Application, version: string)
    {
        this.server = server;
        this.server.use(`/api/${version}/oauth2`, this.router);

        this.router.get("/github", (req, res) => {
            let github_uri = `https://github.com/login/oauth/authorize?client_id=${Github_Client_Id}&scope=${encodeURIComponent("user:email read:user")}&redirect_uri=${encodeURIComponent(`${Full_Domain}/api/v1/oauth2/github/callback`)}`
            return res.redirect(github_uri);
        });

        this.router.get("/github/callback", async (req, res) => {
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

            let dataObjectUser = {
                email: user.email,
                github_id: user.github_id,
                github_email: user.email
            }

            // Check if the email is already used by someone else
            const [contributorExists, e_contributorExists] = await AW(await ContributorModel.findOne({ github_email: dataObjectUser.email }));

            if(e_contributorExists || contributorExists)
                return res.status(500).send("Something went wrong, please try again later");

            // Check if we got a session, then we can assume we making a new account
            const c_email = CacheSession.get(req.sessionID);
            if(c_email)
            {
                dataObjectUser["email"] = c_email;
                CacheSession.delete(req.sessionID);
                // Creating an new account for the user
                await (new ContributorModel(dataObjectUser).save());
            }
            // If we don't have a session, we just create a new account and assuming email is the email from github as well
            else
                await (new ContributorModel(dataObjectUser).save());

            SendEmail(dataObjectUser.email, "Welcome to the program", {
                isHTML: true,
                body: `<div style="text-align: center;"><span><img src="https://cdn.tolfix.com/images/Tolfix.png" alt="" width="299" height="171" /></span></div>
                <div style="text-align: center;"><span>Welcome to the Contribution Program!</span></div>
                <div style="text-align: center;"><span>First off, we want to thank you for joining the program, it means the world to us.</span></div>
                <div style="text-align: center;">&nbsp;</div>
                <div style="text-align: center;">You are now officially a part of the program, for more information or any questions you might have regarding this, be sure to check out <a href="https://contribute.tolfix.com/">https://contribute.tolfix.com/</a> or feel free to ask me about it on <a href="https://discord.tolfix.com/">discord</a> if you are still unsure about the matter.</div>
                <div style="text-align: center;">&nbsp;</div>
                <div style="text-align: center;"><span>You are free to join our discord server, where you will receive one of your first perks, which is the &ldquo;Contribution Program&rdquo; role. Who knows what secrets and treasures are hidden behind it?</span></div>
                <div style="text-align: center;">&nbsp;</div>
                <div style="text-align: center;"><span>You will be continuously notified about your progress, whenever you contribute, via e-mail and as well on discord for rewards.</span></div>
                <div style="text-align: center;">&nbsp;</div>
                <div style="text-align: center;"><span>Now that you&rsquo;ve been caught up with all the nooks and crannies, make sure to check out our repositories or tasks, to see what can be improved or added. </span></div>
                <div style="text-align: center;"><span>Thank you and have fun! ~ </span><span>Tolfix</span></div>
                `
            });

            return res.redirect("https://github.tolfix.com/");
        });

    }
}