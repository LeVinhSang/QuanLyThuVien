import {ADD_BOOK, ADD_BOOK_FOR_BORROWER, EDIT_BOOK} from "./action";

export function addToReducer(state = [], action) {

    if(action.type === ADD_BOOK) {
        return [...state, {
            id_book: action.id_book,
            title: action.title,
            author: action.author,
            publisher: action.publisher,
            genre: action.genre,
            amount: action.amount,
            images: action.images
        }];
    }

    if(action.type === EDIT_BOOK) {
        return [...state,{
            id_book: action.id_book,
            title: action.title,
            author: action.author,
            publisher: action.publisher,
            genre: action.genre,
            amount: action.amount,
            images: action.images
        }];
    }

    if(action.type === ADD_BOOK_FOR_BORROWER) {
        return [...state, {
            value: action.value,
            label: action.label
        }]
    }

    return state;
}