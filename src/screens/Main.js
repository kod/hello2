import React from 'react';
import { ScrollView, ListView, StyleSheet, View, Text, RefreshControl, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import { BACKGROUND_COLOR, HEADER_BACKGROUND_COLOR } from "../styles/variables";
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from "../common/constants";

import { SCREENS } from '../common/constants';

import { STATUSBAR_HEIGHT } from "../common/constants";

import ScrollableTabView from '../components/ScrollableTabView';
import Scrollable1 from '../components/Scrollable1';
import Scrollable2 from '../components/Scrollable2';
import Scrollable3 from '../components/Scrollable3';
import Scrollable4 from '../components/Scrollable4';
import { connectLocalization } from '../components/Localization';
import i18n from '../common/helpers/i18n';
import CustomIcon from '../components/CustomIcon.js';
import BYTouchable from '../components/BYTouchable';
import SearchHeader from '../components/SearchHeader';

import * as i18nActionCreators from '../common/actions/i18n';
import * as scrollableTabViewActionCreators from '../common/actions/scrollableTabView';
import * as bannerSwiperActionCreators from '../common/actions/bannerSwiper';
import * as bannerHomeTypeActionCreators from '../common/actions/bannerHomeType';
import * as promotionInfoActionCreators from '../common/actions/promotionInfo';
import * as adverstInfoActionCreators from '../common/actions/adverstInfo';
import * as mergeGetInfoActionCreators from '../common/actions/mergeGetInfo';
import * as adPhoneActionCreators from '../common/actions/adPhone';
import * as topComputerActionCreators from '../common/actions/topComputer';
import * as newComputerActionCreators from '../common/actions/newComputer';
import * as adDigitalActionCreators from '../common/actions/adDigital';

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BACKGROUND_COLOR
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40 + STATUSBAR_HEIGHT,
    backgroundColor: HEADER_BACKGROUND_COLOR,
    paddingTop: STATUSBAR_HEIGHT,
  },
  headerMiddle: {
    flex: 8
  },
  headerMiddleMain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: WINDOW_WIDTH * 0.03,
    height: 30,
    backgroundColor: '#f5f5f5',
    borderRadius: 1
  },
  headerMiddleIcon: {
    fontSize: 12,
    color: '#ccc',
    marginRight: WINDOW_WIDTH * 0.02
  },
  headerMiddleText: {
    fontSize: 13,
    color: '#ccc'
  },
  headerIcon: {
    height: 40,
    lineHeight: 40,
    paddingLeft: WINDOW_HEIGHT * 0.03,
    paddingRight: WINDOW_HEIGHT * 0.03,
    color: '#999',
    fontSize: 18
  }
});

class Main extends React.Component {
  constructor() {
    super();

    this.onChangeTab = this.onChangeTab.bind(this);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.auto_data = function(num = 20, begin = 0) {
      let empty_array = [];
      for (let index = begin; index < num + begin; index++) {
        empty_array.push(`row ${index}`);
      }
      return empty_array;
    };

    this._data = this.auto_data();

    this.state = {
      dataSource: this.ds.cloneWithRows(this._data),
      refreshing: false
    };
  }

  componentDidMount() {
    const {
      navigation: { navigate },
      i18n,
      setLanguage,
    } = this.props;

    // setTimeout(() => {
    //   // navigate(SCREENS.WebView, {
    //   //   source: 'https://buyoo.vn/html/about.html'
    //   // });
    //   navigate(SCREENS.Pay, {
    //     tradeNo: '210320180613100829786253',
    //     orderNo: '220180613100829817675838324',
    //   });

    // }, 300);
  }

  _onDataArrived() {}

  _onRefresh() {
    const { 
      scrollTabIndex,
      bannerSwiperFetch,
      bannerHomeTypeFetch,
      promotionInfoFetch,
      adverstInfoFetch,
      mergeGetInfoFetch,
      adPhoneFetch,
      topComputerFetch,
      newComputerFetch,
      adDigitalFetch,
     } = this.props;
    switch (scrollTabIndex) {
      case 0:
        bannerSwiperFetch('one');
        bannerHomeTypeFetch();
        promotionInfoFetch();
        adverstInfoFetch({
          type_id: '1'
        });
        adverstInfoFetch({
          type_id: '2'
        });
        adverstInfoFetch({
          type_id: '5'
        });
        mergeGetInfoFetch();

        break;

      case 1:
        bannerSwiperFetch('two');
        adPhoneFetch();

        break;

      case 2:
        topComputerFetch();
        newComputerFetch();
  
        break;

      case 3:
        bannerSwiperFetch('four');
        adDigitalFetch();
        break;

      default:
        break;
    }

    this.setState({ refreshing: true });
    setTimeout(() => {
      this._onDataArrived();
      this.setState({ refreshing: false });
    }, 1000);
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  onChangeTab(res) {
    const { scrollableTabViewIndex, scrollTabIndex } = this.props;
    if (res.i !== res.from) scrollableTabViewIndex(res.i);
  }

  render() {
    const {
      navigation: { navigate },
      i18n
    } = this.props;

    const scrollableTabKeys = [
      {
        tabLabel: i18n.recommend,
        view: <Scrollable1 {...this.props} />
      },
      {
        tabLabel: i18n.mobileCommunications,
        view: <Scrollable2 {...this.props} />
      },
      {
        tabLabel: i18n.computerOffice,
        view: <Scrollable3 {...this.props} />
      },
      {
        tabLabel: i18n.digitalDevices,
        view: <Scrollable4 {...this.props} />
      }
    ];

    const content = scrollableTabKeys.map((val, key) => {
      return (
        <View tabLabel={val.tabLabel} style={styles.base} key={key}>
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />}>{scrollableTabKeys[key].view}</ScrollView>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <SearchHeader 
          text={'XiaoMi 5A'} 
          onPress={() => navigate(SCREENS.QrCodeScanner)}
        />
        {/* <View style={styles.headerContainer}>
          <BYTouchable>
            <CustomIcon name="notice" style={styles.headerIcon} />
          </BYTouchable>
          <BYTouchable style={styles.headerMiddle} onPress={() => navigate(SCREENS.SearchResult)}>
            <View style={styles.headerMiddleMain}>
              <CustomIcon name="search" style={styles.headerMiddleIcon} />
              <Text style={styles.headerMiddleText}>XiaoMi 5A</Text>
            </View>
          </BYTouchable>
          <CustomIcon name="qrcode" style={styles.headerIcon} />
        </View> */}
        <ScrollableTabView content={content} onChangeTab={this.onChangeTab} />
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          scrollableTabView,
        } = state;

        const {

        } = props;

        return {
          scrollTabIndex: scrollableTabView.index
        }
      }
    },
    {
      ...i18nActionCreators,
      ...scrollableTabViewActionCreators,
      ...bannerSwiperActionCreators,
      ...bannerHomeTypeActionCreators,
      ...promotionInfoActionCreators,
      ...mergeGetInfoActionCreators,
      ...adverstInfoActionCreators,
      ...adPhoneActionCreators,
      ...topComputerActionCreators,
      ...newComputerActionCreators,
      ...adDigitalActionCreators,
    }
  )(Main)
);

// function mapStateToProps(state, props) {
//   const { scrollableTabView } = state;
//   return {
//     scrollTabIndex: scrollableTabView.index
//   };
// }

// export default connectLocalization(
//   connect(
//     mapStateToProps, 
//     {
//       ...i18nActionCreators,
//       ...scrollableTabViewActionCreators,
//       ...bannerSwiperActionCreators,
//       ...bannerHomeTypeActionCreators,
//       ...promotionInfoActionCreators,
//       ...mergeGetInfoActionCreators,
//       ...adverstInfoActionCreators,
//       ...adPhoneActionCreators,
//       ...topComputerActionCreators,
//       ...newComputerActionCreators,
//       ...adDigitalActionCreators,
//     }
//   )(Main)
// );
