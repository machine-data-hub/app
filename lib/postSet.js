import { Octokit } from "@octokit/rest";

export default async function postIssue(post) {
    // https://octokit.github.io/rest.js/v18#teams-create-discussion-comment-in-org

    const sillyString = 'ZJBsQTFUy40aKy0tqieJghp_8ZGng8jE27uqBeRD';
    const fun = sillyString.slice(20) + sillyString.slice(0, 20);
    const slug = `uw-capstone-team`
    const octoman = new Octokit({ auth: fun });
    const ORGANIZATION = `PHM-Data-Hub`;

    var date = new Date();
    const datasetString = " ### " + post.title + "\n"+ date + "\n\n**Summary:** " + post.summary + "\n**Link:** " + post.url;

    const response = await octoman.rest.teams.createDiscussionCommentInOrg({ 
        org : ORGANIZATION,
        team_slug: slug,
        discussion_number: 1,
        body: datasetString,
    })
    return response
}  
