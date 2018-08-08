import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  // ScrollView,
  Image,
  Clipboard,
  Platform,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode';

import {
  // SCREENS,
  SIDEINTERVAL,
  WINDOW_WIDTH,
} from '../common/constants';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import SeparateBar from '../components/SeparateBar';
// import BYTouchable from '../components/BYTouchable';

import {
  // RED_COLOR,
  PRIMARY_COLOR,
} from '../styles/variables';

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';
// import priceFormat from '../common/helpers/priceFormat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrText: 'https://buyoo.vn/',
    };
  }

  // componentDidMount() {
  //   const { bannerHomeRecommendFetch } = this.props;
  //   // bannerHomeRecommendFetch();
  // }

  async handleOnPressCopy() {
    Clipboard.setString('hello world');
    if (Platform.OS === 'android')
      ToastAndroid.show('复制成功', ToastAndroid.SHORT);
  }

  renderMenuBottomShare() {
    const styles = StyleSheet.create({
      contanier: {
        paddingTop: 20,
        backgroundColor: PRIMARY_COLOR,
      },
      title: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30,
      },
      titleIcon: {
        fontSize: 16,
        color: '#fff',
        paddingTop: 2,
        paddingRight: 4,
      },
      titleText: {
        fontSize: 14,
        color: '#fff',
      },
      main: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
        paddingLeft: SIDEINTERVAL * 3,
        paddingRight: SIDEINTERVAL * 3,
      },
      item: {
        height: 40,
        width: 40,
      },
    });
    return (
      <View style={styles.contanier}>
        <View style={styles.title}>
          <Ionicons style={styles.titleIcon} name="ios-paper-plane" />
          <Text style={styles.titleText}>tap to share</Text>
        </View>
        <View style={styles.main}>
          <Image style={styles.item} source={require('../images/zalofun.png')} />
          <Image style={styles.item} source={require('../images/googleplus.png')} />
        </View>
      </View>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        // position: 'relative',
        flex: 1,
        // backgroundColor: '#f00',
      },
      row1: {
        flex: 1,
        // backgroundColor: '#0f0',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 60,
      },
      row1Title: {
        fontSize: 11,
        color: '#666',
        paddingTop: 15,
      },
      wrap: {
        // position: 'absolute',
        // bottom: 0,
      },
      row2: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      row2Left: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      row2Middle: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        paddingRight: WINDOW_WIDTH * 0.02,
      },
      row2Right: {
        height: 25,
        lineHeight: 25,
        textAlign: 'center',
        color: '#fff',
        fontSize: 11,
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: WINDOW_WIDTH * 0.04,
        paddingRight: WINDOW_WIDTH * 0.04,
        borderRadius: 14,
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <QRCode
            value={this.state.qrText}
            size={200}
          />
          <Text style={styles.row1Title}>Show this QR code or share the invitation code to your friends</Text>
        </View>
        <SeparateBar />
        <View style={styles.row2}>
          <Text style={styles.row2Left}>My inviation code</Text>
          <Text style={styles.row2Middle}>123456789123</Text>
          <Text style={styles.row2Right} onPress={() => this.handleOnPressCopy()}>COPY</Text>
        </View>
        {this.renderMenuBottomShare()}
        {/* <View style={styles.wrap}>
        </View> */}
      </View>
    )
  }

  render() {
    const {
      bannerHomeRecommend,
      navigation: { navigate },
      i18n 
    } = this.props;

    return (
      <View style={styles.container}>
        <BYHeader />
        {/* <ScrollView> */}
          {this.renderContent()}
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        bannerHomeRecommend,
      } = state;

      // const {

      // } = props;

      return {
        bannerHomeRecommend: bannerHomeRecommend || {}
      }
    }
  },
  {
    ...bannerHomeRecommendActionCreators,
    ...authActionCreators,
  }
)(Invite));
