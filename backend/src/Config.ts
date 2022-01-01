/**
 * @description
 * Used if this service is running in debug mode.
 */
export const DebugMode = process.env.DEBUG === "true" ? true : false;
export const HomeDir = ((__dirname.replace("\\build", "")).replace("/build", ""));
export const JWT_Access_Token = process.env.JWT_ACCESS_TOKEN ?? "";
export const Domain = process.env.DOMAIN ?? "localhost";
export const Http_Schema = process.env.HTTP_SCHEMA ?? "http";
export const PORT = process.env.PORT ?? 8080;
export const Full_Domain = `${Http_Schema}://${Domain === "localhost" ? `localhost:${PORT}` : Domain}`;

// API
export const Express_Session_Secret = process.env.SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

// Database
export const MongoDB_URI = process.env.MONGO_URI ?? "mongodb://localhost/cpg";

/*
* Github
*/
export const Github_Client_Id = process.env.GITHUB_CLIENT_ID ?? "";
export const Github_Client_Secret = process.env.GITHUB_CLIENT_SECRET ?? "";
export const Github_Secrets_Sponsorship = process.env.GITHUB_SECRETS_SPONSOR ?? "";
export const Github_Org = "Tolfix";
export const Github_API = "https://api.github.com/";

/*
*   Discord
*/
export const Discord_Token = process.env.DISCORD_TOKEN ?? "";
export const Discord_Client_Id = process.env.DISCORD_CLIENT_ID ?? "";
export const Discord_Client_Secret = process.env.DISCORD_CLIENT_SECRET ?? "";
export const Discord_Contributor_Role_Id = "876148367779037214";

/**
 * @description SMTP config
 */
export const SMTPConfig = {
    host: process.env.SMTP_HOST ?? "",
    port: process.env.SMTP_PORT ?? 465,
    secure: process.env.SMTP_SECURE ?? true,
    username: process.env.SMTP_USER ?? "",
    password: process.env.SMTP_PASS ?? "",
};

// Get version of the app from package.json
export const GetVersion: () => string = () =>
{
    const package_json = require("../package.json");
    return (package_json?.version ?? "0.0.0");
};