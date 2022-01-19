import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Button } from '../../components';

class Feedback extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { history } = this.props;
    history.push('/');
  }

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
        <Button
          className="play-again"
          type="button"
          onClick={ this.onClick }
          dataTest="btn-play-again"
          buttDisabled={ false }
          label="Play Again"
        />
      </div>
    );
  }
}

Feedback.propTypes = {
  totalAssertions: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.func).isRequired,
};

const mapStateToProps = (state) => ({
  totalAssertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(Feedback);
