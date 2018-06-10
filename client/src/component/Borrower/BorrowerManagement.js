import React, { Component }                           from 'react';
import { Checkbox, Table, Button, Input, Grid, Icon } from 'semantic-ui-react';
import { Link }                                       from 'react-router-dom';
import { borrowerService }                            from "../../services/index";
import Borrower                                       from "./Borrower";
import jwt                                            from 'jsonwebtoken';

class BorrowerManagement extends Component {

    static route = {
        path     : '/borrower-management',
        component: localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && BorrowerManagement : Borrower,
        icon     : <Icon name='user'/>,
        linkLabel:localStorage.getItem('token') ?
            jwt.verify(localStorage.getItem('token'), 'sang').role === 'admin' && 'Borrower Management' : null,
        className: 'borrower_management'
    };

    state = {
        borrowers      : [],
        borrowerSearch : [],
        borrowerKeyword: [],
        statusButton   : ['All', 'Pending', 'Confirm'],
        statusActive   : 'All',
    };

    componentDidMount() {
        borrowerService.getBorrowers().then(res => {
            res.data.map(data => {
                data.checked = false;
                return data;
            });
            this.setState({
                borrowers      : res.data,
                borrowerSearch : res.data,
                borrowerKeyword: res.data
            })
        });
    }

    statusActive = (e, {content}) => {
        if (content === 'All') {
            this.setState({
                borrowerSearch: this.state.borrowers,
                statusActive  : content,
            });
        }

        else {
            let borrowerSearch = this.state.borrowers.filter(borrower => borrower.status.toLowerCase() === content.toLowerCase());
            this.setState({
                borrowerSearch : borrowerSearch,
                statusActive   : content,
                borrowerKeyword: borrowerSearch
            });
        }
    };

    handleChecked = (index, id, checked) => {
        let borrowerSearch           = [...this.state.borrowerSearch];
        borrowerSearch[index].status = checked ? 'confirm' : 'pending';
        this.setState({borrowerSearch: borrowerSearch});
        borrowerService.updateStatus(id, {status: borrowerSearch[index].status})
    };

    onChangeInputSearch(e) {
        let updatedList = this.state.borrowerKeyword;
        updatedList     = updatedList.filter(item =>
            item.user.user_name.toLowerCase().search(e.currentTarget.value.toLowerCase()) !== -1);
        this.setState({borrowerSearch: updatedList});
    }

    renderCheckedStatus = status => {
        switch (status.toLowerCase()) {
            case 'pending':
                return false;
            default:
                return true;
        }
    };

    handleCheckedBorrower = (id, checked) => {
        let borrowers         = this.state.borrowerSearch;
        borrowers[id].checked = checked;
        this.setState({borrowerSearch: borrowers});
    };

    handleDelete() {
        this.state.borrowerSearch.map(borrower =>
            borrower.checked && borrowerService.deleteBorrower(borrower.id, borrower.book.id_book)
        );
        let borrowers = this.state.borrowerSearch.filter(borrower => !borrower.checked);
        this.setState({borrowerSearch: borrowers})
    }

    render() {

        let {borrowerSearch, statusButton, statusActive} = this.state;
        return (
            <div>
                <h4>Total: {this.state.borrowerSearch.length}</h4>
                <Grid>
                    <Grid.Column>
                        <b>Status:</b>
                    </Grid.Column>
                    <Grid.Column width={15} style={{paddingLeft: 0}}>
                        {statusButton.map((content, i) => (
                            <Button key={i}
                                    content={content}
                                    active={statusActive === content}
                                    color={statusActive === content ? 'green' : null}
                                    size={'tiny'} circular={true}
                                    onClick={this.statusActive}/>
                        ))}
                        <Input style={{
                            float: 'right',
                            width: 300
                        }} icon='search' placeholder='Search....' size='mini'
                               onChange={this.onChangeInputSearch.bind(this)}/>
                    </Grid.Column>
                </Grid>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={3}>Name</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Book</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Email</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={2}>Date Borrow</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={2}>Date Return</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' width={1}>
                                <Button basic color='blue' onClick={this.handleDelete.bind(this)}
                                        icon='trash'/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {borrowerSearch.map((borrower, index) =>
                            <Table.Row key={index}>
                                <Table.Cell><Link to={{
                                    pathname: `/borrower-editor/${borrower.id}`
                                }}>{borrower.user.user_name}</Link></Table.Cell>
                                <Table.Cell>{borrower.book.title}</Table.Cell>
                                <Table.Cell>{borrower.user.email}</Table.Cell>
                                <Table.Cell>
                                    <Checkbox toggle checked={this.renderCheckedStatus(borrower.status)}
                                              onChange={(e, checked) => this.handleChecked(index, borrower.id, checked.checked)}/>
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <p style={styles.capitalize}>{borrower.date_borrow}</p>
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <p style={styles.capitalize}>{borrower.date_return}</p>
                                </Table.Cell>
                                <Table.Cell textAlign='center'>
                                    <Checkbox checked={borrower.checked}
                                              onChange={(e, items) => this.handleCheckedBorrower(index, items.checked)}/>
                                </Table.Cell>
                            </Table.Row>
                        )}
                        <Table.Row>
                            <Table.Cell colSpan={6}><u><i>More</i></u></Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Link to='/borrower-creator'>
                                    <Icon name={'plus circle'} size={'large'}/>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const styles = {
    capitalize: {
        textTransform: 'capitalize'
    }
};

export default BorrowerManagement;
