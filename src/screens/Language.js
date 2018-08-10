import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BYHeader from '../components/BYHeader';
import BYTouchable from '../components/BYTouchable';
import { PRIMARY_COLOR } from '../styles/variables';
import { BACKGROUND_COLOR } from '../styles/variables';
import { WINDOW_WIDTH, WINDOW_HEIGHT, SIDEINTERVAL, } from '../common/constants';
import { connectLocalization } from '../components/Localization';

import * as i18nActionCreators from "../common/actions/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  }
});

const languageList = [
  {
    id: 'en',
    title: 'English',
  },
  {
    id: 'vi',
    title: 'Tiếng Việt',
  },
  {
    id: 'zh',
    ids: ['zh', 'zh-CN', 'zh-SG'],
    title: '中文',
    multipleId: true,
  },
]

class Language extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { bannerHomeRecommendFetch } = this.props;
    // bannerHomeRecommendFetch();
  }

  handleOnPressListItem = id => {
    const { setLanguage, navigation } = this.props;
    setLanguage(id);
    navigation.goBack();
  }

  renderList = list => {
    const { lang } = this.props;
    return (
      <View>
        {list.map((val, key) => 
          <BYTouchable delayPressIn={0} key={key} onPress={ () => this.handleOnPressListItem(val.id) }>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, paddingLeft: WINDOW_WIDTH * 0.04, paddingRight: WINDOW_WIDTH * 0.02, borderBottomColor: '#eee', borderBottomWidth: StyleSheet.hairlineWidth,  }}>
              <Text style={{ flex: 1 }}>{ val.title }</Text>
              { val.id === lang && <MaterialIcons name="check-circle" style={{ fontSize: 26, color: PRIMARY_COLOR }} /> }
            </View>
          </BYTouchable>
        )}
      </View>
    )
  }

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingRight: 60 }}>
        <Text style={{ fontSize: 18, color: '#fff' }}>Language</Text>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View />
    )
  }

  render() {
    const { bannerHomeRecommend, navigation: { navigate } } = this.props;
    return (
      <View style={styles.container}>
        <BYHeader />
        <ScrollView style={styles.container}>
          <View style={{ backgroundColor: '#fff' }}>
            {this.renderList(languageList)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          bannerHomeRecommend,
        } = state;

        // const {

        // } = props;

        return {
          bannerHomeRecommend: bannerHomeRecommend || {}
        }
      }
    },
    {
      ...i18nActionCreators,
    }
  )(Language)
);

// function mapStateToProps(state, props) {
//   const { bannerHomeRecommend } = state;
//   return {
//     bannerHomeRecommend: bannerHomeRecommend || {}
//   };
// }

// export default connectLocalization(
//   connect(mapStateToProps, { ...i18nActionCreators })(Language)
// );
