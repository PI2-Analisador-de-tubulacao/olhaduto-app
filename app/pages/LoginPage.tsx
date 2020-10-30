import React from 'react';
import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.
import '../styles/pages/LoginPage.css';
import logoImg from '../../resources/Logo.svg';

class LoginPage extends React.Component {
  handleSubmit = (e) => {
    const { history } = this.props;
    e.preventDefault();
    history.push('/control');
  };

  render() {
    return (
      <main>
        <header>
          <img src={logoImg} alt="logo" />
        </header>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="input-form">
            <input
              type="text"
              id="email-form"
              name="Email"
              placeholder="Email"
            />
            <input
              type="password"
              id="password-form"
              name="Senha"
              placeholder="Senha"
            />
          </fieldset>
          <fieldset className="buttons-form">
            <input type="submit" id="button-cadastrar-form" value="CADASTRAR" />
            <input type="submit" id="button-login-form" value="LOGIN" />
          </fieldset>
          <a href="random.com" id="forgotten-password">
            Esqueci minha senha
          </a>
        </form>
      </main>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(LoginPage);
