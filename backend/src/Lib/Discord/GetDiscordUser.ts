import fetch from "node-fetch";

export default async function GetDiscordUser(token: string)
{
    const userReq = await fetch("https://discord.com/api/users/@me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const user = await userReq.json();

    if(!user.id) {
        //@ts-ignore
        return Promise.resolve(null);
    }
    return Promise.resolve(user.id);
}