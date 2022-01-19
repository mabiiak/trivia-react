import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '../../components';

class Ranking extends React.Component {
  constructor() {
    super();
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { handleStart } = this;
    return (
      <>
        <section data-testid="ranking-title">
          <div>Ranking</div>
        </section>
        <section>
          <Button
            className="notClicked"
            onClick={ handleStart }
            dataTest="btn-go-home"
            buttDisabled={ false }
            label="Início"
          />
        </section>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropType.arrayOf(PropType.func).isRequired,
};

const mapStateToProps = (state) => ({
  nameUser: state.player.name,
  totalScore: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
