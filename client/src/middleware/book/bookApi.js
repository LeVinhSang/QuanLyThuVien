import {GET_KEYWORD_BOOK, LOAD_BOOK} from "./actions";

const bookApi = store => next => action => {
    if(action.type === LOAD_BOOK) {
        fetch('/books', {
            method: 'GET'
        }).then(res  => res.json())
            .then(data => next({
                type: LOAD_BOOK,
                books: data
            }))
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

    else {
        next(action);
    }
};

export default bookApi;