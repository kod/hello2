import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { connect } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import NavBar1 from "../components/NavBar1";
import BYTouchable from "../components/BYTouchable";
import { RED_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

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
})

class QrCodeScanner extends React.Component {

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  onSuccess(e) {
    console.log(e);
    Alert.alert(
      '',
      e.data,
      [
        { 
          text: '确定', 
          onPress: () => {}
        }
      ]
    )

    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
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
      <BYTouchable 
        style={styles.container} 
        backgroundColor={'transparent'} 
      >
        <Text style={styles.title}>Scan QR Code</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      bannerHomeRecommend,
      navigation: { navigate },
      i18n 
    } = this.props;
    
    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          showMarker={true}
          // topContent={
          //   <Text style={styles.centerText}></Text>
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
)(QrCodeScanner));


// function mapStateToProps(state, props) {
//   const { bannerHomeRecommend } = state;
//   return {
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connectLocalization(
//   connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, ...authActionCreators })(QrCodeScanner)
// );
