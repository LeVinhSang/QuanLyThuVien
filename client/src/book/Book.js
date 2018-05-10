import React, {Component} from 'react';
import {loadBook} from "../middleware/book/actions";
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        loadBook: () => {
            dispatch(loadBook());
        }
    };
};

const mapStateToProps = state => {
    return {
        books: state.bookReducer
    };
};

class Book extends Component {

    componentWillMount() {
        this.props.loadBook();
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);



