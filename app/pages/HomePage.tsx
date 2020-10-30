import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import routes from '../constants/routes.json';
import BlueButton from '../generalStyles';
import Logo from '../../resources/images/olha_duto_logo.svg';

export default function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          flexBasis: '10%',
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <img width="180px" src={Logo} alt="logo-icon" />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          flexBasis: '80%',
          width: '50%',
        }}
      >
        <Link to={routes.CONTROL} style={{ width: '100%' }}>
          <BlueButton>Iniciar Inspeção</BlueButton>
        </Link>
        <BlueButton>Histórico</BlueButton>
        <BlueButton>Configuração</BlueButton>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexBasis: '10%',
          width: '100%',
        }}
      >
        <Link to={routes.LOGIN}>
          <Button color="primary">Sair</Button>
        </Link>
      </div>
    </div>
  );
}
