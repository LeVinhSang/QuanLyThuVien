import React, {Component} from 'react';
import {
    addBorrower, deleteBorrower, editBorrower, editChecked, getKeyWordBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import {loadBook} from "../middleware/book/actions";

const mapDispatchToProps = dispatch => {
    return {
        addBorrower: (name, id_book, date_return) => {
            dispatch(addBorrower(name, id_book, date_return));
        },

        loadBorrower: () => {
            dispatch(loadBorrower());
        },

        editChecked: (id, checked) => {
            dispatch(editChecked(id, checked));
        },

        editBorrower: (name, id_book, date_return, id, key) => {
            dispatch(editBorrower(name, id_book, date_return, id, key));
        },

        deleteBorrower: (borrowers) => {
            dispatch(deleteBorrower(borrowers));
        },

        loadBook: () => {
            dispatch(loadBook());
        },

        getKeywordBorrower: (keyword) => {
            dispatch(getKeyWordBorrower(keyword));
        }
    }
};

const mapStateToProps = state => {
    return {
        completes: state.autoCompleteReducer,
        borrowers: state.borrowerReducer,
        books: state.bookReducer
    }
};

class Borrower extends Component {

    constructor(props) {
        super(props);
        this.state ={
            open: false
        }
    }

    componentWillMount() {
        this.props.loadBorrower();
        this.props.loadBook();
    }

    checkedClick(e) {
        this.props.editChecked(e.currentTarget.getAttribute('data-id-borrower'), e.currentTarget.checked)
    }


    deleteClick = e => {
        e.preventDefault();
        this.props.deleteBorrower(this.props.borrowers);
    };


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Book</th>
                        <th>Date Borrow</th>
                        <th>Date Return</th>
                        <th><button onClick={this.deleteClick.bind(this)}>Delete</button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.borrowers.map( (borrower, index) =>
                        <tr key={index}>
                            <td>{borrower.user.user_name}</td>
                            <td>{borrower.user.email}</td>
                            <td>{borrower.book.title}</td>
                            <td>{borrower.date_return}</td>
                            <td>{borrower.date_borrow}</td>
                            <td>
                                <a>Edit</a> |
                                <input data-id-borrower={index} onChange={this.checkedClick.bind(this)} type='checkbox' checked={borrower.checked}/>
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
)(Borrower);
