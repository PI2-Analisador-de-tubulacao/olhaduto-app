import React from 'react';
import Logo from '../../resources/images/olha_duto_logo.svg';
import NavigationButton from '../components/control/ButtonNavigation';
import BrightnessButton from '../components/control/BrightnessButton';
import ControlPageWrapper from './styles';
import Prediction from '../components/control/Prediction';

export default function ControlPage() {
  return (
    <ControlPageWrapper>
      <div style={{ flexBasis: '10%' }}>
        <img width="180px" src={Logo} alt="logo-icon" />
      </div>
      <div
        style={{
          display: 'flex',
          flexBasis: '80%',
          justifyContent: 'space-around',
        }}
      >
        <Prediction />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '20%',
          }}
        >
          <NavigationButton name="CÂMERA" buttonRadius={140} />
          <NavigationButton name="PLATAFORMA" buttonRadius={140} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <BrightnessButton />
      </div>
    </ControlPageWrapper>
  );
}
