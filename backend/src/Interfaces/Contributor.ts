export interface IContributor
{
    /**
     * @description The id the user gets asigned from the database.
     */
    id: number;
    /**
     * @description The email of the user which registered in.
     */
    email: string;
    /** 
     * @description The id of the github user, using to identify.
     */
    github_id: number;
    /**
     * @description The email they have as primary on github.
     */
    github_email: string;

    /**
     * @description Id of the user if they link themself with discord.
     * Using to get data via discord.
     */
    discord_id?: string;
}