import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import {
  // RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from '../styles/variables';
import {
  SCREENS,
  SIDEINTERVAL,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
} from '../common/constants';

import * as getMenuActionCreators from '../common/actions/getMenu';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class Categories extends Component {
  componentDidMount() {
    const { getMenuFetch, navigation } = this.props;

    this.didBlurSubscription = navigation.addListener('didFocus', () => {
      getMenuFetch();
    });
  }

  componentWillUnmount() {
    this.didBlurSubscription.remove();
  }

  renderHeaderTitle = () => {
    const stylesX = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      title: {
        fontSize: 16,
        color: '#333',
        height: 45,
        lineHeight: 45,
      },
    });

    const { i18n } = this.props;

    return (
      <View style={stylesX.container}>
        <Text style={stylesX.title}>{i18n.categories}</Text>
      </View>
    );
  };

  renderScrollViewRight() {
    const stylesX = StyleSheet.create({
      scrollViewRight: {
        width: WINDOW_WIDTH * 0.75,
      },
      main: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
    });

    const {
      // levelOne,
      levelTwo,
      levelOneIndex,
      // navigation: { navigate },
    } = this.props;

    return (
      <ScrollView style={stylesX.scrollViewRight}>
        <View style={stylesX.main}>
          {levelTwo.map(
            (val, key) =>
              levelOneIndex === key && this.renderScrollViewRightItem(val, key),
          )}
        </View>
      </ScrollView>
    );
  }

  renderScrollViewRightItem(val, key) {
    const stylesX = StyleSheet.create({
      rightItemTitle: {
        fontSize: 11,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 15,
      },
      rightItemMain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
      },
      rightItemSubItem: {
        width: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        height: (WINDOW_WIDTH * 0.74 - SIDEINTERVAL * 2) / 3,
        alignItems: 'center',
        marginBottom: 25,
      },
      rightItemSubItemImage: {
        resizeMode: 'contain',
        width: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        height: (WINDOW_WIDTH * 0.75 - SIDEINTERVAL * 8) / 3,
        marginBottom: 3,
      },
      rightItemSubItemText: {
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 11 * 1.618,
        color: '#666',
      },
    });

    const {
      // levelOne,
      levelTwo,
      navigation: { navigate },
    } = this.props;

    return (
      <View style={stylesX.rightItem} key={key}>
        <Text style={stylesX.rightItemTitle} />
        <View style={stylesX.rightItemMain}>
          {levelTwo.length !== 0 &&
            val.map(val1 => (
              <BYTouchable
                style={stylesX.rightItemSubItem}
                key={val1.imageUrl}
                onPress={() =>
                  navigate(SCREENS.CateList, {
                    parent_id: val1.parentId,
                    classfy_id: val1.id,
                  })
                }
              >
                <Image
                  style={stylesX.rightItemSubItemImage}
                  source={{ uri: val1.imageUrl }}
                />
                <Text style={stylesX.rightItemSubItemText}>{val1.name}</Text>
              </BYTouchable>
            ))}
        </View>
      </View>
    );
  }

  renderContent() {
    const stylesX = StyleSheet.create({
      content: {
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 1,
        flexDirection: 'row',
      },
      scrollViewLeft: {
        width: WINDOW_WIDTH * 0.25,
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 55,
        borderRightColor: BORDER_COLOR,
        borderRightWidth: 1,
      },
      main: {
        // paddingTop: SIDEINTERVAL,
        // paddingBottom: SIDEINTERVAL,
      },
      item: {
        position: 'relative',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
      },
      itemImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
      },
      itemText: {
        fontSize: 11,
        lineHeight: 11 * 1.618,
        color: '#333',
        textAlign: 'center',
      },
      itemActive: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 5,
        backgroundColor: PRIMARY_COLOR,
      },
    });

    const {
      levelOne,
      getMenuIndexFetch,
      levelOneIndex,
      // loading,
      // loading,
    } = this.props;

    return (
      <View style={stylesX.content}>
        <ScrollView style={stylesX.scrollViewLeft}>
          <View style={stylesX.main}>
            {levelOne.map((val, key) => (
              <BYTouchable
                style={stylesX.item}
                key={val.image}
                onPress={() => getMenuIndexFetch(key)}
              >
                <Image style={stylesX.itemImage} source={{ uri: val.image }} />
                <Text style={stylesX.itemText}>{val.name}</Text>

                {levelOneIndex === key && <View style={stylesX.itemActive} />}
              </BYTouchable>
            ))}
          </View>
        </ScrollView>
        {this.renderScrollViewRight()}
      </View>
    );
  }

  render() {
    const {
      // getMenu,
      // navigation: { navigate },
      // i18n,
      loaded,
    } = this.props;

    if (!loaded) return <Loader />;

    return (
      <View style={styles.container}>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          showBackButton={false}
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      console.log();
      return state => {
        const {
          getMenu,
          // getMenu,
        } = state;

        // const {

        // } = props;

        return {
          loading: getMenu.loading,
          loaded: getMenu.loaded,
          levelOne: getMenu.levelOne,
          levelTwo: getMenu.levelTwo,
          levelOneIndex: getMenu.levelOneIndex,
          levelTwoIndex: getMenu.levelTwoIndex,
        };
      };
    },
    {
      ...getMenuActionCreators,
      ...authActionCreators,
    },
  )(Categories),
);
