import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import BYHeader from '../components/BYHeader';
import BYTextInput from '../components/BYTextInput';
import BYTouchable from "../components/BYTouchable";

import * as searchHistoryActionCreators from '../common/actions/searchHistory';
import { SIDEINTERVAL, SCREENS } from '../common/constants';

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
  },
  historyTitle: {
    fontSize: 11,
    color: '#666',
  },
  historyCloseIcon: {
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
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
    const { searchHistoryFetch } = this.props;
    // searchHistoryFetch();
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
        onPress={() => this.handleOnPressToggleModal('isOpenPay')}
      >
        <Text style={styles.title}>search</Text>
      </BYTouchable>
    )
  }

  render() {
    const {
      items,
      navigation: { navigate },
      searchHistoryRemove,
    } = this.props;

    console.log(items);
    
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
        {/* <ScrollView> */}
          <Text style={styles.title} >popular searches</Text>
          <View style={styles.history} >
            {
              items.map((val, key) => (
                <BYTouchable 
                  style={styles.historyItem} 
                  onPress={() => navigate(SCREENS.SearchResultList, { findcontent: val })} 
                  key={key} 
                >
                  <Text style={styles.historyTitle} >{val}</Text>
                  <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => searchHistoryRemove(val)} />
                </BYTouchable>
              ))
            }
          </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

export default connect(
  () => {
    return (state, props) => {
      const {
        searchHistory,
      } = state;

      // const {

      // } = props;

      return {
        items: searchHistory.items
      }
    }
  },
  {
    ...searchHistoryActionCreators,
  }
)(SearchResult);
