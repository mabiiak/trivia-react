import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { type, name, onChange, dataTest, id, placeholder } = this.props;
    return (
      <form>
        <label htmlFor={ id }>
          <input
            type={ type }
            placeholder={ placeholder }
            name={ name }
            onChange={ onChange }
            data-testid={ dataTest }
            id={ id }
          />
        </label>
      </form>
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
