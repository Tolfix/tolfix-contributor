import { Application, Router } from "express";
import CacheSession from "../../../../Cache/Server/CacheSession";
import ContributorModel from "../../../../Database/Schemas/Contributor";
import AW from "../../../../Lib/AW";

export default class JoinRouter
{
    private server: Application;
    private router = Router();

    constructor(server: Application, version: string)
    {
        this.server = server;
        this.server.use(`/api/${version}/join`, this.router);

        this.router.post("/", async (req, res) => {
            const email = req.body.email;
            if(!email)
                return res.redirect("back");
            
            // First check if they already have joined with email
            const [contributor, e_contributor] = await AW(await ContributorModel.findOne({ email: email }));
            
            if(contributor || e_contributor)
                return res.redirect("back");

            // Assuming they havent joined, create a new for the user, aswell store the email in a cache
            // So when we redirect we can remember it later on in a session
            CacheSession.set(req.sessionID, email);

            // Sending them to /v1/oauth2/github,
            // to link them with github so we can create an account for them
            return res.redirect("/v1/oauth2/github");
        });

    }
}