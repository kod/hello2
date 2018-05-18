import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from '../components/SwiperFlatList';
import FeaturedGoodsItem from '../components/FeaturedGoodsItem';
import BrandList from '../components/BrandList';
import PhoneAdBaner from '../components/PhoneAdBaner';
import FloorTitle from '../components/FloorTitle';
import ProductItem1 from '../components/ProductItem1';

import * as topComputerActionCreators from '../common/actions/topComputer';
import * as newComputerActionCreators from '../common/actions/newComputer';

const { width, height } = Dimensions.get('window');

class Scrollable2 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { topComputerFetch, newComputerFetch } = this.props;
    topComputerFetch();
    newComputerFetch();
  }

  render() {
    const { topComputer, newComputer, i18n } = this.props;
    const { classfyinfo } = topComputer;
    const { computernewList, computernewBanerList } = newComputer;
    const computeradImgList = topComputer.computeradImgList;
    

    return (
      <View>
        <SwiperFlatList data={computeradImgList} />

        <BrandList data={classfyinfo} style={{ marginBottom: 5 }} />

        <PhoneAdBaner data={computernewBanerList} />

        <FloorTitle title={`/${i18n.goodOnesRecommendation}/`} isMore={true} style={{ paddingTop: 10, backgroundColor: '#fff' }} />

        <ProductItem1 data={computernewList} style={{ backgroundColor: '#fff' }} />
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { topComputer, newComputer } = state;
  return {
    topComputer: topComputer,
    newComputer: newComputer,
  };
}

export default connect(mapStateToProps, { ...topComputerActionCreators, ...newComputerActionCreators })(Scrollable2);
