import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  render() {
    const { currentTime } = this.props;
    return (
      <div className="timer">
        {currentTime}
      </div>
    );
  }
}

Timer.propTypes = {
  currentTime: PropTypes.number.isRequired,
};
