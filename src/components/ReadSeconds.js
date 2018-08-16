import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  // View,
} from 'react-native';

import {
  WINDOW_WIDTH,
  // WINDOW_HEIGHT,
  // SIDEINTERVAL,
} from '../common/constants';

const styles = StyleSheet.create({
  second: {
    height: 20,
    minWidth: WINDOW_WIDTH * 0.1,
    paddingLeft: WINDOW_WIDTH * 0.02,
    paddingRight: WINDOW_WIDTH * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#0076F7',
    marginRight: 1,
  },
  secondText: {
    color: '#0076F7',
    fontSize: 11,
  },
});

class ReadSeconds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      ing: false,
    };
  }

  componentDidMount() {
    this.readSeconds();
  }

  componentWillUnmount() {
    clearTimeout(this.setTimeoutID);
  }

  async readSeconds() {
    const { ing } = this.state;
    if (ing === false) {
      await this.setState({
        seconds: 30,
        ing: true,
      });
    }
    const { seconds } = this.state;
    if (seconds > 0) {
      this.setTimeoutID = setTimeout(async () => {
        await this.setState({
          seconds: seconds - 1,
        });
        this.readSeconds();
      }, 1000);
    } else {
      await this.setState({
        ing: false,
      });
    }
  }

  handleOnPressSeconds() {
    const { ing } = this.state;
    if (ing) return false;
    return this.readSeconds();
  }

  render() {
    const {
      ing,
      seconds,
      // seconds,
    } = this.state;

    const { i18n, ...restProps } = this.props;

    return (
      <View style={styles.second}>
        <Text
          style={styles.secondText}
          onPress={() => this.handleOnPressSeconds()}
          {...restProps}
        >
          {ing ? seconds : i18n.sendCode}
        </Text>
      </View>
    );
  }
}

export default ReadSeconds;
