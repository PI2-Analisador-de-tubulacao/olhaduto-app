import React, { Component } from 'react';
import { IconButton, Popover, Slider } from '@material-ui/core';
import BrightnessIcon from '../../../resources/icons/brightness_icon.svg';

class BrightnessButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      brightnessValue: 50,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = (event, newValue) => {
    this.setState({ brightnessValue: newValue });
  };

  render() {
    const { anchorEl, brightnessValue } = this.state;
    return (
      <>
        <IconButton component="span" onClick={this.handleClick}>
          <img
            width="30px"
            src={BrightnessIcon}
            alt="brightness-icon-indicator"
          />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <div
            style={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              padding: '8px',
            }}
          >
            <img
              width="30px"
              src={BrightnessIcon}
              style={{ marginRight: '8px' }}
              alt="brightness-icon"
            />
            <Slider
              min={1}
              value={brightnessValue}
              style={{ width: '200px' }}
              onChange={this.handleChange}
              aria-labelledby="continuous-slider"
            />
          </div>
        </Popover>
      </>
    );
  }
}

export default BrightnessButton;
