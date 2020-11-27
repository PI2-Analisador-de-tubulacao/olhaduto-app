import React, { Component } from 'react';
import ROSLIB from 'roslib';
import { IconButton, Popover, Slider } from '@material-ui/core';
import BrightnessIcon from '../../../resources/icons/brightness_icon.svg';

class BrightnessButton extends Component {
  constructor(props) {
    super(props);
    this.ros = new ROSLIB.Ros({
      encoding: 'ascii',
      url: 'ws://localhost:9090',
    });

    this.state = {
      anchorEl: null,
      brightnessValue: 0,
      ledCommandTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/commands/leds',
        messageType: 'std_msgs/Float32',
      }),
    };
  }

  componentDidMount() {
    const { brightnessValue, ledCommandTopic } = this.state;
    const message = new ROSLIB.Message({ data: brightnessValue });
    ledCommandTopic.publish(message);
  }

  componentDidUpdate(prevProps, prevState) {
    const { brightnessValue, ledCommandTopic } = this.state;
    if (brightnessValue !== prevState.brightnessValue) {
      const message = new ROSLIB.Message({ data: brightnessValue });
      ledCommandTopic.publish(message);
    }
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
              height: '45px',
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
              min={0}
              max={100}
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
