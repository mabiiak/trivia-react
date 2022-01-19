import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';

class Feedback extends React.Component {
  render() {
    const { props: { totalAssertions } } = this;
    console.log(totalAssertions);
    const assertions = 3;
    return (
      <div>
        <Header />
        {
          totalAssertions < assertions
            ? (
              <h2 data-testid="feedback-text">Could be better...</h2>
            ) : (
              <h2 data-testid="feedback-text">Well Done!</h2>
            )
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
