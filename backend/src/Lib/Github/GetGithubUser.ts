import fetch from "node-fetch";

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
    let email_data = ((await email.json() as Array<any>).filter(e => e.primary))[0];

    return Promise.resolve({
        email: email_data.email,
        github_id: user_data.id
    })
}