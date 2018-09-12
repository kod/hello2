import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Linking,
  Clipboard,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import BYHeader from '../components/BYHeader';
import SeparateBar from '../components/SeparateBar';
import {
  BACKGROUND_COLOR_THIRD,
  BACKGROUND_COLOR_PRIMARY,
  FONT_SIZE_SIXTH,
  FONT_COLOR_FIFTH,
  FONT_SIZE_FIRST,
  FONT_COLOR_PRIMARY,
  BACKGROUND_COLOR_SECOND,
  FONT_COLOR_SECOND,
} from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  PAYOO_STORE_MAP,
  SCREENS,
  MONETARY,
  MODAL_TYPES,
} from '../common/constants';
import { connectLocalization } from '../components/Localization';
import Loader from '../components/Loader';
import Upload from '../components/Upload';
import BYButton from '../components/BYButton';

import * as uploadImgActionCreators from '../common/actions/uploadImg';
import * as modalActionCreators from '../common/actions/modal';
import * as getImgUrlActionCreators from '../common/actions/getImgUrl';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_SECOND,
  },
});

class StudentCardUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: '',
      obverse: '',
      status: '', // positive: 正面 obverse: 反面
    };
  }

  componentWillReceiveProps(nextProps) {
    const { status } = this.state;
    const {
      loading: prevLoading,
      loaded: prevLoaded,
      // getImgUrlLoading: prevGetImgUrlLoading,
      getImgUrlLoaded: prevGetImgUrlLoaded,
    } = this.props;
    const {
      loading,
      loaded,
      image,
      openModal,
      closeModal,
      getImgUrlClear,
      getImgUrlFetch,
      // getImgUrlLoading,
      getImgUrlLoaded,
      urls,
    } = nextProps;

    if (prevLoading !== loading) {
      if (loading === false) {
        closeModal();
      } else {
        openModal(MODAL_TYPES.LOADER);
      }
    }

    if (prevLoaded !== loaded && loaded === true) {
      // 图片上传完成
      if (image !== '') {
        // 图片上传成功
        getImgUrlClear();
        getImgUrlFetch(image);
      } else {
        // 图片上传失败
      }
    }

    if (prevGetImgUrlLoaded !== getImgUrlLoaded && getImgUrlLoaded === true) {
      // 获取私服链接完成
      if (urls !== '') {
        // 获取私服链接成功
        this.setState({
          [status]: urls,
        });
      } else {
        // 获取私服链接失败
      }
    }
  }

  createResizedImageImageResizer({ uri, width, height }) {
    const {
      uploadImgFetch,
      uploadImgClear,
      isAuthUser,
      navigation: { navigate },
    } = this.props;
    if (isAuthUser) {
      ImageResizer.createResizedImage(
        uri,
        width * 0.5,
        height * 0.5,
        'JPEG',
        50,
      )
        .then(response => {
          uploadImgClear();
          uploadImgFetch({
            files: {
              uri: response.uri,
              name: response.name,
            },
            fileType: '2',
          });
        })
        .catch(err => {
          console.dir(err);
        });
    } else {
      navigate(SCREENS.Login);
    }
  }

  handleOnPressSubmit() {
    const { positive, obverse } = this.state;
    const { i18n } = this.props;
    if (positive === '')
      return Alert.alert('', i18n.pleaseUploadFront, [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ]);

    if (obverse === '')
      return Alert.alert('', i18n.pleaseUploadReverseSide, [
        {
          text: i18n.confirm,
          onPress: () => {},
        },
      ]);

    return true;
  }

  handleOnPressUploadImage(status) {
    this.setState({
      status,
    });
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

  renderContent() {
    const { positive, obverse } = this.state;
    const { i18n } = this.props;

    const stylesX = StyleSheet.create({
      container: {
        paddingTop: 15,
      },
      main: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        marginBottom: 15,
      },
    });

    return (
      <View style={stylesX.container}>
        <View style={stylesX.main}>
          <Upload
            title={i18n.studentCardPositive}
            onPress={() => this.handleOnPressUploadImage('positive')}
            url={positive}
          />
          <SeparateBar />
          <Upload
            title={i18n.studentCardObverse}
            onPress={() => this.handleOnPressUploadImage('obverse')}
            url={obverse}
          />
        </View>
        <BYButton
          text={i18n.nextStep}
          onPress={() => this.handleOnPressSubmit()}
        />
      </View>
    );
  }

  render() {
    const { i18n } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader title={i18n.uploadStudentCard} />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => (state, props) => {
      const { login, uploadImg, getImgUrl } = state;

      return {
        loading: uploadImg.loading,
        loaded: uploadImg.loaded,
        image: uploadImg.image,
        getImgUrlLoading: getImgUrl.loading,
        getImgUrlLoaded: getImgUrl.loaded,
        urls: getImgUrl.urls,
        isAuthUser: !!login.user,
      };
    },
    {
      ...uploadImgActionCreators,
      ...modalActionCreators,
      ...getImgUrlActionCreators,
    },
  )(StudentCardUpload),
);
