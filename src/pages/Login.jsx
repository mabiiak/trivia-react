import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttDisabled: true,
      redirectSettings: false,
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

  render() {
    const { buttDisabled, redirectSettings } = this.state;
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
          onClick={ () => console.log('oi') }
          label="Play"
          dataTest="btn-play"
          buttDisabled={ buttDisabled }
        />
        {/* botão de configurações */}
        <Button
          onClick={ () => this.setState({ redirectSettings: true }) }
          label="Configurações"
          dataTest="btn-settings"
        />
        {
          redirect && <Redirect to="/settings" />
        }
      </div>
    );
  }
}
