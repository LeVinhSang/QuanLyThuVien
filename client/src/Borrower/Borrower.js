import React, {Component} from 'react';
import {
    addBorrower, deleteBorrower, editBorrower, editChecked, getKeyWordBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import {Button, Card, Image} from 'semantic-ui-react'


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



class Borrower extends Component {


    componentWillMount() {
        this.props.loadBorrower();
    }

    render() {

        return (
            <Card.Group>
                {this.props.borrowers.map ((borrower, index) =>
                    <Card key={index}>
                        <Card.Content>
                            <Image floated='right' size='mini' src={borrower.book.images} />
                            <Card.Header>
                                {borrower.user.user_name}
                            </Card.Header>
                            <Card.Meta>
                                {borrower.book.title}
                            </Card.Meta>
                            <Card.Description>
                                Date Return:  <strong>{borrower.date_return}</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green'>Detail</Button>
                            </div>
                        </Card.Content>
                    </Card>
                )}
            </Card.Group>
        )
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Borrower);