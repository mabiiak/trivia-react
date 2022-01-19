import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../sass/input.scss';

export default class Input extends Component {
  render() {
    const { type, name, onChange, dataTest, id, placeholder } = this.props;
    return (
      <input
        autoComplete="off"
        className="loginInput"
        type={ type }
        placeholder={ placeholder }
        name={ name }
        onChange={ onChange }
        data-testid={ dataTest }
        id={ id }
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTest: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
