export default function getBook() {
    let books;
    books = fetch('/books/react', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(data => data).catch(err => {
        console.log('caught it!', err);
    });
    return books;
}