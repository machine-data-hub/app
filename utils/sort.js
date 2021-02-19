export function ASC(a, b) {
    if (a.Name < b.Name) {
    return -1;
    }
    if (a.Name > b.Name) {
    return 1;
    }
    return 0;
}

export function DES(a, b) {
    if (a.Name > b.Name) {
    return -1;
    }
    if (a.Name < b.Name) {
    return 1;
    }
    return 0;
}

export function MOSTPOPULAR(a, b) {
    if (a.Likes < b.Likes) {
    return 1;
    }
    if (a.Likes > b.Likes) {
    return -1;
    }
    return 0;
}

export function DATAADDED(a, b) {
    if (a.time > b.time) {
        return -1;
    }
    if (a.time < b.time) {
        return 1;
    }
    return 0;
}


export function DOWNLOAD(a, b) {
    if (a.Downloads > b.Downloads) {
    return -1;
    }
    if (a.Downloads < b.Downloads) {
    return 1;
    }
    return 0;
}