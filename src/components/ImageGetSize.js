import React, { Component } from 'react';
import { View, Image, InteractionManager } from 'react-native';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

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
          InteractionManager.runAfterInteractions(() => {
            this.setState({width, height});
          });
        },
        (error) => {
          console.dir(error);
        },
      )
  }

  render() {
    const { width, height } = this.state;
    const { uri, ...restProps } = this.props;
    return (
      <Image 
        style={{width: WINDOW_WIDTH, height: height / width * WINDOW_WIDTH, resizeMode: 'contain'}} 
        source={{uri: uri}}
        {...restProps}
      />
    );
  }
}

export default ImageGetSize;