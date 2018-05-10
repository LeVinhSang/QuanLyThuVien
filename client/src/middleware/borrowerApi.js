import {ADD_BORROWER, DELETE_BORROWER, EDIT_BORROWER, EDIT_CHECKED, LOAD_BORROWER} from "./actions";

const borrowerApi = store => next => action => {
    if(action.type === LOAD_BORROWER) {
        fetch("/borrowers", {
            method: 'GET'
        }).then( res => res.json()).then( data => next({
                type: LOAD_BORROWER,
                borrowers: data
            })
        );
    }

    if(action.type === EDIT_CHECKED) {
        next({
            type: EDIT_CHECKED,
            id: action.id,
            checked: action.checked
        });
    }

    if(action.type === ADD_BORROWER) {
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
        }).then( res => res.json()).then( data => next({
            type: ADD_BORROWER,
            borrower: data
        }));
    }

    if(action.type === EDIT_BORROWER) {
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

    if(action.type === DELETE_BORROWER) {
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
};

export default borrowerApi;