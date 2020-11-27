import React, { Component } from 'react';
import ROSLIB from 'roslib';
import { Slider } from '@material-ui/core';

class CameraHeightButton extends Component {
  constructor(props) {
    super(props);
    this.ros = new ROSLIB.Ros({
      encoding: 'ascii',
      url: 'ws://localhost:9090',
    });

    this.state = {
      cameraHeight: 0,
      cameraHeightTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/commands/camera/height',
        messageType: 'std_msgs/Int8',
      }),
    };
  }

  componentDidMount() {
    const { cameraHeight, cameraHeightTopic } = this.state;
    const message = new ROSLIB.Message({ data: cameraHeight });
    cameraHeightTopic.publish(message);
  }

  componentDidUpdate(prevProps, prevState) {
    const { cameraHeight, cameraHeightTopic } = this.state;
    if (cameraHeight !== prevState.cameraHeight) {
      const message = new ROSLIB.Message({ data: cameraHeight });
      cameraHeightTopic.publish(message);
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ cameraHeight: newValue });
  };

  render() {
    const { cameraHeight } = this.state;
    return (
      <Slider
        min={0}
        max={100}
        value={cameraHeight}
        orientation="vertical"
        style={{ height: '200px' }}
        onChange={this.handleChange}
        aria-labelledby="continuous-slider"
      />
    );
  }
}

export default CameraHeightButton;
