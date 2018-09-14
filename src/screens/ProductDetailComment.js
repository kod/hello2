import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';

import Comment from '../components/Comment';
import { connectLocalization } from '../components/Localization';

import { WINDOW_WIDTH, STATUSBAR_HEIGHT } from '../common/constants';

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

const emptycommentPng = require('../images/emptycomment.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: STATUSBAR_HEIGHT + 40,
  },
  emptyComment: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: WINDOW_WIDTH * 0.3,
  },
  emptyCommentImage: {
    height: 160,
    width: 160,
    marginBottom: WINDOW_WIDTH * 0.06,
  },
  emptyCommentText: {
    fontSize: 11,
    color: '#ccc',
  },
});

class ProductDetailComment extends Component {
  render() {
    const {
      comment,
      screenProps: { i18n },
    } = this.props;

    return (
      <View style={styles.container}>
        {comment.length !== 0 && (
          <ScrollView>
            <Comment data={comment} style={{ paddingTop: 20 }} />
          </ScrollView>
        )}
        {comment.length === 0 && (
          <View style={styles.emptyComment}>
            <Image style={styles.emptyCommentImage} source={emptycommentPng} />
            <Text style={styles.emptyCommentText}>{i18n.noCommentYet}</Text>
          </View>
        )}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => state => {
      const { comment } = state;

      // const {

      // } = props;

      return {
        comment: comment.items.detail ? comment.items.detail : [],
      };
    },
    {
      ...productDetailInfoActionCreators,
    },
  )(ProductDetailComment),
);
