import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

// import { SCREENS, SIDEINTERVAL } from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
// import { RED_COLOR } from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

class QrCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
  }
  // componentDidMount() {
  //   const { bannerHomeRecommendFetch } = this.props;
  //   // bannerHomeRecommendFetch();
  // }

  onSuccess(e) {
    const {
      i18n,
      // i18n,
    } = this.props;
    Alert.alert('', e.data, [
      {
        text: i18n.confirm,
        onPress: () => {},
      },
    ]);

    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
      },
      title: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
      },
    });
    return (
      <BYTouchable style={stylesX.container} backgroundColor="transparent">
        <Text style={stylesX.title}>Scan QR Code</Text>
      </BYTouchable>
    );
  };

  render() {
    // const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader headerTitle={this.renderHeaderTitle()} />
        <QRCodeScanner
          onRead={this.onSuccess}
          showMarker
          // topContent={
          //   <Text style={styles.centerText} />
          // }
          // bottomContent={
          //   <TouchableOpacity style={styles.buttonTouchable}>
          //     <Text style={styles.buttonText}>OK. Got it!</Text>
          //   </TouchableOpacity>
          // }
        />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { bannerHomeRecommend } = state;

      // const {

      // } = props;

      return {
        bannerHomeRecommend: bannerHomeRecommend || {},
      };
    },
    {
      ...bannerHomeRecommendActionCreators,
      ...authActionCreators,
    },
  )(QrCodeScanner),
);
