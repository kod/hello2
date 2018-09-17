/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import BYHeader from '../components/BYHeader';
import SeparateBar from '../components/SeparateBar';
import { BACKGROUND_COLOR_SECOND } from '../styles/variables';
import {
  SIDEINTERVAL,
  SCREENS,
  MODAL_TYPES,
  PRIVATE_URL_REGEX,
  ID_CARD_POSITIVE_IMAGE,
  ID_CARD_OBVERSE_IMAGE,
} from '../common/constants';
import { connectLocalization } from '../components/Localization';
import Upload from '../components/Upload';
import BYButton from '../components/BYButton';

import * as uploadImgActionCreators from '../common/actions/uploadImg';
import * as modalActionCreators from '../common/actions/modal';
import * as getImgUrlActionCreators from '../common/actions/getImgUrl';
import * as submitInfoActionCreators from '../common/actions/submitInfo';
import * as auditGetInfoActionCreators from '../common/actions/auditGetInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR_SECOND,
  },
});

class IdCardUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positive: '',
      obverse: '',
      status: '', // positive: 正面 obverse: 反面
      isFocus: true, // 页面是否显示在前端
    };
  }

  componentDidMount() {
    const {
      getImgUrlClear,
      getImgUrlFetch,
      auditGetInfoIdentification,
      navigation,
    } = this.props;
    if (auditGetInfoIdentification !== '') {
      getImgUrlClear();
      getImgUrlFetch(auditGetInfoIdentification);
    }

    this.didFocusSubscription = navigation.addListener('didFocus', () => {
      this.setState({
        isFocus: true,
      });
    });
    this.willBlurSubscription = navigation.addListener('willBlur', () => {
      this.setState({
        isFocus: false,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { status, isFocus } = this.state;
    const {
      loaded: prevLoaded,
      getImgUrlLoaded: prevGetImgUrlLoaded,
      // auditGetInfoLoaded: prevAuditGetInfoLoaded,
      submitInfoLoaded: prevSubmitInfoLoaded,
    } = this.props;
    const {
      loading,
      loaded,
      image,
      openModal,
      closeModal,
      getImgUrlClear,
      getImgUrlFetch,
      getImgUrlLoading,
      getImgUrlLoaded,
      // auditGetInfoLoaded,
      auditGetInfoLoading,
      // auditGetInfoStudentCard,
      submitInfoLoading,
      submitInfoLoaded,
      submitInfoIsTrue,
      urls,
      navigation: { navigate },
    } = nextProps;

    if (isFocus === true) {
      if (
        auditGetInfoLoading ||
        submitInfoLoading ||
        getImgUrlLoading ||
        loading
      ) {
        openModal(MODAL_TYPES.LOADER);
      } else {
        closeModal();
      }
    }

    if (prevLoaded !== loaded && loaded === true && isFocus === true) {
      // 图片上传完成
      if (image !== '') {
        // 图片上传成功
        getImgUrlClear();
        getImgUrlFetch(image);
      } else {
        // 图片上传失败
      }
    }

    if (
      prevGetImgUrlLoaded !== getImgUrlLoaded &&
      getImgUrlLoaded === true &&
      isFocus === true
    ) {
      // 获取私服链接完成
      if (urls !== '') {
        // 获取私服链接成功
        if (status === '') {
          // 初始化数据
          const urlsArray = urls.split('|');
          this.setState({
            positive: urlsArray[0] || '',
            obverse: urlsArray[1] || '',
          });
        } else {
          this.setState({
            [status]: urls,
          });
        }
      } else {
        // 获取私服链接失败
      }
    }

    if (
      prevSubmitInfoLoaded !== submitInfoLoaded &&
      submitInfoLoaded === true &&
      isFocus === true
    ) {
      // 提交审核信息完成
      if (submitInfoIsTrue === true) {
        // 提交审核信息成功
        navigate(SCREENS.HandHeldPhotoUpload);
      } else {
        // 提交审核信息失败
      }
    }

    // if (
    //   prevAuditGetInfoLoaded !== auditGetInfoLoaded &&
    //   auditGetInfoLoaded === true &&
    //   isFocus === true
    // ) {
    //   // 获取用户审核信息完成
    //   if (auditGetInfoStudentCard !== '') {
    //     // 学生证已传
    //     // 获取私服链接
    //     getImgUrlClear();
    //     getImgUrlFetch(auditGetInfoStudentCard);
    //   } else {
    //     // 学生证未传
    //   }
    // }
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();
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
    const {
      i18n,
      submitInfoClear,
      submitInfoFetch,
      isAuthUser,
      navigation: { navigate },
    } = this.props;

    if (!isAuthUser) navigate(SCREENS.Login);

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

    const positiveMatch = positive.match(PRIVATE_URL_REGEX)[1];
    const obverseMatch = obverse.match(PRIVATE_URL_REGEX)[1];
    submitInfoClear();
    submitInfoFetch({
      identification: `${positiveMatch}|${obverseMatch}`,
    });
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
            // title={i18n.idCardPositive}
            defaultUrl={ID_CARD_POSITIVE_IMAGE}
            onPress={() => this.handleOnPressUploadImage('positive')}
            url={positive}
          />
          <SeparateBar />
          <Upload
            // title={i18n.idCardObverse}
            defaultUrl={ID_CARD_OBVERSE_IMAGE}
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
        <BYHeader title={i18n.uploadIdCard} />
        <ScrollView>{this.renderContent()}</ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { login, uploadImg, getImgUrl, auditGetInfo, submitInfo } = state;

      return {
        loading: uploadImg.loading,
        loaded: uploadImg.loaded,
        image: uploadImg.image,
        submitInfoLoading: submitInfo.loading,
        submitInfoLoaded: submitInfo.loaded,
        submitInfoIsTrue: submitInfo.isTrue,
        getImgUrlLoading: getImgUrl.loading,
        getImgUrlLoaded: getImgUrl.loaded,
        auditGetInfoLoading: auditGetInfo.loading,
        auditGetInfoLoaded: auditGetInfo.loaded,
        auditGetInfoIdentification: auditGetInfo.identification,
        // auditGetInfoStudentCard: auditGetInfo.studentCard,
        // auditGetInfoPersonalPhotos: auditGetInfo.personalPhotos,
        urls: getImgUrl.urls,
        isAuthUser: !!login.user,
      };
    },
    {
      ...uploadImgActionCreators,
      ...modalActionCreators,
      ...getImgUrlActionCreators,
      ...submitInfoActionCreators,
      ...auditGetInfoActionCreators,
    },
  )(IdCardUpload),
);
