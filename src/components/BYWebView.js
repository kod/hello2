import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Loader from './Loader';
import BYHeader from './BYHeader';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class PXWebView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadedOnce: false,
    };
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
    };
    if (!loadedOnce) {
      newState.loadedOnce = true;
    }
    this.setState(newState);
  };

  renderLoader = () => <Loader />;

  render() {
    const { source, ...otherProps } = this.props;
    const { loadedOnce, loading } = this.state;
    return (
      <View style={styles.container}>
        <BYHeader />
        {loadedOnce &&
          loading &&
          <ProgressBar
            indeterminate
            borderRadius={0}
            width={WINDOW_WIDTH}
            height={3}
          />
        }
        <WebView
          source={source}
          renderLoading={this.renderLoader}
          onLoadStart={this.handleOnLoadStart}
          onLoadEnd={this.handleOnLoadEnd}
          startInLoadingState
          {...otherProps}
        />
      </View>
    );
  }
}

export default PXWebView;
