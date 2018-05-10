import React, {Component} from 'react';
import {addBorrower, deleteBorrower, editBorrower, editChecked, loadBorrower} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import { Modal, Button, Input, Icon, Form, Radio} from 'antd';

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
        }
    }
};

const mapStateToProps = state => {
    return {
        borrowers: state.addToReducer
    }
};

class Borrower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleEdit: false,
            formLayout: 'horizontal',
            collapsed: false,
        };
    };

    componentWillMount() {
        this.props.loadBorrower();
    }

    /*----------------------------------------------Modal----------------------------------------------*/

    showModal = () => {
        this.setState({
            visible: true,
            name: '',
            id_book: '',
            date_return: ''
        });
    };

    showModalEdit = (member, index) => {
        this.setState({
            visibleEdit: true,
            name: member.user.user_name,
            id_book: member.book.id_book,
            date_return: member.date_return,
            id: member.id,
            key: index
        });
    };

    handleOkEdit = (e) => {
        e.preventDefault();
        this.props.editBorrower(this.state.name, this.state.id_book, this.state.date_return, this.state.id, this.state.key);

        this.setState({
            visibleEdit: false,
        });
    };

    handleCancelEdit = () => {
        this.setState({
            visibleEdit: false,
        });
    };

    handleOk = (e) => {
        e.preventDefault();
        this.props.addBorrower(this.state.name, this.state.id_book, this.state.date_return);

        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    emitEmpty = () => {
        this.nameInput.focus();
        this.setState({ name: '' });
    };

    emitBookEmpty = () => {
        this.IDBookInput.focus();
        this.setState({ id_book: '' });
    };

    emitDateReturnEmpty = () => {
        this.DateReturnInput.focus();
        this.setState({ date_return: '' });
    };

    /*----------------------input in Modal----------------*/

    onChangeUserName = (e) => {
        this.setState({ name: e.target.value });
    };

    onChangeBookID = (e) => {
        this.setState({ id_book: e.target.value });
    };

    onChangeDateReturn = (e) => {
        this.setState({ date_return: e.target.value });
    };

    checkedClick(e) {
        this.props.editChecked(e.currentTarget.getAttribute('data-id-borrower'), e.currentTarget.checked)
    }

    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
    };


    deleteClick = e => {
        e.preventDefault();
        this.props.deleteBorrower(this.props.borrowers);
    };
    /*----------------------------------------End Modal------------------------------------------*/


    render() {
        const { name, id_book , date_return} = this.state;
        const suffix = name ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const suffixBook = id_book ? <Icon type="close-circle" onClick={this.emitBookEmpty} /> : null;
        const suffixDate = date_return ? <Icon type="close-circle" onClick={this.emitDateReturnEmpty} /> : null;

        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;

        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.showModal}>New Borrower</Button>
                </div>
                <Modal
                    title="Create Borrower"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout={formLayout}>
                        <Form.Item
                            label="Type Form"
                            {...formItemLayout}
                        >
                            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                <Radio.Button value="vertical">Vertical</Radio.Button>
                                <Radio.Button value="inline">Inline</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='text'
                                placeholder="Enter your username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                value={name}
                                onChange={this.onChangeUserName.bind(this)}
                                ref={node => this.nameInput = node}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='number'
                                placeholder="Enter your book_id"
                                prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffixBook}
                                value={id_book}
                                onChange={this.onChangeBookID.bind(this)}
                                ref={node => this.IDBookInput = node}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='date'
                                placeholder="Enter your book_id"
                                prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffixDate}
                                value={date_return}
                                onChange={this.onChangeDateReturn.bind(this)}
                                ref={node => this.DateReturnInput = node}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Edit Borrower"
                    visible={this.state.visibleEdit}
                    onOk={this.handleOkEdit}
                    onCancel={this.handleCancelEdit}
                >
                    <Form layout={formLayout}>
                        <Form.Item
                            label="Type Form"
                            {...formItemLayout}
                        >
                            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                <Radio.Button value="vertical">Vertical</Radio.Button>
                                <Radio.Button value="inline">Inline</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='text'
                                placeholder="Enter your username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                value={name}
                                onChange={this.onChangeUserName.bind(this)}
                                ref={node => this.nameInput = node}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='number'
                                placeholder="Enter your book_id"
                                prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffixBook}
                                value={id_book}
                                onChange={this.onChangeBookID.bind(this)}
                                ref={node => this.IDBookInput = node}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <Input
                                type='date'
                                placeholder="Enter your book_id"
                                prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffixDate}
                                value={date_return}
                                onChange={this.onChangeDateReturn.bind(this)}
                                ref={node => this.DateReturnInput = node}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

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
                                <a onClick={() => this.showModalEdit(borrower, index)}>Edit</a> |
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
