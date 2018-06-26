import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

import { SCREENS, WINDOW_WIDTH } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTextInput from "../components/BYTextInput";
import BYButton from "../components/BYButton";
import BYTouchable from "../components/BYTouchable";
import { RED_COLOR, PRIMARY_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class Evalution extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starNumber: 3,
      textValue: '',
    };
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  handleOnPressSelectPics() {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   // cropping: true
    // }).then(image => {
    //   console.log(image);
    // });
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  renderContent() {
    const styles = StyleSheet.create({
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
      imagePlaceHolder: {
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        backgroundColor: '#e5e5e5',
        marginRight: SIDEINTERVAL,
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
      },
    });

    const {
      starNumber,
      textValue,
    } = this.state;
    
    return (
      <View style={styles.container} >
        <View style={styles.startWrap} >
          {
            [0,1,2,3,4].map((val) => 
              <FontAwesome  style={starNumber > val ? styles.starIconActive : styles.starIcon } name="star" key={val} />
            )
          }
        </View>
        <View style={styles.mainWrap} >
          <View style={styles.main} >
            <BYTextInput 
              style={styles.textInput}
              placeholder={'please enter your name'}
              placeholderTextColor={'#ccc'}
              onChangeText={(val) => this.setState({ textValue: val })}
              value={textValue}
              maxLength={150}
              numberOfLines={3}
              multiline={true}
            />
            <View style={styles.pics} >
              <View style={styles.imagePlaceHolder}></View>
              <View style={styles.imagePlaceHolder}></View>
              <View style={styles.imagePlaceHolder}></View>
              <View style={styles.imagePlaceHolder}></View>
              <View style={styles.imagePlaceHolder}></View>
              <BYTouchable style={styles.selectPics} onPress={() => this.handleOnPressSelectPics()} >
                <FontAwesome  style={ styles.cameraIcon } name="camera" />
                <Text style={styles.cameraText} >0/5</Text>
              </BYTouchable>
            </View>
          </View>
          <Text style={styles.tips} >your comment will be anonymous</Text>
        </View>
        <BYButton text={'publish'} styleWrap={styles.button} onPress={() => {}} />
      </View>
    )
  }
  
  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  const { bannerHomeRecommend } = state;
  return {
    bannerHomeRecommend: bannerHomeRecommend || {}
  };
}

export default connectLocalization(
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, ...authActionCreators })(Evalution)
);
