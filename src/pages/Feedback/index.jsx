import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header } from '../../components';

class Feedback extends React.Component {
  render() {
    const { totalScore, assertions, nameUser } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          <p data-testeid="feedback-total-question">
            De 5 questões você acertou
            { ` &{assertions} ` }
          </p>
          <p data-testid="feedback-total-score">
            Parabéns
            { ` ${nameUser}` }
            ! Sua pontuação foi de:
            {` ${totalScore}`}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nameUser: state.player.name,
  totalScore: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  totalScore: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  nameUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
