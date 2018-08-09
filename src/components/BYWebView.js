import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Loader from './Loader';
import BYHeader from './BYHeader';
// import { PRIMARY_COLOR } from '../styles/colors';
import { PRIMARY_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, SCREENS } from '../common/constants';

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

  handleOnPressBackButton() {
    const {
      navigation: {
        pop,
        goBack,
        // pop,
      },
      from,
    } = this.props;
    switch (from) {
      case SCREENS.Repayment:
        pop(2);
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

export default BYWebView;
