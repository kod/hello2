import React, { Component } from 'react';
import { View, Image, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

class PXCacheImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: null,
    };
  }

  componentDidMount() {
    const { uri, onFoundImageSize } = this.props;
    this.task = RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      key: uri,
      path: `${RNFetchBlob.fs.dirs.CacheDir}/reactstore/${uri.split('/').pop()}`,
    }).fetch('GET', uri, {
      // referer: 'http://www.pixiv.net',
      // 'Cache-Control' : 'no-store'
    });
    this.task
      .then(res => {
        if (!this.unmounting) {
          // const base64Str = `data:image/png;base64,${res.base64()}`;
          const filePath =
            Platform.OS === 'android'
              ? `file://${res.path()}`
              : `${res.path()}`;
          Image.getSize(filePath, (width, height) => {
            if (!this.unmounting) {
              this.setState({
                imageUri: filePath,
                width,
                height,
              });
              if (onFoundImageSize) {
                onFoundImageSize(width, height, filePath);
              }
            }
          });
        }
      })
      .catch(() => {});
  }
  componentWillUnmount() {
    this.unmounting = true;
    if (this.task) {
      this.task.cancel();
    }
  }

  render() {
    const { uri, style, ...otherProps } = this.props;
    const { width, height } = this.state;
    return width && height
      ? <View
          style={{
            width: WINDOW_WIDTH,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Image
            source={{
              uri,
              headers: {
                // referer: 'http://www.pixiv.net',
              },
            }}
            style={[
              {
                // width:
                //   width > WINDOW_WIDTH
                //     ? WINDOW_WIDTH
                //     : width,
                height: WINDOW_WIDTH * height / width,
                width: WINDOW_WIDTH,
                height: height / width * WINDOW_WIDTH,
                resizeMode: 'contain',
              },
              style,
            ]}
            {...otherProps}
          />
        </View>
      : null;
  }
}

export default PXCacheImage;
