


export function getDateFromString(date) {
    return date.toISOString().slice(0, 10)
}

export function getTimeFromString(date) {
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
}

