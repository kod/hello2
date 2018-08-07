import React, { Component } from 'react';

import BYTextInput from './BYTextInput';

class FieldInput extends Component {
  render() {
    const {
      // input,
      input,
      ...restProps
    } = this.props;
    return (
      <BYTextInput
        onChangeText={input.onChange}
        value={input.value}
        {...restProps}
      />
    );
  }
}

export default FieldInput;
