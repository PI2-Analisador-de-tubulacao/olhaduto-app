import React from 'react';
import { Button, TextField } from '@material-ui/core';

import '../styles/pages/LoginPage.css';
import logoImg from '../../resources/Logo.svg';

const handleSubmit = () => {
  console.log('submit clicado');
};

export default function LoginPage() {
  return (
    /*     <form>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button color="primary">Hello</Button>
    </form> */
    <main>
      <header>
        <img src={logoImg} alt="logo" />
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className="input-form">
          <input type="text" id="email-form" name="Email" placeholder="Email" />
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
