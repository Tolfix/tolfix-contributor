import { IContributors } from "./Contributors";
import { IForked } from "./Forked";
import { IIssues } from "./Issues";
import { IPullRequest } from "./PullRequests";
import { IStarGazers } from "./Stargazers";

export interface IRepository
{
    name: string;
    owner: string;
    contributors: IContributors[];
    stargazers: IStarGazers[];
    forks: IForked[];
    pull_requests: IPullRequest[];
    issues: IIssues[];
}