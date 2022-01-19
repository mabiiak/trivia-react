import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FcSettings } from 'react-icons/fc';
import { handleToken, setLogin } from '../../redux/actions';
import '../../sass/login.scss';
import {
  Input,
  Button,
} from '../../components';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttDisabled: true,
      redirectSettings: false,
      redirectGame: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.validateButton());
  }

  validateButton() {
    const { email, name } = this.state;
    const emailValid = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    const nameLength = 1;

    if (name.length >= nameLength && emailValid.test(email)) {
      this.setState({
        buttDisabled: false,
      });
    } else {
      this.setState({
        buttDisabled: true,
      });
    }
  }

  async handleLoginGame() {
    const { handleUserToken, nameUser } = this.props;
    handleUserToken().then(() => {
      nameUser(this.state);
      this.setState({
        redirectGame: true,
      });
    });
  }

  render() {
    const { buttDisabled, redirectSettings, redirectGame } = this.state;
    return (
      <div className="loginContainer">
        <h1 className="logoTitle">Trivia</h1>

        <form className="loginForm">
          <div className="innerForm">
            {/* Name Input */ }
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={ this.handleChange }
              dataTest="input-player-name"
              id="name"
            />
            {/* Email Input */ }
            <Input
              type="email"
              placeholder="E-mail"
              name="email"
              onChange={ this.handleChange }
              dataTest="input-gravatar-email"
              id="email"
            />
            {/* Play Button */ }
            <Button
              className="playButton"
              onClick={ () => this.handleLoginGame() }
              label="Play"
              dataTest="btn-play"
              buttDisabled={ buttDisabled }
            />
          </div>
        </form>
        {/* Settings Button */}
        <FcSettings
          className="settingsButton"
          onClick={ () => this.setState({ redirectSettings: true }) }
          data-testid="btn-settings"
        />
        {
          redirectSettings && <Redirect to="/settings" />
        }
        {
          redirectGame && <Redirect to="/game" />
        }
      </div>
    );
  }
}

Login.propTypes = {
  nameUser: PropTypes.func.isRequired,
  handleUserToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  nameUser: (state) => dispatch(setLogin(state)),
  handleUserToken: (token) => dispatch(handleToken(token)),
});

export default connect(null, mapDispatchToProps)(Login);
