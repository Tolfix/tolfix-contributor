import { Client, Intents } from "discord.js";

const allIntents = new Intents(32767);
export const client = new Client({
    intents: allIntents
});