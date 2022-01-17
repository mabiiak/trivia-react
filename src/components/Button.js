import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default class Button extends Component {
  render() {
    const { onClick, label, dataTest, buttDisabled, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        onClick={ onClick }
        data-testid={ dataTest }
        disabled={ buttDisabled }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  buttDisabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
};
