import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import { WINDOW_WIDTH, SIDEINTERVAL, MODAL_TYPES } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTextInput from '../components/BYTextInput';
import BYButton from '../components/BYButton';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import { PRIMARY_COLOR } from '../styles/variables';

import * as collectFilesActionCreators from '../common/actions/collectFiles';
import * as authActionCreators from '../common/actions/auth';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Evalution extends Component {
  constructor(props) {
    super(props);

    const { i18n } = this.props;

    this.state = {
      payWayButtons: [i18n.album, i18n.takePhoto],
      starNumber: 3,
      textValue: '',
    };

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }

  componentDidMount() {
    // const { collectFilesFetch } = this.props;
    // collectFilesFetch();
  }

  createResizedImageImageResizer({ uri, width, height }) {
    const { collectFilesFetch } = this.props;

    ImageResizer.createResizedImage(uri, width, height, 'JPEG', 50)
      .then(response => {
        collectFilesFetch({
          files: {
            // uri: uri,
            uri: response.uri,
            name: response.name,
          },
        });
      })
      .catch(err => {
        console.dir(err);
      });
  }

  actionSheetCallback(ret) {
    // const {
    //   navigation: { navigate },
    // } = this.props;
    if (ret.buttonIndex === -1) return false;

    if (ret.buttonIndex === 0) {
      // 相册
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        this.createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        });
      });
    } else {
      // 拍照
      ImagePicker.openCamera({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        this.createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        });
      });
    }
    return true;
  }

  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  handleOnPressStar(index) {
    this.setState({
      starNumber: index,
    });
  }

  handleOnLongPressImgDel(index) {
    const { collectFilesRemove } = this.props;
    collectFilesRemove(index);
    // this.setState({
    //   images: this.state.images.splice(index, 1),
    // })
  }

  handleOnPressSelectPics() {
    const { payWayButtons } = this.state;
    const { openModal } = this.props;
    openModal(MODAL_TYPES.ACTIONSHEET, {
      callback: ret => this.actionSheetCallback(ret),
      buttons: payWayButtons,
    });
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
      },
      startWrap: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
      },
      starIcon: {
        color: '#ccc',
        fontSize: 18,
        marginRight: 5,
      },
      starIconActive: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        marginRight: 5,
      },
      mainWrap: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        marginBottom: 70,
      },
      main: {
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
      },
      textInput: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        marginBottom: 50,
      },
      pics: {
        flexDirection: 'row',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      imageItem: {
        position: 'relative',
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        backgroundColor: '#e5e5e5',
        marginRight: SIDEINTERVAL,
      },
      imageItemOnLongPress: {
        position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        // backgroundColor: '#ff0',
        zIndex: 888,
      },
      imageItemImage: {
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      selectPics: {
        alignItems: 'center',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      cameraIcon: {
        color: '#999',
        fontSize: 16,
        // marginBottom: 5,
        paddingTop: 7,
      },
      cameraText: {
        color: '#ccc',
        fontSize: 8,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        lineHeight: 11 * 1.618,
      },
    });

    const { starNumber, textValue } = this.state;

    const { images, i18n } = this.props;

    return (
      <View style={stylesX.container}>
        <View style={stylesX.startWrap}>
          {[0, 1, 2, 3, 4].map(val => (
            <FontAwesome
              style={
                starNumber > val ? stylesX.starIconActive : stylesX.starIcon
              }
              name="star"
              key={val}
              onPress={() => this.handleOnPressStar(val + 1)}
            />
          ))}
        </View>
        <View style={stylesX.mainWrap}>
          <View style={stylesX.main}>
            <BYTextInput
              style={stylesX.textInput}
              placeholder={i18n.pleaseEnterYourComment}
              placeholderTextColor="#ccc"
              onChangeText={val => this.setState({ textValue: val })}
              value={textValue}
              maxLength={150}
              numberOfLines={3}
              multiline
            />
            <View style={stylesX.pics}>
              {images.map((val, key) => (
                <View style={stylesX.imageItem} key={key}>
                  <Text
                    style={stylesX.imageItemOnLongPress}
                    onLongPress={() => this.handleOnLongPressImgDel(key)}
                  />
                  <Image style={stylesX.imageItemImage} source={{ uri: val }} />
                  {/* <Image style={stylesX.imageItemImage} source={require('../images/viemnam.png')} /> */}
                </View>
              ))}
              <BYTouchable
                style={stylesX.selectPics}
                onPress={() => this.handleOnPressSelectPics()}
              >
                <FontAwesome style={stylesX.cameraIcon} name="camera" />
                <Text style={stylesX.cameraText}>0/5</Text>
              </BYTouchable>
            </View>
          </View>
          <Text style={stylesX.tips}>{i18n.yourCommentAnonymous}</Text>
          <Text style={stylesX.tips}>{i18n.longPressDeletePicture}</Text>
        </View>
        <BYButton
          text={i18n.submit}
          styleWrap={styles.button}
          onPress={() => {}}
        />
      </View>
    );
  }

  render() {
    // const { payWayButtons } = this.state;

    const {
      // collectFiles,
      // navigation: { navigate },
      loading,
      // i18n,
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView>{this.renderContent()}</ScrollView>
        {loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const {
        collectFiles,
        // collectFiles,
      } = state;

      // const {

      // } = props;

      return {
        collectFiles,
        loading: collectFiles.loading,
        images: collectFiles.images,
      };
    },
    {
      ...collectFilesActionCreators,
      ...authActionCreators,
      ...modalActionCreators,
    },
  )(Evalution),
);
