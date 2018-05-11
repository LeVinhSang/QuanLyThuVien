import React, {Component} from 'react';
import {
    addBorrower, deleteBorrower, editBorrower, editChecked, getKeyWordBorrower,
    loadBorrower
} from "../middleware/borrower/actions";
import {connect} from 'react-redux';
import { Modal, Button, Input, Icon, Form, Radio, Select, AutoComplete, Avatar} from 'antd';
import {loadBook} from "../middleware/book/actions";
import _ from 'underscore';

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
        this.state = {
            visible: false,
            visibleEdit: false,
            formLayout: 'horizontal',
            collapsed: false,
            keyword: ''
        };
    };

    componentWillMount() {
        this.props.loadBorrower();
        this.props.loadBook();
    }

    /*----------------------------------------------Modal----------------------------------------------*/

    showModal = () => {
        this.setState({
            visible: true,
            name: '',
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
            key: index,
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
        this.props.addBorrower(this.state.name, this.state.bookSelect, this.state.date_return);

        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    emitEmpty = () => {
        this.nameInput.focus();
        this.setState({ name: '' });
    };

    emitDateReturnEmpty = () => {
        this.DateReturnInput.focus();
        this.setState({ date_return: '' });
    };

    /*----------------------input in Modal----------------*/

    onChangeUserName = (e) => {
        this.setState({ name: e.target.value });
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

    handleChangeSelect(value) {
        this.setState({bookSelect: value});
    }

    handleChange(value) {
        this.setState({id_book: value.key});
    }

    /*-----------------------------Search Keyword Borrower ------------------*/

    inputSearchOnChange = (value) => {
        this.setState({keyword: value});
    };

    formSubmit = e => {
        e.preventDefault();
        this.props.getKeywordBorrower(this.state.keyword);
    };

    render() {
        const { name, id_book , date_return} = this.state;
        const suffix = name ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const suffixDate = date_return ? <Icon type="close-circle" onClick={this.emitDateReturnEmpty} /> : null;

        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;

        /*------------------Select ADD--------------------------------------------*/

        const bookSelect = [];
        const spanCompletes = [];
        this.props.books.map(book => bookSelect.push(<Select.Option key={book.id_book}>{book.title}</Select.Option>));
        this.props.completes.map(complete => spanCompletes.push(complete.user.user_name));

        return (

            <div>
                <Form onSubmit={this.formSubmit.bind(this)}>
                    <AutoComplete
                        style={{ width: 300 }}
                        dataSource={_.uniq(spanCompletes)}
                        placeholder="Search Borrower"
                        onChange={this.inputSearchOnChange}
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    >
                        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
                    </AutoComplete>
                </Form>


                <div>
                    <Button type="primary" onClick={this.showModal}>New Borrower</Button>
                </div>
                <Modal
                    title="Create Borrower"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Form layout={formLayout}>
                        <Form.Item label="Type Form" {...formItemLayout}>
                            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                <Radio.Button value="vertical">Vertical</Radio.Button>
                                <Radio.Button value="inline">Inline</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item {...formItemLayout}>
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
                        <Form.Item {...formItemLayout}>
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Book"
                                onChange={this.handleChangeSelect.bind(this)}
                            >
                                {bookSelect}
                            </Select>
                        </Form.Item>
                        <Form.Item {...formItemLayout}>
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
                        <Form.Item label="Type Form" {...formItemLayout}>
                            <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                                <Radio.Button value="vertical">Vertical</Radio.Button>
                                <Radio.Button value="inline">Inline</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item{...formItemLayout}>
                            <Input
                                type='text'
                                placeholder="Enter your username"
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                suffix={suffix}
                                key={name}
                                value={name}
                                onChange={this.onChangeUserName.bind(this)}
                                ref={node => this.nameInput = node}
                            />
                        </Form.Item>
                        <Form.Item{...formItemLayout}>
                            <Select labelInValue defaultValue={{ key: id_book }} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                                {this.props.books.map(book => <Select.Option key={book.id_book} value={book.id_book}>{book.title}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item{...formItemLayout}>
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

                <Form layout="inline">
                    {this.props.borrowers.map( (borrower, index) =>
                    <Form.Item key={index}>
                        <div>
                            <img alt=" " width='156px' height="209px" src={borrower.book.images}/>
                        </div>
                        <div>
                            <Avatar src= {borrower.user.avatar}/>
                            <label> {borrower.user.user_name}</label>
                        </div>
                        <div>
                            Email: {borrower.user.email}
                        </div>
                        <div>
                            Book: {borrower.book.title}
                        </div>
                        <div>
                            Date Borrow: {borrower.date_borrow}
                        </div>
                        <div>
                            Date Return: {borrower.date_return}
                        </div>
                    </Form.Item>
                    )}
                </Form>
                <table>
                    <thead>
                    <tr>
                        <th>Avatar</th>
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
                            <td><Avatar src= {borrower.user.avatar}/></td>
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
