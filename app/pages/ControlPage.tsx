import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ControlPageWrapper from './styles';
import routes from '../constants/routes.json';
import Prediction from '../components/control/Prediction';
import Logo from '../../resources/images/olha_duto_logo.svg';
import NavigationButton from '../components/control/NavigationButton';
import BrightnessButton from '../components/control/BrightnessButton';
import CameraHeightButton from '../components/control/CameraHeightButton';

export default function ControlPage() {
  return (
    <ControlPageWrapper>
      <div style={{ flexBasis: '10%' }}>
        <img width="180px" src={Logo} alt="logo-icon" />
      </div>
      <div
        style={{
          display: 'flex',
          flexBasis: '70%',
          justifyContent: 'space-around',
        }}
      >
        <Prediction />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '30%',
          }}
        >
          <CameraHeightButton />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '16px',
            }}
          >
            <NavigationButton
              name="PLATAFORMA"
              buttonRadius={140}
              topicName="/commands/move"
            />
            <NavigationButton
              name="CÂMERA"
              buttonRadius={140}
              topicName="/commands/camera/rotation"
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '16px',
          alignItems: 'center',
        }}
      >
        <BrightnessButton />
        <Link to={routes.HOME}>
          <Button color="primary">Sair</Button>
        </Link>
      </div>
    </ControlPageWrapper>
  );
}
