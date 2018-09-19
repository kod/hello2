import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Loader from './Loader';
import BYTouchable from './BYTouchable';
import { RED_COLOR, BORDER_COLOR } from '../styles/variables';
import {
  WINDOW_WIDTH,
  SIDEINTERVAL,
  SCREENS,
  OSS_IMAGE_QUALITY,
  MONETARY,
} from '../common/constants';
import priceFormat from '../common/helpers/priceFormat';

const itemIntervalWidth = SIDEINTERVAL;
const itemWidth = (WINDOW_WIDTH - itemIntervalWidth * 4) / 3;
const paddingInerval = SIDEINTERVAL / 2;

const styles = StyleSheet.create({
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: SIDEINTERVAL,
    marginBottom: 5,
  },
  item: {
    width: itemWidth,
    marginRight: SIDEINTERVAL,
    paddingTop: 4,
    backgroundColor: '#fff',
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    marginBottom: itemIntervalWidth,
  },
  itemImg: {
    width: itemWidth - 2,
    height: itemWidth - 2,
    marginBottom: 5,
  },
  itemText: {
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    color: '#666',
    fontSize: 11,
    marginBottom: 6,
    height: 28.8,
  },
  itemOrgPrice: {
    color: '#999',
    fontSize: 11,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  itemPrice: {
    color: RED_COLOR,
    fontSize: 14,
    paddingLeft: paddingInerval,
    paddingRight: paddingInerval,
    fontWeight: '700',
    marginBottom: 10,
  },
});

class ProductItem1 extends Component {
  renderItem = ({ item, key }) => {
    const {
      groupon = false,
      navigation: { navigate },
    } = this.props;

    return (
      <BYTouchable
        style={styles.item}
        key={key}
        onPress={() =>
          navigate(SCREENS.ProductDetail, { brandId: item.brandId, groupon })
        }
      >
        <Image
          style={styles.itemImg}
          source={{
            uri: `${
              item.imageUrl
            }?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}`,
          }}
        />
        <Text numberOfLines={2} style={styles.itemText}>
          {item.name}
        </Text>
        {!!item.orgPrice && (
          <Text style={styles.itemOrgPrice}>
            {`${priceFormat(item.orgPrice)} ${MONETARY}`}
          </Text>
        )}
        <Text style={styles.itemPrice}>{`${priceFormat(
          item.price,
        )} ${MONETARY}`}</Text>
      </BYTouchable>
    );
  };

  render() {
    // const { data, style,  } = this.props;

    const {
      data: { items, loading, loaded, refreshing },
      onRefresh,
      loadMoreItems,
      onEndReachedThreshold,
      style,
    } = this.props;

    return (
      <View style={[styles.itemWrap, style]}>
        {(!items || (!loaded && loading)) && <Loader />}
        {items && items.length ? (
          <FlatList
            data={items}
            renderItem={this.renderItem}
            keyExtractor={item => item.brandId}
            getItemLayout={(data, index) => ({
              length: WINDOW_WIDTH / 2,
              offset: (WINDOW_WIDTH / 2) * index,
              index,
            })}
            numColumns={3}
            initialNumToRender={6}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={onEndReachedThreshold || 0.2}
            onEndReached={loadMoreItems}
          />
        ) : null}
      </View>
    );
  }
}

export default withNavigation(ProductItem1);
