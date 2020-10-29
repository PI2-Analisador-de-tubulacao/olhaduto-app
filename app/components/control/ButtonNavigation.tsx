import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { NavButtonDiv, NavLabelDiv, NavButtonWrapper } from './styles';

type Props = {
  name: string;
  buttonRadius: number;
};

const NavigationButton = (props: Props) => {
  const { name, buttonRadius } = props;
  const iconButtonSize = 59;
  const middle = buttonRadius / 2 - iconButtonSize / 2;
  const edge = buttonRadius - iconButtonSize;

  return (
    <NavButtonWrapper>
      <NavLabelDiv buttonRadius={buttonRadius}>{name}</NavLabelDiv>
      <NavButtonDiv buttonRadius={buttonRadius}>
        <IconButton
          style={{ position: 'absolute', left: `${middle}px` }}
          component="span"
        >
          <ArrowDropUpIcon fontSize="large" color="action" />
        </IconButton>
        <IconButton
          style={{
            position: 'absolute',
            left: `${edge}px`,
            top: `${middle}px`,
          }}
          component="span"
        >
          <ArrowRightIcon fontSize="large" color="action" />
        </IconButton>
        <IconButton
          style={{
            position: 'absolute',
            left: `${middle}px`,
            top: `${edge}px`,
          }}
          component="span"
        >
          <ArrowDropDownIcon fontSize="large" color="action" />
        </IconButton>
        <IconButton
          style={{ position: 'absolute', top: `${middle}px` }}
          component="span"
        >
          <ArrowLeftIcon fontSize="large" color="action" />
        </IconButton>
      </NavButtonDiv>
    </NavButtonWrapper>
  );
};

NavigationButton.propTypes = {
  name: PropTypes.string,
  buttonRadius: PropTypes.number,
};

NavigationButton.defaultProps = {
  name: '',
  buttonRadius: 220,
};

export default NavigationButton;
