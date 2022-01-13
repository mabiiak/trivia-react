import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { returnName } = this.props;
    return (
      <header className="header">
        <img
          src=""
          alt=""
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
});

Header.propTypes = {
  returnName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
