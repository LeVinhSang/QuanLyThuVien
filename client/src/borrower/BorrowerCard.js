import React, {Component} from 'react';
import {
    addBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import {loadBook} from "../middleware/book/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const styles = ({
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
    }

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
        const self = this;
        return (
            <div style={{ backgroundColor:'#424242'}}>
                <Paper style={{backgroundColor:'#424242', height:40}}>
                    <h2 style={{marginLeft:10, color:'white'}}>New List Borrower</h2>
                </Paper>
                <GridList className={classes.gridList} cols={4.5} style={{color:'white'}}>
                    {this.props.completes.map( (borrower, index) => (
                        <GridListTile key={index}>
                            <img src={borrower.book.images} alt='' />
                            <GridListTileBar
                                title={<span>{borrower.user.user_name} ({borrower.book.title})</span>}
                                subtitle={<span>date return: {borrower.date_return}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton onClick={() => self.handleClickOpen(borrower)}>
                                        <StarBorderIcon className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <Paper style={{backgroundColor:'white', height:20}}/>
                <Paper style={{ backgroundColor:'#424242'}}>
                    <Paper style={{backgroundColor:'#424242', height:40}}>
                        <h2 style={{marginLeft:10, color:'white'}}>Borrower</h2>
                    </Paper>
                    <Paper style={{backgroundColor:'#424242', textAlign:'center'}}>
                        <GridList className={classes.gridListBorrower} cols={4} style={{color:'white'}}>
                            {this.props.borrowers.map( (borrower, index) => (
                                <GridListTile key={index}>
                                    <img src={borrower.book.images} alt='' />
                                    <GridListTileBar
                                        title={<span>{borrower.user.user_name} ({borrower.book.title})</span>}
                                        subtitle={<span>date return: {borrower.date_return}</span>}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton onClick={() => self.handleClickOpen(borrower)}>
                                                <StarBorderIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Paper>
                </Paper>

                <Paper style={{backgroundColor:'white', height:20}}/>
                <Paper style={{backgroundColor:'#424242', height:40}}>
                    <h2 style={{marginLeft:10, color:'white'}}>New List Book</h2>
                </Paper>
                <GridList className={classes.gridList} cols={4.5} style={{color:'white'}}>
                    {this.props.books.map( (book, index) => (
                        <GridListTile key={index}>
                            <img src={book.images} alt='' />
                            <GridListTileBar
                                title={<span>{book.title} ({book.genre})</span>}
                                subtitle={<span>NXB: {book.publisher.name}</span>}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton>
                                        <StarBorderIcon className={classes.title} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
                <Paper style={{backgroundColor:'white', height:20}}/>
                <Paper style={{ backgroundColor:'#424242'}}>
                    <Paper style={{backgroundColor:'#424242', height:40}}>
                        <h2 style={{marginLeft:10, color:'white'}}>Book</h2>
                    </Paper>
                    <Paper style={{backgroundColor:'#424242', textAlign:'center'}}>
                        <GridList className={classes.gridListBorrower} cols={5} style={{color:'white'}}>
                            {this.props.books.map( (book, index) => (
                                <GridListTile key={index}>
                                    <img src={book.images} alt='' />
                                    <GridListTileBar
                                        title={<span>{book.title} ({book.genre})</span>}
                                        subtitle={<span>NXB: {book.publisher.name}</span>}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton>
                                                <StarBorderIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                    </Paper>
                </Paper>
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
