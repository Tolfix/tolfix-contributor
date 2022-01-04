import { Message } from "discord.js";
import { Client } from "discord.js";
import { Discord_Owners_Id } from "../../../Config";
import Command from "../../Struct/Command";

export default class Eval extends Command
{
    public name = "eval";
    public description = `Evaluates code`;
    public usage = `To test`
    public run(client: Client, message: Message, args: string[])
    {
        // Check if any owner is matching author id

        if(!Discord_Owners_Id.includes(message.author.id))
            return message.channel.send("You are not allowed to use this command!");

        let evalCommand = message.content;
        // Remove the prefix
        evalCommand = evalCommand.replace("cb!eval ", "");
        // Remove the whitespace
        evalCommand = evalCommand.trim();
        // Check if embeded with ```
        if(evalCommand.startsWith("```"))
            evalCommand = evalCommand.replaceAll("```", "");

        try
        {
            const result = eval(evalCommand);
            message.channel.send(`**Input:**\n\`\`\`js\n${evalCommand}\n\`\`\`\n**Output:**\n\`\`\`js\n${result}\n\`\`\``);
        } catch (error)
        {
            message.channel.send(`**Input:**\n\`\`\`js\n${evalCommand}\n\`\`\`\n**Output:**\n\`\`\`js\n${error}\n\`\`\``);
        };
    }
}