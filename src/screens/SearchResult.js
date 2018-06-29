import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import BYHeader from '../components/BYHeader';
import BYTextInput from '../components/BYTextInput';
import BYTouchable from "../components/BYTouchable";

import * as bannerHomeRecommendActionCreators from '../common/actions/bannerHomeRecommend';
import { SIDEINTERVAL } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    paddingTop: SIDEINTERVAL,
    paddingBottom: SIDEINTERVAL,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    height: 40,
    lineHeight: 40,
    paddingLeft: SIDEINTERVAL * 0.8,
    paddingRight: SIDEINTERVAL * 0.8,
  },
  title: {
    fontSize: 11,
    color: '#ccc',
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    marginBottom: 10,
  },
  history: {
    paddingLeft: SIDEINTERVAL,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    paddingRight: SIDEINTERVAL,
  },
  historyTitle: {
    fontSize: 11,
    color: '#666',
  },
  historyCloseIcon: {
    fontSize: 14,
  },
});

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  // renderHeaderTitle = () => {
  //   return (
  //     <View style={{ flex: 1, paddingRight: width * 0.07, }} >
  //       <View style={{ flexDirection: 'row', alignItems: 'center', height: 30, backgroundColor: '#1c62da', borderRadius: 14, paddingLeft: width * 0.03 }} >
  //         <MaterialIcons name="search" style={{ fontSize: 18, color: 'rgba(255,255,255,.5)', marginRight: width * 0.01 }} />
  //         <BYTextInput autoFocus={true} underlineColorAndroid={'rgba(0,0,0,.0)'} placeholder={'Search'} placeholderTextColor={'rgba(255,255,255,.5)'} style={{ color: '#fff', flex: 1, height: 30, paddingTop: 0, paddingBottom: 0, }} />
  //       </View>
  //     </View>
  //   )
  // }

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
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>search</Text>
      </BYTouchable>
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate } } = this.props;
    return (
      <View style={styles.container} >
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
        />
        <View style={styles.search} >
          <BYTextInput 
            style={styles.textInput} 
            autoFocus={true}
            placeholder={'XiaoMi 5A'}
            placeholderTextColor={'#ccc'}
            value={this.state.searchText} 
            onChangeText={(text) => this.setState({ searchText: text })}
          />
        </View>
        <ScrollView>
          <Text style={styles.title} >popular searches</Text>
          <View style={styles.history} >
            <BYTouchable style={styles.historyItem} >
              <Text style={styles.historyTitle} >VIVO v9</Text>
              <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => {}} />
            </BYTouchable>
            <BYTouchable style={styles.historyItem} >
              <Text style={styles.historyTitle} >VIVO v9</Text>
              <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => {}} />
            </BYTouchable>
            <BYTouchable style={styles.historyItem} >
              <Text style={styles.historyTitle} >VIVO v9</Text>
              <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => {}} />
            </BYTouchable>
            <BYTouchable style={styles.historyItem} >
              <Text style={styles.historyTitle} >VIVO v9</Text>
              <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => {}} />
            </BYTouchable>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        bannerHomeRecommend,
      } = state;

      const {

      } = props;

      return {
        bannerHomeRecommend: bannerHomeRecommend || {}
      }
    }
  },
  {
    ...bannerHomeRecommendActionCreators,
  }
)(SearchResult);

// function mapStateToProps(state, props) {
//   const { bannerHomeRecommend } = state;
//   return {
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connect(mapStateToProps, { ...bannerHomeRecommendActionCreators })(SearchResult);
