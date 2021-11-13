
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setearCookies(data) {
    document.cookie = "X-Bonita-API-Token=" + data.auth['X-Bonita-API-Token'];
    document.cookie = "JSESSIONID=" + data.auth.JSESSIONID;
}

export function userLogueado() {
    return alert("No implementado")
}


export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}