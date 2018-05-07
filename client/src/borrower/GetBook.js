import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import storeBook from "../book/store";

export default class GetBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            multi: true,
            multiValue: [],
            options: [],
            value: undefined,
            propTypes: {
                hint: PropTypes.string,
                label: PropTypes.string
            }
        };

    }

    async componentDidMount() {
        this.setState({options: await storeBook.getState()});
    }

    handleOnChange (value) {
        const { multi } = this.state;
        if (multi) {
            this.setState({ multiValue: value });
        } else {
            this.setState({ value });
        }
    }

    render () {
        const { multi, multiValue, options, value } = this.state;
        return (
            <div className="section">
                <Select.Creatable
                    multi={multi}
                    options={options}
                    onChange={this.handleOnChange.bind(this)}
                    value={multi ? multiValue : value}
                />
                <div className="hint">{this.props.hint}</div>
                <div className="checkbox-list">
                    <div>
                        <label className="checkbox">
                        <input
                            type="checkbox"
                            className="checkbox-control"
                            checked={multi}
                            onChange={() => this.setState({ multi: true })}
                        />
                        <span className="checkbox-label">Multiselect</span>
                        </label>
                    </div>
                    <label className="checkbox">
                        <input
                            type="checkbox"
                            className="checkbox-control"
                            checked={!multi}
                            onChange={() => this.setState({ multi: false })}
                        />
                        <span className="checkbox-label">Single Value</span>
                    </label>
                </div>
            </div>
        );
    }
};