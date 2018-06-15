import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTouchable from "../components/BYTouchable";
import BYButton from "../components/BYButton";
import { SIDEINTERVAL, RED_COLOR, PRIMARY_COLOR, WINDOW_WIDTH } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})

class Settings extends React.Component {

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 40,
        flexDirection: 'row',
        // backgroundColor: '#f00',
        height: 40,
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
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={styles.title}>Set the stage</Text>
      </BYTouchable>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        // backgroundColor: 
      },
      main: {
        backgroundColor: '#fff',
        paddingTop: 30,
      },
      wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        marginBottom: 45,

      },
      item: {
        width: (WINDOW_WIDTH - SIDEINTERVAL * 3) / 2,
        borderWidth: 1,
        borderColor: '#f5f5f5',
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        marginRight: SIDEINTERVAL,
        marginBottom: SIDEINTERVAL,
      },
      itemNumber: {
        fontSize: 24,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        // backgroundColor: '#f00',
      },
      itemText: {
        fontSize: 14,
        lineHeight: 14,
        color: '#999',
        textAlign: 'center',
      },
      submit: {
        marginBottom: 45,
      },
      tips: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL * 2,
        paddingBottom: SIDEINTERVAL * 2,
      },
      tipsTitle: {
        color: '#999',
        marginBottom: 5,
      },
      tipsText: {
        fontSize: 11,
        color: '#999',
        marginBottom: 5,
        lineHeight: 11 * 1.618,
      },
    });
    
    return (
      <View style={styles.container} >
        <View style={styles.main} >
          <View style={styles.wrap} >
            <View style={styles.item} >
              <Text style={styles.itemNumber} >3</Text>
              <Text style={styles.itemText} >period</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemNumber} >6</Text>
              <Text style={styles.itemText} >period</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemNumber} >9</Text>
              <Text style={styles.itemText} >period</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemNumber} >12</Text>
              <Text style={styles.itemText} >period</Text>
            </View>
          </View>
          <BYButton text={'confirm'} styleWrap={styles.submit} />
        </View>
        <View style={styles.tips} >
          <Text style={styles.tipsTitle} >说明:</Text>
          <Text style={styles.tipsText} >1. 每月26日为出账日，出账日之前的账单可以在此处修改分期数; 出账日之后的账单不可以再修改分期数。</Text>
          <Text style={styles.tipsText} >2. 请根据自己的消费情况设置合理的分期数，以免影响到个人还款信用。</Text>
        </View>
      </View>
    )
  }
  
  render() {
    const { bannerHomeRecommend, navigation: { navigate }, i18n } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader  
          headerTitle={this.renderHeaderTitle()}
        />
        <ScrollView style={styles.container} >
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
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, })(Settings)
);
