import axios from 'axios';

export const postIssues = async (newTitle, newUrl, newSummary) => {
    await axios.post('https://github.com/PHM-Data-Hub/app/issues', {
        method: 'post',
        header:  {'Content-Type': 'application/json', 'Authorization': `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`, "Access-Control-Allow-Origin": "*"},
        body: {
            title: newTitle,
            body: {body: newSummary, title: newUrl}
        }
    })
}
// mine: https://github.com/mattsul/app/issues
// official: https://github.com/PHM-Data-Hub/app/issues
// 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

export default postIssues;