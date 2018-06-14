import React, { Component } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native';
import { WINDOW_WIDTH, SIDEINTERVAL, RED_COLOR, APPBAR_HEIGHT, STATUSBAR_HEIGHT, WINDOW_HEIGHT, PRIMARY_COLOR, } from '../styles/variables';
import BYTouchable from '../components/BYTouchable';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const inputPasswordBackgroundItemWidth = (WINDOW_WIDTH - SIDEINTERVAL * 2) / 6;

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'transparent',
    height: APPBAR_HEIGHT,
  },
});

class BillSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  
  renderBillSelect() {
    const {
      onRequestClose,
    } = this.props;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.1)',
        // backgroundColor: 'transparent',
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
        paddingTop: SIDEINTERVAL * 2,
        paddingBottom: SIDEINTERVAL * 2,
      },
      main: {
        backgroundColor: '#fff',
      },
      nav: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: SIDEINTERVAL,
      },
      navItem: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        height: 50,
        lineHeight: 50,
        color: '#999',
      },
      navItemActive: {
        color: '#555',
      },
      wrap: {
        height: WINDOW_HEIGHT - APPBAR_HEIGHT - STATUSBAR_HEIGHT - SIDEINTERVAL * 6 - 50,
        paddingBottom: SIDEINTERVAL,
      },
      item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingLeft: SIDEINTERVAL * 2,
        paddingRight: SIDEINTERVAL * 2,
      },
      itemActive: {
        color: PRIMARY_COLOR,
      },
      itemText: {
        color: '#555',
      },
    });
    
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.nav} >
            <Text style={styles.navItem} >2016</Text>
            <Text style={[styles.navItem, styles.navItemActive]} >2017</Text>
            <Text style={styles.navItem} >2018</Text>
          </View>
          <ScrollView style={styles.wrap} >
            <View style={styles.item} >
              <Text style={styles.itemText} >1</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >2</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >3</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={[styles.itemText, styles.itemActive]} >4</Text>
              <Text style={[styles.itemText, styles.itemActive]} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >5</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >6</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >7</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >8</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >9</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >10</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >11</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
            <View style={styles.item} >
              <Text style={styles.itemText} >12</Text>
              <Text style={styles.itemText} >1.200.770 VND</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;

    return (
      <Modal 
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <Text
          style={styles.mask} 
          onPress={onRequestClose}
        ></Text>
        {this.renderBillSelect()}
      </Modal>
    );
  }
}

export default BillSelect;
