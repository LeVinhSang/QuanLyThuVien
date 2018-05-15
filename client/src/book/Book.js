import React, {Component} from 'react';
import {getKeyWordBook, loadBook} from "../middleware/book/actions";
import {connect} from 'react-redux';


const mapDispatchToProps = dispatch => {
    return {
        loadBook: () => {
            dispatch(loadBook());
        },

        getKeywordBook: (keyword) => {
            dispatch(getKeyWordBook(keyword));
        }
    };
};

const mapStateToProps = state => {
    return {
        books: state.bookReducer
    };
};

class Book extends Component {

    state = {
        keyword: ''
    };

    componentWillMount() {
        this.props.loadBook();
    }

    render() {
        const books = [];
        this.props.books.map(book => books.push(book.title));

        return (

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Genre</th>
                    <th>Amount</th>
                    <th>Images</th>
                    <th><button>Delete</button></th>
                </tr>
                </thead>
                <tbody>
                {this.props.books.map( (book, index) =>
                    <tr key={index}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher.name}</td>
                        <td>{book.genre}</td>
                        <td>{book.amount}</td>
                        <td>{book.images}</td>
                        <td>
                            <a>Edit</a> |
                            <input data-id-book={index} type='checkbox' checked={book.checked}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);



