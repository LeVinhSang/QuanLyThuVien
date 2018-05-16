import React, {Component} from 'react';
import {
    addBorrower,
    loadBorrower
} from "../../middleware/borrower/actions";
import {connect} from 'react-redux';
import {loadBook} from "../../middleware/book/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Card } from 'antd';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '70.25%',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },

    gridListBorrower: {
        transform: 'translateZ(0)',
    },

    title: {
        color:'white',
    },
    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },

    header: {
        width:40
    },
    gridStyle: {
        [theme.breakpoints.up('md')]: {
            width: '25%',
            backgroundColor:'black',
            color:'white'
        }
    },

});


const mapDispatchToProps = dispatch => {
    return {
        addBorrower: (name, id_book, date_return) => {
            dispatch(addBorrower(name, id_book, date_return));
        },

        loadBorrower: () => {
            dispatch(loadBorrower());
        },

        loadBook: () => {
            dispatch(loadBook());
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

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class BorrowerCard extends Component {

    constructor(props) {
        super(props);
        this.state ={
            open: false,
            name:'',
            book:'',
            email:'',
            date_borrow:'',
            date_return:''
        }
    }

    componentDidMount() {
        this.props.loadBorrower();
        this.props.loadBook();
    }

    handleClickOpen = (element) => {
        this.setState({
            open: true,
            name: element.user.user_name,
            book: element.book.title,
            email: element.user.email,
            date_borrow: element.date_borrow,
            date_return: element.date_return
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    render() {
        const {classes} = this.props;
        return (
            <div style={{ backgroundColor:'#424242'}}>
                <div style={{backgroundColor:'#424242', height:30}}>
                    <h2 style={{marginLeft:10, color:'white'}}>Borrower</h2>
                </div>
                <Card style={{backgroundColor:'black'}}>
                    {this.props.borrowers.map( (borrower, index) => (
                        <Card.Grid className={classes.gridStyle} key={index}>
                            <CardMedia
                                className={classes.media}
                                image={borrower.book.images}
                                title={borrower.book.title}
                            />
                            <Typography component="p" style={{color:'white'}}>
                                {borrower.user.user_name} ({borrower.date_return})
                            </Typography>
                            <Button size="small" color="primary" onClick={ () => this.handleClickOpen(borrower)}>
                                Show More
                            </Button>
                        </Card.Grid>
                    ))}
                </Card>
                <div style={{backgroundColor:'#424242', height:20}}/>
                <div style={{backgroundColor:'#424242', height:30}}>
                    <h2 style={{marginLeft:10, color:'white'}}>Book</h2>
                </div>
                <Card style={{backgroundColor:'black'}}>
                    {this.props.books.map( (book, index) => (
                        <Card.Grid className={classes.gridStyle} key={index}>
                            <CardMedia
                                className={classes.media}
                                image={book.images}
                                title={book.title}
                            />
                            <Typography component="p" style={{color:'white'}}>
                                {book.title} ({book.publisher.name})
                            </Typography>
                            <Button size="small" color="primary">
                                Show More
                            </Button>
                        </Card.Grid>
                    ))}
                </Card>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Detail Borrower"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Name: {this.state.name}
                            <br/>
                            Email: {this.state.email}
                            <br/>
                            Book: {this.state.book}
                            <br/>
                            Date Borrow: {this.state.date_borrow}
                            <br/>
                            Date Return: {this.state.date_return}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

BorrowerCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(BorrowerCard));
