import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import { setLogin } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      buttDisabled: true,
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
    const { nameUser } = this.props;
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

    nameUser(name);
  }

  render() {
    const { buttDisabled } = this.state;
    return (
      <div>
        <Header />
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nameUser: (state) => dispatch(setLogin(state)),
});

Login.propTypes = {
  nameUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
