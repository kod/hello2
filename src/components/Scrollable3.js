import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SwiperFlatList from './SwiperFlatList';
import FeaturedGoodsItem from './FeaturedGoodsItem';
import BrandList from './BrandList';
import PhoneAdBaner from './PhoneAdBaner';
import FloorTitle from './FloorTitle';
import ProductItem1 from './ProductItem1';

import * as topComputerActionCreators from '../common/actions/topComputer';
import * as newComputerActionCreators from '../common/actions/newComputer';

const { width, height } = Dimensions.get('window');

class Scrollable3 extends React.Component {
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

export default connect(
  () => {
    return (state, props) => {
      const {
        topComputer,
        newComputer
      } = state;

      // const {

      // } = props;

      return {
        topComputer: topComputer,
        newComputer: newComputer,
      }
    }
  },
  {
    ...topComputerActionCreators,
    ...newComputerActionCreators
  }
)(Scrollable3);


// function mapStateToProps(state, props) {
//   const { topComputer, newComputer } = state;
//   return {
//     topComputer: topComputer,
//     newComputer: newComputer,
//   };
// }

// export default connect(mapStateToProps, { ...topComputerActionCreators, ...newComputerActionCreators })(Scrollable3);
