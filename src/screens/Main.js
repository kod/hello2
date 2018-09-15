import React, { Component } from 'react';
import {
  ScrollView,
  AppState,
  StyleSheet,
  View,
  Linking,
  RefreshControl,
} from 'react-native';
import { connect } from 'react-redux';

import { BACKGROUND_COLOR, HEADER_BACKGROUND_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  // SIDEINTERVAL,
  STATUSBAR_HEIGHT,
  SCREENS,
} from '../common/constants';

// import ScrollableTabView from '../components/ScrollableTabView';
import Scrollable1 from '../components/Scrollable1';
// import Scrollable2 from '../components/Scrollable2';
// import Scrollable3 from '../components/Scrollable3';
// import Scrollable4 from '../components/Scrollable4';
import { connectLocalization } from '../components/Localization';
// import i18n from '../common/helpers/i18n';
// import CustomIcon from '../components/CustomIcon';
// import BYTouchable from '../components/BYTouchable';
import SearchHeader from '../components/SearchHeader';
import {
  invitationCodeForClipboard,
  analyzeUrlNavigate,
} from '../common/helpers';

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
import * as getSquaresInfoActionCreators from '../common/actions/getSquaresInfo';
import * as getNewestInfoActionCreators from '../common/actions/getNewestInfo';

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: BACKGROUND_COLOR,
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
    flex: 8,
  },
  headerMiddleMain: {
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
    fontSize: 13,
    color: '#ccc',
  },
  headerIcon: {
    height: 40,
    lineHeight: 40,
    paddingLeft: WINDOW_HEIGHT * 0.03,
    paddingRight: WINDOW_HEIGHT * 0.03,
    color: '#999',
    fontSize: 18,
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.onChangeTab = this.onChangeTab.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.handleOpenURL = this.handleOpenURL.bind(this);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    // const {
    //   navigation: { navigate },
    // } = this.props;
    // navigate(SCREENS.Pay, {
    //   tradeNo: '000000210320180906161830379572',
    //   orderNo: '220180906161830379966607775',
    // });
    // navigate(SCREENS.StudentCardUpload);
    // navigate(SCREENS.Order, { index: 0 });
    // navigate(SCREENS.PaymentCode, {
    //   orderNo: '220180906174130845482540208',
    //   tradeNo: '000000210320180906174130845918',
    //   payway: 5,
    //   payrate: 10,
    //   repaymentmonth: 3,
    //   advance: 65000,
    // });
    AppState.addEventListener('change', this.handleAppStateChange);
    Linking.addEventListener('url', this.handleOpenURL);
    this.runInvitationCodeForClipboard();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(event) {
    // TODO Handle url
    const { url = '' } = event;
    const { navigation, i18n } = this.props;
    analyzeUrlNavigate({ linkUrl: url, navigation, i18n });
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.runInvitationCodeForClipboard();
    }
  };

  runInvitationCodeForClipboard = () => {
    const {
      i18n,
      navigation,
      navigation: {
        state: { params },
      },
      isAuthUser,
    } = this.props;

    if (params === undefined && isAuthUser === false)
      invitationCodeForClipboard(navigation, i18n);
  };

  onDataArrived() {}

  onRefresh() {
    const {
      scrollTabIndex,
      bannerSwiperFetch,
      bannerHomeTypeFetch,
      promotionInfoFetch,
      adverstInfoFetch,
      // mergeGetInfoFetch,
      adPhoneFetch,
      topComputerFetch,
      newComputerFetch,
      adDigitalFetch,
      getSquaresInfoFetch,
      getNewestInfoFetch,
    } = this.props;
    switch (scrollTabIndex) {
      case 0:
        bannerSwiperFetch('one');
        bannerHomeTypeFetch();
        promotionInfoFetch();
        adverstInfoFetch({
          type_id: '1',
        });
        adverstInfoFetch({
          type_id: '2',
        });
        adverstInfoFetch({
          type_id: '5',
        });
        // mergeGetInfoFetch();
        getSquaresInfoFetch();
        getNewestInfoFetch();
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
      this.onDataArrived();
      this.setState({ refreshing: false });
    }, 1000);
    // fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }

  onChangeTab(res) {
    const {
      scrollableTabViewIndex,
      // scrollTabIndex,
    } = this.props;
    if (res.i !== res.from) scrollableTabViewIndex(res.i);
  }

  render() {
    const { refreshing } = this.state;
    const {
      navigation: { navigate },
      i18n,
    } = this.props;

    // const scrollableTabKeys = [
    //   {
    //     tabLabel: i18n.recommend,
    //     view: <Scrollable1 {...this.props} />,
    //   },
    //   {
    //     tabLabel: i18n.mobileCommunications,
    //     view: <Scrollable2 {...this.props} />,
    //   },
    //   {
    //     tabLabel: i18n.computerOffice,
    //     view: <Scrollable3 {...this.props} />,
    //   },
    //   {
    //     tabLabel: i18n.digitalDevices,
    //     view: <Scrollable4 {...this.props} />,
    //   },
    // ];

    // const content = scrollableTabKeys.map((val, key) => {
    //   const { refreshing } = this.state;
    //   return (
    //     <View tabLabel={val.tabLabel} style={styles.base} key={val.tabLabel}>
    //       <ScrollView
    //         refreshControl={
    //           <RefreshControl
    //             refreshing={refreshing}
    //             onRefresh={() => this.onRefresh()}
    //           />
    //         }
    //       >
    //         {scrollableTabKeys[key].view}
    //       </ScrollView>
    //     </View>
    //   );
    // });

    return (
      <View style={styles.container}>
        <SearchHeader
          text={i18n.search}
          leftOnPress={() => navigate(SCREENS.QrCodeScanner)}
          middleOnPress={() => navigate(SCREENS.SearchResult)}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
          <Scrollable1 {...this.props} />
        </ScrollView>
        {/* <ScrollableTabView content={content} onChangeTab={this.onChangeTab} /> */}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    state => {
      const {
        login,
        scrollableTabView,
        // scrollableTabView,
      } = state;

      // const {

      // } = props;

      return {
        isAuthUser: !!login.user,
        scrollTabIndex: scrollableTabView.index,
      };
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
      ...getSquaresInfoActionCreators,
      ...getNewestInfoActionCreators,
    },
  )(Main),
);
