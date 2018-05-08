export default function getBorrower() {
    let borrowers;
    borrowers = fetch('/borrowers', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(data => data).catch(err => {
        console.log(err);
    });

    return borrowers;
}