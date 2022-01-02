import { Client } from "discord.js";
import { CronJob } from "cron";
import Logger from "../../Lib/Logger";
import { Discord_Contribution_Program_Role_Id, Discord_Contributor_Role_Id } from "../../Config";
import { Role } from "discord.js";
import ContributorModel from "../../Database/Schemas/Contributor";

export default function CheckerHandler(client: Client)
{
    // check every 30 minutes cron
    new CronJob("0 */30 * * * *", () => {

        // Check if any members have joined the program, and if not assign them the role
        // find all where discord_id is not null
        ContributorModel.find({ discord_id: {
            $not: null
        } }).then((contributors) => {

            for(const contributor of contributors)
            {
                if(!contributor.discord_id)
                    continue;
                // find the member
                const member = client.guilds.cache.first()?.members.cache.get(contributor.discord_id);

                if(!member)
                    continue;

                // check if they have the role
                if(!member.roles.cache.has(Discord_Contribution_Program_Role_Id))
                {
                    // add the role
                    member.roles.add(Discord_Contribution_Program_Role_Id).catch((error) => {
                        Logger.error(error);
                    });
                }
            }

        });

    }, null, true, "Europe/Stockholm");
}