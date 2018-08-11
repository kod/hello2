import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  // FlatList,
  InteractionManager,
} from 'react-native';
import { connect } from 'react-redux';

import CustomIcon from '../components/CustomIcon';
import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
// import SearchHeader from '../components/SearchHeader';
import BYTouchable from '../components/BYTouchable';
import BYTextInput from '../components/BYTextInput';
import Loader from '../components/Loader';

// import {
//   BORDER_COLOR,
//   PRIMARY_COLOR,
//   RED_COLOR,
// } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  // WINDOW_HEIGHT,
  // APPBAR_HEIGHT,
  // STATUSBAR_HEIGHT,
  // SCREENS,
} from '../common/constants';

import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';
import * as schoolInfoActionCreators from '../common/actions/schoolInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: 50,
    lineHeight: 50,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    color: '#ccc',
  },
  itemActive: {
    color: '#333',
  },
  scrollview: {
    height: 100,
    width: WINDOW_WIDTH,
  },
  tips: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: WINDOW_WIDTH * 0.03,
    paddingBottom: WINDOW_WIDTH * 0.03,
    color: '#f00',
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
});

class SchoolSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isCanLoad: false,
    };
  }

  componentDidMount() {
    const { schoolInfoFetch, items } = this.props;
    // schoolInfoFetch();
    if (items.length === 0) schoolInfoFetch();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isCanLoad: true,
      });
    });
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      headerMiddleMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: WINDOW_WIDTH * 0.03,
        height: 30,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
      },
      headerMiddleIcon: {
        fontSize: 12,
        color: '#ccc',
        marginRight: WINDOW_WIDTH * 0.02,
      },
      headerMiddleText: {
        flex: 1,
        // fontSize: 13,
        // color: '#ccc'
      },
    });

    const {
      inputValue,
      // inputValue,
    } = this.state;

    const {
      i18n,
      // i18n,
    } = this.props;

    return (
      <View style={stylesX.headerMiddleMain}>
        <CustomIcon name="search" style={stylesX.headerMiddleIcon} />
        <BYTextInput
          style={stylesX.headerMiddleText}
          placeholder={i18n.search}
          placeholderTextColor="#ccc"
          onChangeText={val => this.setState({ inputValue: val.toLowerCase() })}
          value={inputValue}
        />
      </View>
    );
  };

  renderHeaderRight = () => <View style={{ width: 45 }} />;

  renderHeaderLeft = () => {
    const stylesX = StyleSheet.create({
      icon: {
        width: 45,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
      },
    });

    return <CustomIcon style={stylesX.icon} name="back" onPress={() => {}} />;
  };

  handleOnPressItem(item) {
    const {
      certifiedInformationEdit,
      navigation: { goBack },
    } = this.props;
    if (item.staging !== 1) return false;
    certifiedInformationEdit('collegename', item.id);
    return goBack();
  }

  renderItem = (item, key) => (
    <BYTouchable key={key} onPress={() => this.handleOnPressItem(item)}>
      <Text style={[styles.item, item.staging === 1 && styles.itemActive]}>
        {item.name}
      </Text>
    </BYTouchable>
  );

  render() {
    const {
      isCanLoad,
      inputValue,
      // inputValue,
    } = this.state;

    const {
      i18n,
      items,
      loading,
      // schoolInfo,
      // navigation: { navigate },
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <View style={styles.container}>
        <BYHeader
          headerRight={this.renderHeaderRight()}
          headerTitle={this.renderHeaderTitle()}
        />
        <Text style={styles.tips}>{i18n.unsupportedSchoolTip}</Text>
        <ScrollView>
          {isCanLoad &&
            items
              .filter(val => val.name.toLowerCase().indexOf(inputValue) !== -1)
              .map((val, key) => this.renderItem(val, key))}
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        schoolInfo,
        // schoolInfo,
      } = state;
      return {
        items: schoolInfo.items,
        loading: schoolInfo.loading,
      };
    },
    {
      ...certifiedInformationActionCreators,
      ...schoolInfoActionCreators,
    },
  )(SchoolSelect),
);
