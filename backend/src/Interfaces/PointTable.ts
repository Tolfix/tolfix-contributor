import { IContributor } from "./Contributor";

export interface IPointTable
{
    contributor_id: IContributor["id"];
    // t = total
    /**
     * @description
     * Amount of stars giving from our repositories
     */
    tStars: number;
    /**
     * @description
     * Amount of commits in total from our repositories
     */
    tCommits: number;
    /**
     * @description
     * Amount of pull requests in total from our repositories
     */
    tPullRequests: number;
    /**
     * @description
     * Amount of issues in total from our repositories
     */
    tIssues: number;
    /**
     * @description
     * Amount of forks in total from our repositories
     */
    tForks: number;
    /**
     * @description
     * Amount of members from our organization contributor is following.
     */
    tFollowing: Array<string>;
    /**
     * @description
     * The amount of points manually added from administrator.
     * Using this due to seperate the experience of the user.
     * Since it can be confused with the points gained from
     * the automated ones.
     */
    pointsRecieved: number;

    history: Array<{
        date: Date;
        data: {
            stars: number;
            commits: number;
            pullRequests: number;
            issues: number;
            forks: number;
            following: Array<string>;
            pointsRecieved: number;
        };
        note?: string;
    }>;
};