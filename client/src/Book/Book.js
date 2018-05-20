import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, List} from 'semantic-ui-react'
import {loadBook} from "../middleware/book/actions";


const mapDispatchToProps = dispatch => {

    return {
        loadBook: () => {
            dispatch(loadBook());
        },
    }
};

const mapStateToProps = state => {
    return {
        books: state.bookReducer,
    }
};



class Book extends Component {


    componentWillMount() {
        this.props.loadBook();
    }

    render() {

        return (
            <List relaxed>
                {this.props.books.map ( (book, index) =>
                    <List.Item key={index}>
                        <Image avatar src={book.images}/>
                        <List.Content>
                            <List.Header as='a'>{book.title}</List.Header>
                            <List.Description>
                                <b>{book.publisher.name}</b>
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
)(Book);