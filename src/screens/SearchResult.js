import React from 'react';
import { StyleSheet, Text, View, TextInput, } from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';

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

    this.handleOnPressSubmit = this.handleOnPressSubmit.bind(this);
  }

  componentDidMount() {
    const { searchHistoryFetch } = this.props;
    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.searchTextInput.focus();
      }
    );
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  handleOnPressSubmit() {
    const {
      searchText,
    } = this.state;

    const {
      searchHistoryAdd,
      navigation: { navigate },
    } = this.props;

    if (searchText.length > 0) {
      searchHistoryAdd([searchText])
      navigate(SCREENS.SearchResultList, { findcontent: searchText })
    }
  }

  handleOnPressHistoryItem(val) {
    const {
      navigation: { navigate },
    } = this.props;
    this.setState({ searchText: val })
    navigate(SCREENS.SearchResultList, { findcontent: val })
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
        backgroundColor="transparent" 
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

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
        />
        <View style={styles.search}>
          <TextInput 
            style={styles.textInput}
            underlineColorAndroid="rgba(0,0,0,.0)" 
            placeholder={'search'}
            placeholderTextColor="#ccc"
            value={this.state.searchText} 
            onChangeText={(text) => this.setState({ searchText: text })}
            returnKeyType={'search'}
            blurOnSubmit={true}
            onSubmitEditing={this.handleOnPressSubmit}
            ref={(input) => { this.searchTextInput = input; }} 
          />
        </View>
        {
          items.length > 0 && 
          <Text style={styles.title}>historical search</Text>
        }
        <View style={styles.history}>
          {
            items.map((val, key) => (
              <BYTouchable 
                style={styles.historyItem} 
                onPress={() => this.handleOnPressHistoryItem(val)} 
                key={key} 
              >
                <Text style={styles.historyTitle}>{val}</Text>
                <EvilIcons style={styles.historyCloseIcon} name={'close'} onPress={() => searchHistoryRemove(val)} />
              </BYTouchable>
            ))
          }
        </View>
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
