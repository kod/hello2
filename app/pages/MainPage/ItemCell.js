import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import moment from 'moment';

import { formatStringWithHtml } from '../../utils/FormatUtil';

require('moment/locale/zh-cn');

const ItemCell = ({ article, onPressHandler }) => (
  <TouchableOpacity onPress={() => onPressHandler(article)}>
    <View style={styles.containerItem}>
      <Image style={styles.itemImg} source={{ uri: article.contentImg }} />
      <View style={styles.itemRightContent}>
        <Text style={styles.title}>{formatStringWithHtml(article.title)}</Text>
        <View style={styles.itemRightBottom}>
          <Text style={styles.userName}>{article.userName}</Text>
          <Text style={styles.timeAgo}>{moment(article.date).fromNow()}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  itemImg: {
    width: 88,
    height: 66,
    marginRight: 10
  },
  itemRightContent: {
    flex: 1,
    flexDirection: 'column'
  },
  itemRightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    flex: 1,
    fontSize: 14,
    color: '#87CEFA',
    marginTop: 5,
    marginRight: 5
  }
});

export default ItemCell;
