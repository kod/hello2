import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from './SwiperFlatList';
import BrandList from './BrandList';
import PhoneAdBaner from './PhoneAdBaner';
import FloorTitle from './FloorTitle';
import ProductItem4 from './ProductItem4';

import * as topComputerActionCreators from '../common/actions/topComputer';
import * as newComputerActionCreators from '../common/actions/newComputer';

class Scrollable3 extends Component {
  componentDidMount() {
    const { topComputerFetch, newComputerFetch } = this.props;
    topComputerFetch();
    newComputerFetch();
  }

  render() {
    const { topComputer, newComputer, i18n } = this.props;
    const { classfyinfo, computeradImgList } = topComputer;
    const { computernewList, computernewBanerList } = newComputer;
    // const computeradImgList = topComputer.computeradImgList;

    return (
      <View>
        {computeradImgList &&
          computeradImgList.length > 0 && (
            <SwiperFlatList data={computeradImgList} />
          )}

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={computernewBanerList} />

        <FloorTitle
          title={`- ${i18n.goodOnesRecommendation} -`}
          isMore={false}
          style={{ paddingTop: 10, backgroundColor: '#fff' }}
        />

        <ProductItem4
          data={computernewList}
          style={{ backgroundColor: '#fff' }}
        />
      </View>
    );
  }
}

export default connect(
  () => state => {
    const { topComputer, newComputer } = state;

    // const {

    // } = props;

    return {
      topComputer,
      newComputer,
    };
  },
  {
    ...topComputerActionCreators,
    ...newComputerActionCreators,
  },
)(Scrollable3);
