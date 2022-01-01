import fetch from "node-fetch";
import Logger from "../Logger";

export async function GetGithubUser(access_token: string)
{
    const user = await fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
            authorization: `token ${access_token}`
        }
    });

    const email = await fetch(`https://api.github.com/user/emails`, {
        method: "GET",
        headers: {
            authorization: `token ${access_token}`
        }
    });

    let user_data = await user.json() as any;
    let email_data = ((await email.json() as Array<any>))
    let b = false;
    Logger.info(email_data)
    // Check if an array is empty
    if(email_data && email_data.length > 0)
    {
        b = true;
        email_data = (email_data.filter(email => email.primary === true))[0];
    }

    return Promise.resolve({
        // @ts-ignore
        email: b ? email_data.email : user_data[0].email,
        github_id: user_data.id
    });
}