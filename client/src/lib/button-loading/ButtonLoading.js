import React            from 'react';
import PropTypes        from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';


class ButtonLoading extends React.Component {


    render() {
        return (
            <Button as={'div'} disabled primary style={{
                display       : 'flex',
                justifyContent: 'center',
                alignItems    : 'center',
                width         : `${this.props.width}`
            }}>
                <Icon name='circle notched' loading/>
                {this.props.text}
            </Button>
        )
    }
}

ButtonLoading.propTypes = {
    text: PropTypes.string.isRequired
};

ButtonLoading.defaultProps = {
    width: '100px',
    text:''
};

export default ButtonLoading
