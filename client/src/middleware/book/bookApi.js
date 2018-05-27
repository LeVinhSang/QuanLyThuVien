import { DELETE_BOOK, EDIT_CHECKED_BOOK, GET_KEYWORD_BOOK, LOAD_BOOK } from "./actions";

const bookApi = store => next => action => {
    if(action.type === LOAD_BOOK) {
        fetch('/books', {
            method: 'GET'
        }).then(res  => res.json())
            .then(data => {
                data.map(data => data.checked = false);
                next({
                    type: LOAD_BOOK,
                    books: data
                })
            })
    }

    else if(action.type === GET_KEYWORD_BOOK) {
        fetch('/book/search-basic/'+action.keyword, {
            method: 'GET'
        }).then(res  => res.json())
            .then(data => next({
                type: LOAD_BOOK,
                books: data
            }))
    }

    else if(action.type === EDIT_CHECKED_BOOK) {
        next({
            type: EDIT_CHECKED_BOOK,
            id: action.id,
            checked: action.checked
        });
    }

    else if(action.type === DELETE_BOOK) {
        action.books.map( book => {
            if(book.checked === true) {
                fetch("/book", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: book.id_book})
                }).then();
            }
            return 0;
        });

        next({
            type: DELETE_BOOK,
            books: action.books
        });
    }

    else {
        next(action);
    }
};

export default bookApi;