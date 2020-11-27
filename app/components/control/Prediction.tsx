import React from 'react';
import ROSLIB from 'roslib';
import './Prediction.css';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DisplayField } from './styles';

const IMG_WIDTH = 448;
const IMG_HEIGHT = 448;

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.ros = new ROSLIB.Ros({ encoding: 'ascii' });
    this.ros.connect('ws://localhost:9090');
    this.canvasStream = document.createElement('canvas');
    this.ctxStream = this.canvasStream.getContext('2d');

    this.state = {
      imageToPredict: null,
      imageTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/image/image_raw',
        messageType: 'sensor_msgs/Image',
      }),
      pressureTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/environment/pressure',
        messageType: 'sensor_msgs/FluidPressure',
      }),
      temperatureTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/environment/temperature',
        messageType: 'sensor_msgs/Temperature',
      }),
      coordinatesTopic: new ROSLIB.Topic({
        ros: this.ros,
        name: '/coordinates',
        messageType: 'geometry_msgs/Pose2D',
      }),
      coordinates: {},
    };
  }

  componentDidMount = async () => {
    const {
      imageTopic,
      pressureTopic,
      temperatureTopic,
      coordinatesTopic,
    } = this.state;
    const cracksSegModel = await loadGraphModel(
      '../resources/unet_js/model.json'
    );
    this.setState({ model: cracksSegModel });
    imageTopic.subscribe((message) => {
      this.streamVideo(message.data, message.height, message.width);
    });
    pressureTopic.subscribe((message) => {
      this.setState({ fluidPressure: message.fluid_pressure });
    });
    temperatureTopic.subscribe((message) => {
      this.setState({ temperature: message.temperature });
    });
    coordinatesTopic.subscribe((message) => {
      this.setState({
        coordinates: { x: message.x, y: message.y, theta: message.theta },
      });
    });
  };

  componentWillUnmount() {
    delete this.canvasStream;
  }

  streamVideo = (array, imgHeight, imgWidth) => {
    this.canvasStream.width = imgWidth;
    this.canvasStream.height = imgHeight;

    const imgData = this.ctxStream.getImageData(0, 0, imgWidth, imgHeight);

    let ix = 0;
    for (let i = 0; i < imgHeight * imgWidth * 3; i += 3) {
      imgData.data[ix] = array[i];
      imgData.data[ix + 1] = array[i + 1];
      imgData.data[ix + 2] = array[i + 2];
      imgData.data[ix + 3] = 255;
      ix += 4;
    }
    this.ctxStream.putImageData(imgData, 0, 0);

    const image = document.getElementById('crack_image');

    image.src = this.canvasStream.toDataURL();
    image.height = imgHeight;
    image.width = imgWidth;
  };

  arrayToImg = (arr, imgHeight, imgWidth) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    this.removeLastImage();

    // size the canvas to your desired image
    canvas.width = IMG_WIDTH;
    canvas.height = IMG_HEIGHT;

    // get the imageData and pixel array fr
    const imgData = ctx.getImageData(0, 0, IMG_WIDTH, IMG_HEIGHT);

    // manipulate some pixel elements
    let ix = 0;
    for (let i = 0; i < IMG_WIDTH * IMG_HEIGHT * 4; i += 4) {
      imgData.data[i + 1] = Math.round(arr[ix] * 255.0); // set every red pixel element to 255
      imgData.data[i + 3] = 255; // make this pixel opaque
      ix += 1;
    }

    // put the modified pixels back on the canvas
    ctx.putImageData(imgData, 0, 0);

    // create a new img object
    const image = new Image();

    // set the img.src to the canvas data url
    image.src = canvas.toDataURL();
    image.id = 'predictedImage';
    image.height = imgHeight;
    image.width = imgWidth;
    image.style.position = 'absolute';
    image.style.top = '0';
    image.style.left = '0';
    image.style.opacity = 0.5;

    // append the new img object to the page
    const div = document.getElementById('predictionArea');
    div.appendChild(image);
  };

  preprocessImage = async () => {
    const myImage = document.getElementById('crack_image');

    this.setState({ imageToPredict: myImage.src });

    const data = tf.browser.fromPixels(myImage);
    let tensor = tf.image.resizeBilinear(data, [448, 448]); // 192,192
    tensor = tensor.reshape([1, 448, 448, 3]).div(tf.scalar(255));

    const { model } = this.state;
    const prediction = model.executeAsync(tensor);
    prediction
      .then((p) => {
        p.data()
          .then((predData) => {
            this.arrayToImg(predData, myImage.height, myImage.width);
            return null;
          })
          .catch(() => {
            return null;
          });
        return null;
      })
      .catch(() => {
        return null;
      });
  };

  predict = () => {
    this.preprocessImage();
  };

  removeLastImage = () => {
    const predictedImage = document.getElementById('predictedImage');
    if (predictedImage) {
      predictedImage.parentNode.removeChild(predictedImage);
    }
  };

  render() {
    const {
      temperature,
      coordinates,
      fluidPressure,
      imageToPredict,
    } = this.state;
    return (
      <div
        id="imageDiv"
        style={{
          display: 'flex',
          flexBasis: '80%',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <div id="images" style={{ display: 'flex', flexDirection: 'row' }}>
          <img id="crack_image" src="http://placehold.it/180" alt="uploaded" />
          <div id="predictionArea" style={{ position: 'relative' }}>
            <img src={imageToPredict} alt="selected" />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
          }}
        >
          <DisplayField
            label="Temperatura"
            defaultValue=""
            value={temperature}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">°C</InputAdornment>,
            }}
          />
          <DisplayField
            label="Pressão"
            defaultValue=""
            value={fluidPressure}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
              endAdornment: <InputAdornment position="end">Pa</InputAdornment>,
            }}
          />
          <DisplayField
            label="X"
            defaultValue=""
            value={coordinates.x}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <DisplayField
            label="Y"
            defaultValue=""
            value={coordinates.y}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <DisplayField
            label="Theta"
            defaultValue=""
            value={coordinates.theta && coordinates.theta.toFixed(2)}
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.predict}>
          Predizer Falha
        </Button>
      </div>
    );
  }
}

export default Prediction;
