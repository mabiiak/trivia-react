import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img
          src=""
          alt=""
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name"> Nome?</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

export default Header;
