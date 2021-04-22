import { Octokit } from "@octokit/rest";

export default async function postIssue(post) {
    // https://octokit.github.io/rest.js/v18#teams-create-discussion-comment-in-org

    const githubToken = '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';
    const team_slug = `uw-capstone-team`
    const octoman = new Octokit({ auth: githubToken });
    const ORGANIZATION = `PHM-Data-Hub`;
    const discussion_number = 1;

    var date = new Date();
    const datasetString = " ### " + post.title + "\n"+ date + "\n\n**Summary:** " + post.summary + "\n**Link:** " + post.url;

    const response = await octoman.request('PATCH /orgs/{ORGANIZATION}/teams/{team_slug}/discussions/{discussion_number}', {
      org: ORGANIZATION,
      team_slug: team_slug,
      discussion_number: discussion_number,
      title: 'New Suggestion',
      body: datasetString,
    })
    return response
}  
