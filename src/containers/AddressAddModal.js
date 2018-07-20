import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  // Platform,
  // ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loader from '../components/Loader';
import BYTouchable from '../components/BYTouchable';

import { PRIMARY_COLOR, BORDER_COLOR } from '../styles/variables';

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  SIDEINTERVAL,
  // STATUSBAR_HEIGHT,
} from '../common/constants';

import * as cityInfosActionCreators from '../common/actions/cityInfos';
import * as modalActionCreators from '../common/actions/modal';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  mask: {
    flex: 1,
  },
  closeWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 45,
    paddingRight: WINDOW_WIDTH * 0.02,
  },
  close: {
    fontSize: 24,
    color: '#666',
  },
  nav: {
    flexDirection: 'row',
    paddingLeft: SIDEINTERVAL,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
  },
  navItem: {
    height: 45,
    lineHeight: 45,
    textAlign: 'center',
    color: '#666',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: SIDEINTERVAL * 2,
  },
  navActive: {
    color: PRIMARY_COLOR,
    borderBottomColor: PRIMARY_COLOR,
  },
  scrollView: {
    height: WINDOW_HEIGHT * 0.6,
    display: 'none',
  },
  ScrollViewShow: {
    display: 'flex',
  },
  scrollViewItem: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollViewActive: {
    color: PRIMARY_COLOR,
  },
  scrollViewWrap: {
    position: 'relative',
  },
});

class AddressAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressIndex: 0, // 显示哪个ScrollView
      division2ndID: null,
      division3rdID: null,
      division4thID: null,
      division2ndName: null,
      division3rdName: null,
      division4thName: null,
    };
  }

  componentDidMount() {
    const {
      cityInfosFetch,
      modalProps: { params },
    } = this.props;

    cityInfosFetch(1, 'division2nd');

    // 是否进行数据初始化（常用于编辑，反之新建）
    if (params) {
      this.setState({
        addressIndex: 2,
      });

      this.handleOnPressCitySelect(
        params.division2nd,
        params.division2ndName,
        0,
      );
      this.handleOnPressCitySelect(
        params.division3rd,
        params.division3rdName,
        1,
      );
      this.handleOnPressCitySelect(
        params.division4th,
        params.division4thName,
        2,
      );
    }
  }

  handleOnModalClose = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  handleOnPressCitySelect(id, name, key) {
    console.log(this.props);
    let item;

    const {
      division2ndID,
      division3rdID,
      // division4thID,
      division2ndName,
      division3rdName,
      // division4thName,
    } = this.state;

    const {
      cityInfosFetch,
      modalProps: { callback = () => {} },
    } = this.props;

    switch (key) {
      case 0:
        item = {
          addressIndex: 1,
          division2ndName: name,
          division3rdName: null,
          division4thName: null,
          division2ndID: id,
          division3rdID: null,
          division4thID: null,
        };
        cityInfosFetch(id, 'division3rd');
        break;

      case 1:
        item = {
          addressIndex: 2,
          division3rdName: name,
          division4thName: null,
          // division2ndID: null,
          division3rdID: id,
          division4thID: null,
        };
        cityInfosFetch(id, 'division4th');
        break;

      case 2:
        item = {
          addressIndex: 2,
          division4thName: name,
          // division2ndID: division2nd.id,
          // division3rdID: division3rd.id,
          division4thID: id,
        };
        callback({
          division2ndName,
          division3rdName,
          division4thName: name,
          division2ndID,
          division3rdID,
          division4thID: id,
        });
        this.handleOnModalClose();
        break;

      default:
        break;
    }
    this.setState(item);
  }

  renderContent() {
    const renderScrollView = (item, scrollViewKey) => {
      const {
        addressIndex,
        division2ndID,
        division3rdID,
        division4thID,
      } = this.state;

      const divisionObject = key => {
        switch (key) {
          case 0:
            return division2ndID;
          case 1:
            return division3rdID;
          case 2:
            return division4thID;
          default:
            return division4thID;
        }
      };

      return (
        <ScrollView
          style={[
            styles.scrollView,
            addressIndex === scrollViewKey && styles.ScrollViewShow,
          ]}
          key={scrollViewKey}
        >
          {item.map(val => (
            <BYTouchable
              style={styles.scrollViewItem}
              key={val.id}
              onPress={() =>
                this.handleOnPressCitySelect(val.id, val.name, scrollViewKey)
              }
            >
              <Text
                style={[
                  styles.scrollViewItemText,
                  divisionObject(scrollViewKey) === val.id &&
                    styles.scrollViewActive,
                ]}
              >
                {val.name}
              </Text>
              <Ionicons
                style={[
                  styles.scrollViewItemIcon,
                  divisionObject(scrollViewKey) === val.id &&
                    styles.scrollViewActive,
                ]}
                name="ios-radio-button-on-outline"
              />
            </BYTouchable>
          ))}
        </ScrollView>
      );
    };

    const {
      addressIndex,
      division2ndID,
      division3rdID,
      // division4thID,
      division2ndName,
      division3rdName,
      division4thName,
    } = this.state;

    const {
      loading,
      division2ndItems,
      division3rdItems,
      division4thItems,
    } = this.props;

    return (
      <View style={styles.container}>
        {/* <Text style={styles.mask} /> */}
        <View style={styles.closeWrap}>
          <EvilIcons
            style={styles.close}
            name="close"
            onPress={() => this.handleOnModalClose()}
          />
        </View>
        <ScrollView
          style={styles.nav}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Text
            style={[styles.navItem, addressIndex === 0 && styles.navActive]}
            onPress={() => this.setState({ addressIndex: 0 })}
          >
            {division2ndName || 'Tỉnh/Thành'}
          </Text>
          {division2ndID && (
            <Text
              style={[styles.navItem, addressIndex === 1 && styles.navActive]}
              onPress={() => this.setState({ addressIndex: 1 })}
            >
              {division3rdName || 'Quận/huyện'}
            </Text>
          )}
          {division3rdID && (
            <Text
              style={[styles.navItem, addressIndex === 2 && styles.navActive]}
              onPress={() => this.setState({ addressIndex: 2 })}
            >
              {division4thName || 'Phường, xã'}
            </Text>
          )}
        </ScrollView>
        <View style={styles.scrollViewWrap}>
          {[division2ndItems, division3rdItems, division4thItems].map(
            (val, key) => renderScrollView(val, key),
          )}
          {loading && <Loader absolutePosition />}
        </View>
      </View>
    );
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={this.handleOnModalClose}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mask} />
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default connect(
  state => {
    const {
      cityInfos,
      modal: { modalProps = {} },
    } = state;

    // const {
    // } = this.props;

    return {
      modalProps,
      loading: cityInfos.loading,
      division2ndItems: cityInfos.division2nd,
      division3rdItems: cityInfos.division3rd,
      division4thItems: cityInfos.division4th,
    };
  },
  {
    ...cityInfosActionCreators,
    ...modalActionCreators,
  },
)(AddressAddModal);
