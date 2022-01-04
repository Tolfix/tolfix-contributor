import { Client, Collection, Intents } from "discord.js";
import { Discord_Token } from "../Config";
import Logger from "../Lib/Logger";
import CheckerHandler from "./Handlers/CheckHandler";
import CommandHandler from "./Handlers/CommandHandler";
import Command from "./Struct/Command";

const allIntents = new Intents(32767);
export const client = new Client({
    intents: allIntents
});

declare module 'discord.js' 
{
    export interface Client {
      commands: Collection<string, Command>;
      category: string[];
    }
};

client.commands = new Collection();

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
CommandHandler(client);

const Prefix = "cb!"
client.on("messageCreate", (message) => {

    if (message.author.bot) return;
    if (!message.guild) return;

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    const cmd: any = args.shift()?.toLowerCase();

    if (cmd.length === 0) return;
    
    let command = (client.commands.get(cmd))?.run;

    if (command)
    {
        Logger.info(`Command ${cmd} was called by ${message.author.username}`);
        command(
            client,
            message,
            args
        );
    };
});

client.login(Discord_Token);