import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import CustomIcon from "../components/CustomIcon";
import BYTouchable from "../components/BYTouchable";
import NavBar2 from "../components/NavBar2";
import SeparateBar from "../components/SeparateBar";
import { SIDEINTERVAL, APPBAR_HEIGHT, WINDOW_WIDTH, STATUSBAR_HEIGHT, PRIMARY_COLOR, } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: PRIMARY_COLOR,
  },
  headerBack: {
    height: APPBAR_HEIGHT,
    lineHeight: APPBAR_HEIGHT,
    paddingLeft: WINDOW_WIDTH * 0.03,
    paddingRight: SIDEINTERVAL,
    fontSize: 15,
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: '#ff0',
    flex: 1,
    paddingRight: 40,
  },
});

class BillDetail extends React.Component {

  componentDidMount() {
    
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      main: {
        paddingTop: 30,
        backgroundColor: PRIMARY_COLOR,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      title: {
        fontSize: 11,
        color: '#69aef8',
        marginBottom: 5,
      },
      price: {
        fontSize: 30,
        color: '#fff',
        marginBottom: 25,
      },
      items: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    });
    return (
      <View style={styles.container} >
        <View style={styles.main} >
          <Text style={styles.title}>Payment in April.</Text>
          <Text style={styles.price}>1.082.500 VND</Text>
        </View>
        <View style={styles.items} >
          <NavBar2 
            valueLeft={'Principal'} 
            valueMiddle={'884.000 VND'} 
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor={'transparent'}
          />
          <NavBar2 
            valueLeft={'Interest'} 
            valueMiddle={'600 VND'} 
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor={'transparent'}
          />
          <NavBar2 
            valueLeft={'Accountant bill date'} 
            valueMiddle={'2018-03-22'} 
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor={'transparent'}
          />
          <NavBar2 
            valueLeft={'Latest repayment date'} 
            valueMiddle={'2018-04-05'} 
            styleLeft={{ color: '#999' }}
            styleMiddle={{ color: '#666' }}
            isShowRight={false}
            backgroundColor={'transparent'}
          />
        </View>
        <SeparateBar />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'3月2期'} 
          valueMiddle={'80.000VND'} 
          styleLeft={{ color: '#999' }}
          styleMiddle={{ color: '#666' }}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'3月2期'}
          valueMiddle={'80.000VND'}
          styleLeft={{ color: '#999' }}
          styleMiddle={{ color: '#666' }}
        />
      </View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate, goBack }, i18n } = this.props;

    return (
      <View style={styles.container} >
        <View style={styles.header} >
          <BYTouchable onPress={() => goBack()} >
            <CustomIcon
              name="back"
              style={styles.headerBack}
            />
          </BYTouchable>
          <Text style={styles.title}>bill details</Text>
        </View>
        <ScrollView >
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
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, ...authActionCreators })(BillDetail)
);
