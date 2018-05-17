import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ImageGetSize from "../components/ImageGetSize";
import Comment from "../components/Comment";

import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  APPBAR_HEIGHT,
  STATUSBAR_HEIGHT,
  SIDEINTERVAL,
  RED_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
} from "../styles/variables";

import * as productDetailInfoActionCreators from '../common/actions/productDetailInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingTop: STATUSBAR_HEIGHT + 40,
  },
  emptyComment: {
    alignItems: 'center',
    paddingTop: WINDOW_WIDTH * 0.3
  },
  emptyCommentImage: {
    height: 160,
    width: 160,
    marginBottom: WINDOW_WIDTH * 0.06
  },
  emptyCommentText: {
    fontSize: 11,
    color: '#ccc',
  },
});

class ProductDetailComment extends React.Component {
  componentDidMount() {
    const { bannerSwiperFetch } = this.props;
    
  }
  
  render() {
    const {
      comment,
      screenProps: {i18n},
    } = this.props;
    console.log(this.props);

    return (
      <View style={styles.container} >
        <ScrollView >
          <Comment data={comment} style={{ paddingTop: 20}} />
          {comment.length === 0 &&
            <View style={styles.emptyComment} >
              <Image style={styles.emptyCommentImage} source={require('../images/emptycomment.png')} />
              <Text style={styles.emptyCommentText} >{i18n.noCommentYet}</Text>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { comment } = state;
  return {
    comment: comment.items.detail ? comment.items.detail : [],
    // bannerSwiper: bannerSwiper['one'] || {}
  };
}

export default connect(mapStateToProps, { ...productDetailInfoActionCreators, })(ProductDetailComment);
