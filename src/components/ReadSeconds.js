import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { WINDOW_WIDTH } from "../styles/variables";

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

  async readSeconds() {
    if (this.state.ing === false) {
      await this.setState({
        seconds: 60,
        ing: true,
      });
    }
    if (this.state.seconds > 0) {
      setTimeout(async () => {
        await this.setState({
          seconds: this.state.seconds - 1,
        });
        this.readSeconds();
      }, 700);
    } else {
      await this.setState({
        ing: false,
      });
    }
  }

  handleOnPressSeconds() {
    if (this.state.ing) return false;
    this.readSeconds();  
  }

  render() {
    const {
      ing,
      seconds,
    } = this.state;

    const {
      ...restProps,
    } =  this.props;

    return (
      <View style={styles.second}>
        <Text style={styles.secondText} onPress={() => this.handleOnPressSeconds()} {...restProps} >{ing ? seconds : 'gửi mã'}</Text>
      </View>
    );
  }
}

export default ReadSeconds;