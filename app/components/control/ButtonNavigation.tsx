import React, { Component } from 'react';
import ROSLIB from 'roslib';
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

class NavigationButton extends Component {
  constructor(props: Props) {
    super(props);
    this.ros = new ROSLIB.Ros({
      encoding: 'ascii',
      url: 'ws://localhost:9090',
    });

    this.state = {
      movement: {
        x: 0,
        y: 0,
        z: 0,
      },
      movementTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/commands/move',
        messageType: 'geometry_msgs/Vector3',
      }),
    };
  }

  componentDidMount() {
    const { movement, movementTopic } = this.state;
    const message = new ROSLIB.Message({
      x: movement.x,
      y: movement.y,
      z: movement.z,
    });
    movementTopic.publish(message);
  }

  componentDidUpdate(prevProps, prevState) {
    const { movement, movementTopic } = this.state;
    if (movement !== prevState.movement) {
      const message = new ROSLIB.Message({
        x: movement.x,
        y: movement.y,
        z: movement.z,
      });
      movementTopic.publish(message);
    }
  }

  movePlatform = (direction) => {
    const mapAxis = {
      forward: 'y',
      backwards: 'y',
      rigth: 'x',
      left: 'x',
    };
    const mapOperation = {
      forward: 1,
      backwards: -1,
      rigth: 1,
      left: -1,
    };
    const axis = mapAxis[direction];
    const operation = mapOperation[direction];
    this.setState((state) => {
      return {
        ...state,
        movement: {
          ...state.movement,
          [axis]: (state.movement[axis] += operation),
        },
      };
    });
  };

  render() {
    const { name, buttonRadius } = this.props;
    const iconButtonSize = 59;
    const middle = buttonRadius / 2 - iconButtonSize / 2;
    const edge = buttonRadius - iconButtonSize;
    return (
      <NavButtonWrapper>
        <NavLabelDiv buttonRadius={buttonRadius}>{name}</NavLabelDiv>
        <NavButtonDiv buttonRadius={buttonRadius}>
          <IconButton
            component="span"
            onClick={() => {
              this.movePlatform('forward');
            }}
            style={{ position: 'absolute', left: `${middle}px` }}
          >
            <ArrowDropUpIcon fontSize="large" color="action" />
          </IconButton>
          <IconButton
            style={{
              position: 'absolute',
              left: `${edge}px`,
              top: `${middle}px`,
            }}
            onClick={() => {
              this.movePlatform('rigth');
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
            onClick={() => {
              this.movePlatform('backwards');
            }}
            component="span"
          >
            <ArrowDropDownIcon fontSize="large" color="action" />
          </IconButton>
          <IconButton
            component="span"
            onClick={() => {
              this.movePlatform('left');
            }}
            style={{ position: 'absolute', top: `${middle}px` }}
          >
            <ArrowLeftIcon fontSize="large" color="action" />
          </IconButton>
        </NavButtonDiv>
      </NavButtonWrapper>
    );
  }
}

NavigationButton.propTypes = {
  name: PropTypes.string,
  buttonRadius: PropTypes.number,
};

NavigationButton.defaultProps = {
  name: '',
  buttonRadius: 220,
};

export default NavigationButton;
