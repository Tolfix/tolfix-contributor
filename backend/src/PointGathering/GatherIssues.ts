import CacheRespositories from "../Cache/Github/CacheRespositories";
import PointTableModel from "../Database/Schemas/PointTable";
import { IContributor } from "../Interfaces/Contributor";
import AW from "../Lib/AW";

export default async (contributor: IContributor) =>
{
    const repositories = [...CacheRespositories.values()];

    // Get all issues
    const issues = repositories.flatMap(e => e.issues);

    // Check all issues made by contributor
    const issues_made_by_contributor = (issues.map(e => {
        // Go through each e.items
        for(const item of e.items)
        {
            // Check if the author is the contributor
            if(item.user.id === contributor.github_id)
                return item;
        }
    }));

    // Filter undefined from issues_made_by_contributor
    const issues_made_by_contributor_filtered = issues_made_by_contributor.filter(e => e !== undefined);

    // Get the total issues
    const total_issues = issues_made_by_contributor_filtered.length;

    // Get point table
    const [point_table, e_point_table] = await AW(await PointTableModel.findOne({
        contributor_id: contributor.id
    }));

    if(!point_table || e_point_table)
        return;

    let old_point_table = point_table;

    point_table["tIssues"] = total_issues;

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
        note: "Added new issues"
    });

    point_table.markModified("history");
    await point_table.save();
    return true;
};