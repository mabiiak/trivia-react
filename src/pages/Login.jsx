import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { handleToken, setLogin, handleQuestions } from '../redux/actions';

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
    const { handleUserToken, nameUser, handleGameQuestions } = this.props;
    handleUserToken();
    nameUser(this.state);
    handleGameQuestions().then(() => {
      this.setState({
        redirectGame: true,
      });
    });
  }

  render() {
    const { buttDisabled, redirectSettings, redirectGame } = this.state;
    return (
      <div>
        {/* input do nome */ }
        <Input
          type="text"
          placeholder="Name"
          name="name"
          onChange={ this.handleChange }
          dataTest="input-player-name"
          id="name"
        />
        {/* input do email */ }
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={ this.handleChange }
          dataTest="input-gravatar-email"
          id="email"
        />
        {/* botão Play */ }
        <Button
          onClick={ () => this.handleLoginGame() }
          label="Play"
          dataTest="btn-play"
          buttDisabled={ buttDisabled }
        />
        {/* botão de configurações */}
        <Button
          onClick={ () => this.setState({ redirectSettings: true }) }
          label="Configurações"
          dataTest="btn-settings"
          buttDisabled={ false }
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
  handleGameQuestions: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  nameUser: (state) => dispatch(setLogin(state)),
  handleUserToken: (token) => dispatch(handleToken(token)),
  handleGameQuestions: (payload) => dispatch(handleQuestions(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
