/* eslint- import/no-unresolved */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Loader from './Loader';
import BYHeader from './BYHeader';
// import { PRIMARY_COLOR } from '../styles/colors';
import { PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, SCREENS } from '../common/constants';
import { analyzeUrlNavigate } from '../common/helpers';

const WebViewAndroid = require('./BYWebViewComponent');

const WEBVIEW_REF = 'WebViewAndroid';

// 被拦截的url包含的字符串，此处可以写完整的url
const INTERCEPT_URL = 'http://,https://';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const progressCustomStyles = {
  backgroundColor: PRIMARY_COLOR,
  borderRadius: 0,
  height: 5,
  borderColor: '#fff',
};

class BYWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadedOnce: false,
      progress: 30,
    };

    this.onShouldStartLoadWithRequest = this.onShouldStartLoadWithRequest.bind(
      this,
    );
  }

  componentDidMount() {
    this.setIntervalId = setInterval(() => {
      const { progress } = this.state;
      if (progress < 70) {
        this.setState({
          progress: progress + 20,
        });
      } else {
        this.setState({
          progress: progress + 1,
        });
      }
    }, 700);
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId);
  }

  handleOnLoadStart = () => {
    this.setState({
      loading: true,
    });
  };

  handleOnLoadEnd = () => {
    const { loadedOnce } = this.state;
    const newState = {
      loading: false,
      progress: 100,
    };
    if (!loadedOnce) {
      newState.loadedOnce = true;
    }
    this.setState(newState);
  };

  onShouldStartLoadWithRequest = msg => {
    const { navigation, i18n } = this.props;
    const { url, event } = msg;
    console.log(`------------url----------> ${url}`);
    if (event === 0 || event === 2) {
      // 关闭当前页面
      // 0 客服
      // 2 关闭按钮
      console.log('-------已处理Intent----------');
    } else if (url && url.length !== 0) {
      if (url.startsWith('http') || url.startsWith('https')) {
        // TODO 跳转并关闭当前页面
        console.log('-------已拦截住url----------');
        analyzeUrlNavigate({ linkUrl: url, navigation, i18n });
      } else {
        console.log('-------未拦截住url----------');
      }
    }
    return true;
  };

  handleOnPressBackButton() {
    const {
      navigation: {
        pop,
        goBack,
        // pop,
      },
      from,
      pop: popLevel,
    } = this.props;
    switch (from) {
      case SCREENS.Repayment:
        pop(popLevel);
        break;

      default:
        goBack(null);
        break;
    }
  }

  // renderLoader = () => <Loader />;
  renderLoader = () => <View />;

  render() {
    const {
      source,
      // source,
      ...otherProps
    } = this.props;
    const { loadedOnce, loading, progress } = this.state;
    return (
      <View style={styles.container}>
        <BYHeader onPressBackButton={() => this.handleOnPressBackButton()} />
        <ProgressBarAnimated
          {...progressCustomStyles}
          width={WINDOW_WIDTH}
          value={progress}
          backgroundColorOnComplete="#fff"
        />
        {loadedOnce && loading && <Loader absolutePosition />}
        {/* <WebView
          source={source}
          renderLoading={this.renderLoader}
          onLoadStart={this.handleOnLoadStart}
          onLoadEnd={this.handleOnLoadEnd}
          startInLoadingState
          {...otherProps}
        /> */}
        <WebViewAndroid
          style={{ flex: 1 }}
          ref={WEBVIEW_REF}
          source={source}
          renderLoading={this.renderLoader}
          onLoadStart={this.handleOnLoadStart}
          onLoadEnd={this.handleOnLoadEnd}
          shouldOverrideIntentUrl
          shouldOverrideUrl={INTERCEPT_URL}
          startInLoadingState
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          {...otherProps}
        />
      </View>
    );
  }
}

export default BYWebView;
