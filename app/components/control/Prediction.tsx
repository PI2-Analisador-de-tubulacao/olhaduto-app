import React from 'react';
import ROSLIB from 'roslib';
import './Prediction.css';
import * as tf from '@tensorflow/tfjs';
import { loadGraphModel } from '@tensorflow/tfjs-converter';
import Button from '@material-ui/core/Button';

const IMG_WIDTH = 448;
const IMG_HEIGHT = 448;

class Prediction extends React.Component {
  constructor(props) {
    super(props);
    this.ros = new ROSLIB.Ros({ encoding: 'ascii' });
    this.ros.connect('ws://localhost:9090');

    const node = new ROSLIB.Topic({
      ros: this.ros,
      name: '/image/image_raw',
      messageType: 'sensor_msgs/Image',
    });

    this.state = {
      image: 'http://placehold.it/180',
      node,
    };
  }

  componentDidMount = async () => {
    const { node } = this.state;
    const cracksSegModel = await loadGraphModel(
      '../resources/unet_js/model.json'
    );
    node.subscribe((message) => {
      this.streamVideo(message.data, message.height, message.width);
    });
    this.setState({ model: cracksSegModel });
  };

  streamVideo = (array, imgHeight, imgWidth) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // get the imageData and pixel array fr
    const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    let ix = 0;
    for (let i = 0; i < imgHeight * imgWidth * 3; i += 3) {
      imgData.data[ix] = array[i];
      imgData.data[ix + 1] = array[i + 1];
      imgData.data[ix + 2] = array[i + 2];
      imgData.data[ix + 3] = 255;
      ix += 4;
    }
    ctx.putImageData(imgData, 0, 0);

    const image = document.getElementById('crack_image');

    image.src = canvas.toDataURL();
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
    const div = document.getElementById('images');
    div.appendChild(image);
  };

  preprocessImage = async () => {
    const myImage = document.getElementById('crack_image');

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

  handleUpload = (event) => {
    this.removeLastImage();
    this.setState({ image: URL.createObjectURL(event.target.files[0]) });
  };

  render() {
    const { image } = this.state;
    return (
      <div
        id="imageDiv"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexBasis: '80%',
          justifyContent: 'space-around',
        }}
      >
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={this.handleUpload}
          />
        </Button>
        <div id="images" style={{ position: 'relative' }}>
          <img
            style={{ maxWidth: '500px' }}
            id="crack_image"
            src={image}
            alt="uploaded"
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
