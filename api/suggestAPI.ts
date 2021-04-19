import { response } from "express";

export function getSuggestion() {
    fetch('http://localhost:3001').then(response => {
        return response.text();
    }).then(data => {
        console.log(`getSuggestion:  ${data}`);
    });
}

export function createSuggestion(props) {
    let title = props.title;
    let summary = props.summary;
    let URL = props.url;
    fetch('http://localhost:3001/suggestions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, summary, URL}),
    }).then(response => {
        return response.text();
    }).then(data => {
        alert(data);
        console.log(`createSuggestion:  ${data}`);
    });
}

export function deleteSuggestion(props) {
    let title = props.title
    fetch(`http://localhost:3001/suggestions/${title}`, {
        method: 'DELTE',
    }).then(resposne => {
        return response.text();
    }).then(data => {
        alert(data);
        console.log(`deleteSuggestion:  ${data}`);
    });
}