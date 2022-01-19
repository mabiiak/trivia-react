import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';

class Feedback extends React.Component {
    const { props: { totalAssertions, totalScore, nameUser } } = this;
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
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  nameUser: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
  nameUser: state.player.name,
  totalScore: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
