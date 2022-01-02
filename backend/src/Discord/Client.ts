import { Client, Intents } from "discord.js";
import { Discord_Token } from "../Config";
import Logger from "../Lib/Logger";
import CheckerHandler from "./Handlers/CheckHandler";

const allIntents = new Intents(32767);
export const client = new Client({
    intents: allIntents
});

client.on("ready", () => {
    Logger.info(`Client ready.`)
    client.user?.setPresence({
        activities: [
            {
                name: "Checking for new contributors",
                type: "WATCHING"

            }
        ],
        status: "online"
    });

});

CheckerHandler(client);

client.login(Discord_Token);