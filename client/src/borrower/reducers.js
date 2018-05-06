import {ADD_BORROWER} from "./actions";

async function getBorrower() {
    let borrower;
    borrower = await fetch('/borrowers', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(data => data).catch(err => {
        console.log('caught it!', err);
    });
    return borrower;
}

export async function addToReducer(state = [], action) {

    state = await getBorrower().then(values => values);

    if(action.type === ADD_BORROWER) {
        return state;
    }

    return state;
}