import React from 'react';
import logo from './logo.svg';
import './Prediction.css';
import * as tf from '@tensorflow/tfjs';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
const IMG_WIDTH = 448;
const IMG_HEIGHT = 448;

class Prediction extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      image: "http://placehold.it/180"
    }
  }

  componentDidMount = async () => {
    const cracksSegModel = await loadGraphModel('http://localhost:3000/unet_js_v1/model.json')
		this.setState({model: cracksSegModel});
  }

  normalize = (image) => {
    image[0] = image[0].map((row) => row.map((px) => {return (px - 0.485)/(0.229*255.0)}));
    image[1] = image[1].map((row) => row.map((px) => {return (px - 0.456)/(0.224*255.0)}));
    image[2] = image[2].map((row) => row.map((px) => {return (px - 0.406)/(0.225*255.0)}));
    return image;
  }

	reshape = (image) => {
    // Equivalent to image.reshape((IMG_WIDTH,IMG_HEIGHT,3)) in numpy
    // using a 3d image
    
		var reshapedImage = [];
    var initialPos = 0; 
    var row = [], rowsGroup = [];
    
    for(let i = 0;i < IMG_HEIGHT;i++){
      for(let j = 0;j < IMG_WIDTH;j++){
        for(let ix = initialPos; ix < initialPos + 3;ix++){
          row.push(image[ix]/255.0);
        }
        initialPos += 3;
        rowsGroup.push(row);
        row = [];
      }
      reshapedImage.push(rowsGroup);
      rowsGroup = []; 
    }
    return reshapedImage;
  }

	removeAlphaChannel = (image) => {
		var preprocessedImage = [];
		for(let i = 0;i < image.length;i++){
			if((i+1)%4 != 0){
				preprocessedImage.push(image[i]);
			}	
		}
		return preprocessedImage;

	}

  arrayToImg = (arr, imgHeight, imgWidth) => {
var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    // size the canvas to your desired image
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // get the imageData and pixel array fr
    var imgData = ctx.getImageData(0, 0, IMG_WIDTH, IMG_HEIGHT);
    var data = imgData.data;

    // manipulate some pixel elements
    var ix = 0
    for (var i = 0; i < IMG_WIDTH*IMG_HEIGHT*4; i += 4) {
        data[i + 1] = Math.round(arr[ix]*255.0); // set every red pixel element to 255
        data[i + 3] = 255; // make this pixel opaque
        ix++;
    }

    // put the modified pixels back on the canvas
    ctx.putImageData(imgData, 0, 0);

    // create a new img object
    var image = new Image();

    // set the img.src to the canvas data url
    image.src = canvas.toDataURL();

    // append the new img object to the page
    var div = document.getElementById("predictedImage");
    div.appendChild(image)

  }

	preprocessImage = async () => {
    var myImage = document.getElementById('crack_image');
		var canvas = document.createElement('canvas');

		canvas.width = 448;
		canvas.height = 448;

		var ctx = canvas.getContext('2d');
		ctx.drawImage(myImage, 0, 0);

		var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
		data = this.removeAlphaChannel(data.data);
    data = this.reshape(data)		
    //data = this.normalize(data)		
		console.log('data', data);
    //await tf.setBackend('wasm')
    //await tf.ready();
    var a = this.state.model.executeAsync(tf.tensor([data]))
    a.then((o) => {o.data().then((d) => {console.log('ddd', d);this.arrayToImg(d, myImage.height, myImage.width)})})
    //this.state.model.executeAsync(tf.tensor([data, data, data]))

	}

  predict = () => {
		this.preprocessImage();
  }


  handleUpload = (event) => {
    this.setState({image: URL.createObjectURL(event.target.files[0])});
  }

  render() {
		console.log(this.state.model);
    return (
      <div className="App" >
        <h1>Choose an image to identify the presence of crack on it</h1>
        <input className="input" type='file' onChange={this.handleUpload} />
        <img id="crack_image" className="image" src={this.state.image} />
				<button onClick={this.predict}>Predict</button>
        <div id="predictedImage" />
      </div>
    );
  }
}

export default Prediction;
