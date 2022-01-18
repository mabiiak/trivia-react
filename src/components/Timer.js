import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  render() {
    const { currentTime } = this.props;
    return (
      <div>
        {currentTime}
      </div>
    );
  }
}

Timer.propTypes = {
  currentTime: PropTypes.number.isRequired,
};
