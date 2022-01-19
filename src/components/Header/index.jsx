import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import '../../sass/header.scss';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hash: '',
    };

    this.getAvatar = this.getAvatar.bind(this);
  }

  componentDidMount() {
    this.getAvatar();
  }

  getAvatar() {
    const { returnEmail } = this.props;
    const returnHash = md5(returnEmail).toString();
    console.log(returnHash);
    this.setState({ hash: returnHash });
  }

  render() {
    const { state: { hash }, props: { returnName, returnScore } } = this;
    console.log(returnScore);

    return (
      <header className="header">
        <h1 className="logoTitleHeader">Trivia</h1>
        <div className="innerHeader">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="avatar"
            data-testid="header-profile-picture"
            className="avatar"
          />
          <p data-testid="header-player-name">
            { returnName }
          </p>
          <p>Score: </p>
          <p data-testid="header-score">{ returnScore }</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  returnName: state.player.name,
  returnEmail: state.player.email,
  returnScore: state.player.score,
});

Header.propTypes = {
  returnName: PropTypes.string.isRequired,
  returnEmail: PropTypes.string.isRequired,
  returnScore: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
