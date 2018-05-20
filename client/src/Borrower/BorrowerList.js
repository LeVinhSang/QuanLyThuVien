import React, {Component} from 'react';
import {
    addBorrower, deleteBorrower, editBorrower, editChecked, getKeyWordBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import {Image, List} from 'semantic-ui-react'


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

        getKeywordBorrower: (keyword) => {
            dispatch(getKeyWordBorrower(keyword));
        }
    }
};

const mapStateToProps = state => {
    return {
        borrowers: state.borrowerReducer,
    }
};



class BorrowerList extends Component {


    componentWillMount() {
        this.props.loadBorrower();
    }

    render() {

        return (
            <List relaxed>
                {this.props.borrowers.map ( (borrower, index) =>
                    <List.Item key={index}>
                        <Image avatar src={borrower.user.avatar} />
                        <List.Content>
                            <List.Header as='a'>{borrower.user.user_name}</List.Header>
                            <List.Description>
                                Book: <a><b>{borrower.book.title}</b></a>
                                <br/>
                                ({borrower.date_return})
                            </List.Description>
                        </List.Content>
                    </List.Item>
                )}
            </List>
        )
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BorrowerList);