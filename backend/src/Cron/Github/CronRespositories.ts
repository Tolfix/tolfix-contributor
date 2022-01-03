import { CronJob } from "cron";
import { Github_API, Github_Org } from "../../Config";
import Github_GetAuth from "../../Lib/GenGithubAuth";
import Logger from "../../Lib/Logger";
import fetch from "node-fetch";
import { IContributors } from "../../Interfaces/Github/Contributors";
import AW from "../../Lib/AW";
import CacheRespositories from "../../Cache/Github/CacheRespositories";
import { IStarGazers } from "../../Interfaces/Github/Stargazers";
import { IForked } from "../../Interfaces/Github/Forked";
import { IPullRequest } from "../../Interfaces/Github/PullRequests";
import { IIssues } from "../../Interfaces/Github/Issues";

export default async function(runNow = false)
{

    async function run()
    {
        Logger.info("Cron: Github: Cache: Renwing");
        // Get all of our repos
        const Repos = (await (await fetch(`${Github_API}orgs/${Github_Org}/repos`, {
            headers: {
                Authorization: Github_GetAuth()
            }
        })).json()).filter((e: any) => !e.fork) as Array<any>;
    
        for await(let repo of Repos)
        {
            // Get contributors
            const [contributor, e_contributor] = await AW<Array<IContributors>>(await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/stats/contributors`, {
                headers: {
                    Authorization: Github_GetAuth()
                }
            })).json())

            // Get stargazers
            const [stargazers, e_stargazers] = await AW<Array<IStarGazers>>(await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/stargazers`, {
                headers: {
                    Authorization: Github_GetAuth()
                }
            })).json())

            // Get forks
            const [forks, e_forks] = await AW<Array<IForked>>(await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/forks`, {
                headers: {
                    Authorization: Github_GetAuth()
                }
            })).json())

            // Get pull requests
            const [pull_requests, e_pull_requests] = await AW<Array<IPullRequest>>(await (await fetch(`${Github_API}repos/${Github_Org}/${repo.name}/pulls?state=all`, {
                headers: {
                    Authorization: Github_GetAuth()
                }
            })).json())

            // Get issues
            const [issues, e_issues] = await AW<Array<IIssues>>(await (await fetch(`${Github_API}search/issues?q=is:issue%20repo:${Github_Org}/${repo.name}`, {
                headers: {
                    Authorization: Github_GetAuth()
                }
            })).json())
            
            let data = {
                contributors: contributor ?? [],
                stargazers: stargazers ?? [],
                forks: forks ?? [],
                pull_requests: pull_requests ?? [],
                issues: issues ?? [],
                name: repo.name,
                owner: repo.owner.login
            }

            Logger.cache(`Caching ${repo.name}`);

            CacheRespositories.set(repo.name, data);
        }
    }

    if(runNow)
        await run();

    // Every day at 12:00 and 00:00
    new CronJob("0 */12 * * *", async () => {
        await run();
    }, null, true, "Europe/Stockholm");
}