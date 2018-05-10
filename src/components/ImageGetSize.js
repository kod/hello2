import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { WINDOW_WIDTH } from "../styles/variables";

class ImageGetSize extends Component {
  constructor(props) {
    super(props);
    this.state = {
        width: 0,
        height: 0,
    };
  }

  componentDidMount() {
    const { uri } = this.props;
    Image.getSize(
      uri,
      (width, height) => {
        this.setState({width, height});
      },
      (error) => {
        console.log(error);
      },
    )
  }

  render() {
    const { uri } = this.props;
    return (
      <Image 
        style={{width: WINDOW_WIDTH, height: this.state.height / this.state.width * WINDOW_WIDTH, resizeMode: 'contain'}} 
        source={{uri: uri}}
      />
    );
  }
}

export default ImageGetSize;