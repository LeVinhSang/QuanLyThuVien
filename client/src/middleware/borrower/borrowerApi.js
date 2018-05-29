import {
    ADD_BORROWER, ADD_BORROWER_USER, DELETE_BORROWER, EDIT_BORROWER, EDIT_CHECKED, GET_KEYWORD_BORROWER,
    LOAD_BORROWER, LOAD_BORROWER_ADMIN
} from "./actions";

const borrowerApi = store => next => action => {

    if(action.type === LOAD_BORROWER) {

        fetch("/borrowers", {
            method: 'GET'
        }).then( res => res.json()).then( data => {
                data.map(data => data.checked = false);
                next({
                    type: LOAD_BORROWER,
                    borrowers: data
                })
            }
        );
    }

    else if(action.type === LOAD_BORROWER_ADMIN) {

        fetch("/admin/borrowers", {
            method: 'GET'
        }).then( res => res.json()).then( data => {
                data.map(data => data.checked = false);
                next({
                    type: LOAD_BORROWER_ADMIN,
                    borrowers: data
                })
            }
        );
    }

    else if(action.type === EDIT_CHECKED) {
        next({
            type: EDIT_CHECKED,
            id: action.id,
            checked: action.checked
        });
    }

    else if(action.type === ADD_BORROWER) {

        action.book_id.map(book_id => {
            let data = {
                name_user: action.name_user,
                book_id: book_id,
                date_return: action.date_return
            };

            fetch("/borrower", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then( res => res.json()).then( data => next({
                type: ADD_BORROWER,
                borrower: data
            }));
            return 0;
        });
    }

    else if(action.type === ADD_BORROWER_USER) {

        let data = {
            name_user: action.name_user,
            book_id: action.book_id,
            date_return: action.date_return
        };

        fetch("/borrower", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res => res.json()).then( () => {
            alert('success');
            window.location.href='/'
        });
    }

    else if(action.type === EDIT_BORROWER) {
        let data = {
            name_user: action.name_user,
            book_id: action.book_id,
            date_return: action.date_return,
            id: action.id
        };
        fetch("/borrower", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res => res.json()).then( data => next({
                type: EDIT_BORROWER,
                borrower: data,
                id: action.id,
                key: action.key
            })
        );
    }

    else if(action.type === DELETE_BORROWER) {
        action.borrowers.map( borrower => {
            if(borrower.checked === true) {
                fetch("/borrower", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: borrower.id})
                }).then();
            }
            return 0;
        });

        next({
            type: DELETE_BORROWER,
            borrowers: action.borrowers
        })
    }

    else if(action.type === GET_KEYWORD_BORROWER) {

        fetch('/search-basic/'+ action.keyword, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => next({
                type: GET_KEYWORD_BORROWER,
                borrowers: data
            }));
    }

    else {
        next(action);
    }
};

export default borrowerApi;