import CacheRespositories from "../Cache/Github/CacheRespositories";
import PointTableModel from "../Database/Schemas/PointTable";
import { IContributor } from "../Interfaces/Contributor";
import AW from "../Lib/AW";

export default async (contributor: IContributor) =>
{

    // Get the commits from our cache;
    const c_contributor_commits = [...CacheRespositories.values()].filter(e => e.contributors.some(e => e.author.id === contributor.github_id));

    // Get the total commits and add it to the contributor
    const total_commits = c_contributor_commits.reduce((a, b) => 
        a + 
        // @ts-ignore
        b.contributors.find(e => e.author.id === contributor.github_id).total ?? 0, 0);

    // Get point table
    const [point_table, e_point_table] = await AW(await PointTableModel.findOne({
        contributor_id: contributor.id
    }));

    if(!point_table || e_point_table)
        return;

    let old_point_table = point_table;
    point_table["tCommits"] = total_commits;
    point_table.history.push({
        date: new Date(),
        data: {
            commits: old_point_table.tCommits,
            forks: old_point_table.tForks,
            stars: old_point_table.tStars,
            issues: old_point_table.tIssues,
            pullRequests: old_point_table.tPullRequests,
            following: old_point_table.tFollowing,
            pointsRecieved: old_point_table.pointsRecieved
        },
        note: "Added new commits"
    });

    point_table.markModified("history");
    await point_table.save();
    return true;
};