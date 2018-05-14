import React, {Component} from 'react';
import {
    addBorrower, getKeyWordBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import {loadBook} from "../middleware/book/actions";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import {Avatar} from "material-ui";
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
        paddingTop: '56.25%',
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color:'white',
    },
    titleBar: {
        background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

    componentWillMount() {
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

        const { classes } = this.props;
        return (
            <div>

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

                <GridList className={classes.gridList} cols={2.5} style={{color:'white'}}>
                    {this.props.borrowers.map( (borrower, index) => (
                        <GridListTile key={index}>
                            <img src={borrower.book.images} alt='' />
                            <GridListTileBar
                                title={borrower.user.user_name}
                                subtitle={<span>date return: {borrower.date_return}</span>}
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

                <Paper>
                {this.props.borrowers.map( (borrower, index) =>
                    <Paper style = {{height: 150,width: 240, display: 'inline-block', marginLeft:20, marginTop:20, marginBottom:20}} key={index}>
                        <Card key={index}>
                            <CardHeader
                                avatar={
                                    <Avatar src={borrower.user.avatar} aria-label="Recipe" className={classes.avatar}/>
                                }
                                title={borrower.user.user_name}
                                subheader={borrower.date_borrow}
                            />

                            <CardMedia
                                className={classes.media}
                                image={borrower.book.images}
                                title={borrower.book.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {borrower.book.title}
                                </Typography>
                                <Typography component="p">
                                    ({borrower.date_return})
                                </Typography>
                                <Typography component="p">
                                    Viet-Hung Industrial University
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => this.handleClickOpen(borrower)}>
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Paper>
                )}
                </Paper>
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
