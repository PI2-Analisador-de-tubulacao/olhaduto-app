import React from 'react';
import NavigationButton from '../components/control/ButtonNavigation';

export default function ControlPage() {
  return (
    <div>
      <NavigationButton name="CÂMERA" buttonRadius={180} />
      <NavigationButton name="PLATAFORMA" buttonRadius={180} />
    </div>
  );
}
