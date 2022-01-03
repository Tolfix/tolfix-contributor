import { CronJob } from "cron";
import Logger from "../../Lib/Logger";
import AW from "../../Lib/AW";
import ContributorModel from "../../Database/Schemas/Contributor";
import PointTableModel from "../../Database/Schemas/PointTable";
import GatherCommits from "../../PointGathering/GatherCommits";
import GatherIssues from "../../PointGathering/GatherIssues";

export default async function(runNow = false)
{

    async function run()
    {
        Logger.info("Cron: Point Gathering: Cache: Adding");

        // Get all contributors
        const [contributors, e_contributors] = await AW(await ContributorModel.find());
        if(!contributors || e_contributors)
            return;

        // check if they have a point table
        for await(const contributor of contributors)
        {
            const [point_table, e_point_table] = await AW(await PointTableModel.findOne({
                contributor_id: contributor.id
            }))

            if(e_point_table)
                continue;

            if(!point_table)
                // Create a new one
                await PointTableModel.create({
                    contributor_id: contributor.id
                });

            await GatherCommits(contributor);
            await GatherIssues(contributor);
        }
    }

    if(runNow)
        await run();

    // Every day at 12:00 and 00:00
    new CronJob("0 */12 * * *", async () => {
        await run();
    }, null, true, "Europe/Stockholm");
}