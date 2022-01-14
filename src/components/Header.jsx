import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

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

  // d41d8cd98f00b204e9800998ecf8427e
  // d41d8cd98f00b204e9800998ecf8427e

  render() {
    const { state: { hash }, props: { returnName } } = this;

    return (
      <header className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          { returnName }
        </p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  returnName: state.player.name,
  returnEmail: state.player.email,
});

Header.propTypes = {
  returnName: PropTypes.string.isRequired,
  returnEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
