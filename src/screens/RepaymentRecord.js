import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import NavBar1 from "../components/NavBar1";
import BYTouchable from "../components/BYTouchable";
import { SIDEINTERVAL, RED_COLOR } from "../styles/variables";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

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
      },
      title: {
        color: '#333',
        fontSize: 16,
      },
    });
    return (
      <BYTouchable 
        style={styles.container} 
        backgroundColor={'transparent'} 
        onPress={() => this.handleOnPressToggleModal('isOpenBillSelect')}
      >
        <Text style={styles.title}>record</Text>
      </BYTouchable>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      item: {
        backgroundColor: '#fff',
        marginBottom: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      number: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        // paddingTop: 10,
        // paddingBottom: 10,
      },
      textLeft: {
        color: '#999',
        width: 70,
        // backgroundColor: '#f00',
      },
      textRight: {
        color: '#666',
      },
      cell: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
      },
    });
    return (
      <View style={styles.container} >
        <View style={styles.item} >
          <View style={styles.number} >
            <Text style={styles.textLeft} >number</Text>
            <Text style={styles.textRight} >C0316011200001560047</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >sum</Text>
            <Text style={styles.textRight} >8.000.500 VND</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >date</Text>
            <Text style={styles.textRight} >2018.04.25</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >bank</Text>
            <Text style={styles.textRight} >visa</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >way</Text>
            <Text style={styles.textRight} >bank</Text>
          </View>
        </View>
        <View style={styles.item} >
          <View style={styles.number} >
            <Text style={styles.textLeft} >number</Text>
            <Text style={styles.textRight} >C0316011200001560047</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >sum</Text>
            <Text style={styles.textRight} >8.000.500 VND</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >date</Text>
            <Text style={styles.textRight} >2018.04.25</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >bank</Text>
            <Text style={styles.textRight} >visa</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >way</Text>
            <Text style={styles.textRight} >bank</Text>
          </View>
        </View>
        <View style={styles.item} >
          <View style={styles.number} >
            <Text style={styles.textLeft} >number</Text>
            <Text style={styles.textRight} >C0316011200001560047</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >sum</Text>
            <Text style={styles.textRight} >8.000.500 VND</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >date</Text>
            <Text style={styles.textRight} >2018.04.25</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >bank</Text>
            <Text style={styles.textRight} >visa</Text>
          </View>
          <View style={styles.cell} >
            <Text style={styles.textLeft} >way</Text>
            <Text style={styles.textRight} >bank</Text>
          </View>
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
  connect(mapStateToProps, { ...bannerHomeRecommendActionCreators, })(Settings)
);
