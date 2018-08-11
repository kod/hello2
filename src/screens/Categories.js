import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';

import { connectLocalization } from '../components/Localization';
import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import Loader from '../components/Loader';
import { RED_COLOR, BORDER_COLOR, PRIMARY_COLOR } from '../styles/variables';
import { SCREENS, SIDEINTERVAL, WINDOW_WIDTH, WINDOW_HEIGHT, APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../common/constants';

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
    const { getMenuFetch } = this.props;
    getMenuFetch();
  }

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
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
    })
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
      </View>
    )
  }

  renderScrollViewRight() {
    const styles = StyleSheet.create({
      scrollViewRight: {
        width: WINDOW_WIDTH * 0.75,
      },
      main: {
        paddingTop: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
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
      levelOne,
      levelTwo,
      levelOneIndex,
      navigation: { navigate },
    } = this.props;

    return (
      <ScrollView style={styles.scrollViewRight}>
      <View style={styles.main}>
          {
            levelTwo.map((val, key) => {
              return (
                levelOneIndex === key &&
                <View style={styles.rightItem} key={key}>
                  <Text style={styles.rightItemTitle}></Text>
                  <View style={styles.rightItemMain}>
                    {
                      levelTwo.length !== 0 && 
                      val.map((val1, key1) => {
                        return (
                          <BYTouchable 
                            style={styles.rightItemSubItem} 
                            key={key1} 
                            onPress={() => navigate(SCREENS.CateList, { parent_id: val1.parentId, classfy_id: val1.id })}
                          >
                            <Image style={styles.rightItemSubItemImage} source={{ uri: val1.imageUrl }} />
                            <Text style={styles.rightItemSubItemText}>{val1.name}</Text>
                          </BYTouchable>
                        )
                      })
                    }
                  </View>
                </View>
              )
            })
          }
      </View>
    </ScrollView>
    )
  }

  renderContent() {
    const styles = StyleSheet.create({
      content: {
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - 1,
        flexDirection: 'row',
      },
      scrollViewLeft: {
        width: WINDOW_WIDTH * 0.25,
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
      loading,
    } = this.props;

    if (loading) return <Loader />;
    
    return (
      <View style={styles.content}>
        <ScrollView style={styles.scrollViewLeft}>
          <View style={styles.main}>
            {
              levelOne.map((val, key) => {
                return (
                  <BYTouchable style={styles.item} 
                    key={key} 
                    onPress={() => getMenuIndexFetch(key)}
                  >
                    <Image style={styles.itemImage} source={{ uri: val.image }} />
                    <Text style={styles.itemText}>{val.name}</Text>

                    {
                      levelOneIndex === key && 
                      <View style={styles.itemActive} />
                    }
                  </BYTouchable>
                )
              }) 
            }
          </View>
        </ScrollView>
        {this.renderScrollViewRight()}
      </View>
    )
  }

  render() {
    const { getMenu, navigation: { navigate }, i18n } = this.props;

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
      return (state, props) => {
        const {
          getMenu,
        } = state;

        // const {

        // } = props;

        return {
          loading: getMenu.loading,
          levelOne: getMenu.levelOne,
          levelTwo: getMenu.levelTwo,
          levelOneIndex: getMenu.levelOneIndex,
          levelTwoIndex: getMenu.levelTwoIndex,
        }
      }
    },
    {
      ...getMenuActionCreators,
      ...authActionCreators,
    }
  )(Categories)
);


// function mapStateToProps(state, props) {
//   const { getMenu } = state;
//   return {
//     loading: getMenu.loading,
//     levelOne: getMenu.levelOne,
//     levelTwo: getMenu.levelTwo,
//     levelOneIndex: getMenu.levelOneIndex,
//     levelTwoIndex: getMenu.levelTwoIndex,
//   };
// }

// export default connectLocalization(
//   connect(mapStateToProps, { ...getMenuActionCreators, ...authActionCreators })(Categories)
// );
