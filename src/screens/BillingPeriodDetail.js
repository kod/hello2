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
    backgroundColor: '#f5f5f5',
  },
});

class BillDetail extends React.Component {

  componentDidMount() {
    
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
      <View style={styles.container}>
        <Text style={styles.title}>3/12 period</Text>
      </View>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      item: {
        backgroundColor: '#fff',
      },
      order: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        color: '#ccc',
        fontSize: 11,
        paddingTop: 20,
        paddingBottom: 5,
      },
    });
    return (
      <View style={styles.container} >
       <View style={styles.item} >
        <Text style={styles.order} >NO. 1521890352288VNLJWQZ6ZURA</Text>
        <NavBar2 
          onPress={() => {}}
          valueLeft={'MI mix2 6+64G'}
          valueMiddle={'2018-02-03'}
          backgroundColor={'transparent'}
          isShowRight={false}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'iPhone 7 128G'}
          valueMiddle={'2018-04-01'}
          backgroundColor={'transparent'}
          isShowRight={false}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'Tatal'}
          valueMiddle={'80.500 vnd'}
          backgroundColor={'transparent'}
          isShowRight={false}
          styleMiddle={{ color: PRIMARY_COLOR }}
        />
        <SeparateBar />
        <SeparateBar />
       </View>
       <View style={styles.item} >
        <Text style={styles.order} >NO. 1521890352288VNLJWQZ6ZURA</Text>
        <NavBar2 
          onPress={() => {}}
          valueLeft={'MI mix2 6+64G'}
          valueMiddle={'2018-02-03'}
          backgroundColor={'transparent'}
          isShowRight={false}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'iPhone 7 128G'}
          valueMiddle={'2018-04-01'}
          backgroundColor={'transparent'}
          isShowRight={false}
        />
        <NavBar2 
          onPress={() => {}}
          valueLeft={'Tatal'}
          valueMiddle={'80.500 vnd'}
          backgroundColor={'transparent'}
          isShowRight={false}
          styleMiddle={{ color: PRIMARY_COLOR }}
        />
        <SeparateBar />
        <SeparateBar />
       </View>
      </View>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate, goBack }, i18n } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
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
