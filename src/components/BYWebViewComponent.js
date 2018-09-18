import React, { Component } from 'react';
import { View, requireNativeComponent } from 'react-native';
import PropTypes from 'prop-types';

// requireNativeComponent函数中的第一个参数就是刚刚CircleManager.getName返回的值。
const WebViewInner = requireNativeComponent('WebViewAndroid', {
  name: 'WebViewAndroid',
  propTypes: {
    source: PropTypes.string,
    url: PropTypes.string,
    shouldOverrideUrl: PropTypes.string,
    shouldOverrideIntentUrl: PropTypes.bool,
    ...View.propTypes, // 包含默认的View的属性
  },
});

class WebViewAndroid extends Component {
  constructor() {
    super();
    this.onShouldOverrideUrlLoading = this.onShouldOverrideUrlLoading.bind(
      this,
    );
    this.onProgressChanged = this.onProgressChanged.bind(this);
  }

  onShouldOverrideUrlLoading(event) {
    const { onShouldStartLoadWithRequest } = this.props;
    if (!onShouldStartLoadWithRequest) {
      return;
    }

    onShouldStartLoadWithRequest(event.nativeEvent);
  }

  onProgressChanged(event) {
    const { renderLoading, onLoadStart, onLoadEnd } = this.props;
    const { progress } = event.nativeEvent;
    if (progress === 0) {
      if (onLoadStart) {
        onLoadStart();
      } else if (renderLoading) {
        renderLoading(progress);
      }
    } else if (progress === 100) {
      if (onLoadEnd) {
        onLoadEnd();
      } else if (renderLoading) {
        renderLoading(progress);
      }
    } else if (renderLoading) {
      renderLoading(progress);
    }
  }

  render() {
    return (
      <WebViewInner
        {...this.props}
        onShouldOverrideUrlLoading={this.onShouldOverrideUrlLoading}
        onProgressChanged={this.onProgressChanged}
      />
    );
  }
}

WebViewAndroid.propTypes = {
  onShouldStartLoadWithRequest: PropTypes.func,
  renderLoading: PropTypes.func,
  onLoadStart: PropTypes.func,
  onLoadEnd: PropTypes.func,
};

WebViewAndroid.defaultProps = {
  onShouldStartLoadWithRequest: null,
  renderLoading: null,
  onLoadStart: null,
  onLoadEnd: null,
};

module.exports = WebViewAndroid;
