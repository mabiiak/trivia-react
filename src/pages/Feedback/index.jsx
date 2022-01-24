import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Button } from '../../components';

class Feedback extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.handleRankingButton = this.handleRankingButton.bind(this);
  }

  onClick() {
    const { history } = this.props;
    history.push('/');
  }

  handleRankingButton() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const {
      props: { totalAssertions, totalScore, nameUser },
      handleRankingButton, onClick,
    } = this;
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
        <div>
          <span>De 5 questões você acertou: </span>
          <span data-testid="feedback-total-question">
            { totalAssertions }
          </span>
        </div>
        <span>
          {`Parabéns ${nameUser} ! Sua pontuacao foi de: `}
        </span>
        <span data-testid="feedback-total-score">
          { totalScore }
        </span>
        <section>
          <Button
            className="notClicked"
            onClick={ handleRankingButton }
            dataTest="btn-ranking"
            buttDisabled={ false }
            label="Ranking"
          />
          <Button
            className="play-again"
            type="button"
            onClick={ onClick }
            dataTest="btn-play-again"
            buttDisabled={ false }
            label="Play Again"
          />
        </section>
      </div>
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  nameUser: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.func).isRequired,
};

const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
  nameUser: state.player.name,
  totalScore: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
