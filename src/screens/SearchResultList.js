import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { SCREENS } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import NavBar1 from "../components/NavBar1";
import BYTouchable from "../components/BYTouchable";
import { RED_COLOR } from "../styles/variables";
import { SIDEINTERVAL, WINDOW_WIDTH } from "../common/constants";

import BYTextInput from "../components/BYTextInput";
import ProductItem3 from "../components/ProductItem3";

import * as findProductsActionCreators from '../common/actions/findProducts';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class Settings extends React.Component {

  componentDidMount() {
    const {
      findProductsFetch,
      findcontent,
    } = this.props;
    findProductsFetch({
      findcontent,
    });
    console.log(findcontent);
  }

  // handleOnPressHeaderBackButton = () => {
  //   const { goBack } = this.props.navigation;
  //   goBack();
  // };

  renderHeaderTitle = () => {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingRight: WINDOW_WIDTH * 0.07,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#f5f5f5',
        paddingLeft: WINDOW_WIDTH * 0.03,
      },
      headerIcon: {
        fontSize: 18,
        color: '#ccc',
      },
      textInput: {
        flex: 1,
        color: '#fff',
        backgroundColor: '#f5f5f5',
        height: 40,
        lineHeight: 40,
        paddingLeft: SIDEINTERVAL * 0.8,
        paddingRight: SIDEINTERVAL * 0.8,    
      },
    });
    
    return (
      <View style={styles.container} >
        <View style={styles.header} >
          <MaterialIcons 
            name="search" 
            style={styles.headerIcon} 
          />
          <BYTextInput 
            autoFocus={true} 
            underlineColorAndroid={'rgba(0,0,0,.0)'} 
            placeholder={'Search'} 
            placeholderTextColor={'#ccc'} 
            style={styles.textInput} 
          />
        </View>
      </View>
    )
  }

  render() {
    const {
      items,
      navigation: { navigate },
      i18n 
    } = this.props;

    console.log('=============');
    console.log(items);
    console.log(items.length);

    return (
      <View style={styles.container} >
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
        />
          {/* <FlatList
            data={items}
            keyExtractor={page => page}
            renderItem={<ProductItem3 />}
            // removeClippedSubviews={gfalse}
            // ListFooterComponent={this.renderFooter}
            // onScroll={this.handleOnScroll}
            // onViewableItemsChanged={this.handleOnViewableItemsChanged}
            // scrollEventThrottle={16}
            // bounces={false}
          /> */}
        {/* <ScrollView style={styles.container} > */}
        {/* </ScrollView> */}
        {
          items.length > 0 &&
          <ProductItem3 data={items} style={{ backgroundColor: '#fff' }} />
        }
      </View>
    );
  }
}

export default connectLocalization(connect(
  () => {
    return (state, props) => {
      const {
        findProducts,
      } = state;

      const {
        navigation,
      } = props;

      return {
        items: findProducts.items,
        findcontent: navigation.state.params.findcontent,
      }
    }
  },
  {
    ...findProductsActionCreators,
    ...authActionCreators,
  }
)(Settings));
