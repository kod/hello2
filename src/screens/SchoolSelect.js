import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import { SCREENS } from "../common/constants";

import CustomIcon from "../components/CustomIcon";
import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import SearchHeader from '../components/SearchHeader';
import BYTouchable from "../components/BYTouchable";
import BYTextInput from "../components/BYTextInput";
import Loader from "../components/Loader";

import { SIDEINTERVAL, RED_COLOR, WINDOW_WIDTH } from "../styles/variables";

import * as certifiedInformationActionCreators from '../common/actions/certifiedInformation';
import * as schoolInfoActionCreators from '../common/actions/schoolInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    height: 50,
    lineHeight: 50,
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    color: '#ccc',
  },
  itemActive: {
    color: '#333',
  },
  scrollview: {
    height: 100,
    width: WINDOW_WIDTH,
  },
  tips: {
    paddingLeft: SIDEINTERVAL,
    paddingRight: SIDEINTERVAL,
    paddingTop: WINDOW_WIDTH * 0.03,
    paddingBottom: WINDOW_WIDTH * 0.03,
    color: '#f00',
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
})

class SchoolSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isCanLoad: false,
    };
  }

  componentDidMount() {
    const { schoolInfoFetch, items } = this.props;
    // schoolInfoFetch();
    items.length === 0 && schoolInfoFetch();
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isCanLoad: true
      });
    });
  }

  renderHeaderTitle = () => {
    const {
      inputValue
    } = this.state;
    
    const styles = StyleSheet.create({
      headerMiddleMain: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: WINDOW_WIDTH * 0.03,
        height: 30,
        backgroundColor: '#f5f5f5',
        borderRadius: 1
      },
      headerMiddleIcon: {
        fontSize: 12,
        color: '#ccc',
        marginRight: WINDOW_WIDTH * 0.02
      },
      headerMiddleText: {
        flex: 1,
        // fontSize: 13,
        // color: '#ccc'
      },    
    });
    
    return (
      <View style={styles.headerMiddleMain}>
        <CustomIcon name="search" style={styles.headerMiddleIcon} />
        <BYTextInput 
          style={styles.headerMiddleText}
          placeholder={'Search'}
          placeholderTextColor={'#ccc'}
          onChangeText={(val) => this.setState({ inputValue: val.toLowerCase() })}
          value={inputValue}  
        />
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View style={{width: 45}} ></View>
    )
  }

  renderHeaderLeft = () => {
    const styles = StyleSheet.create({
      icon: {
        width: 45,
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
      },
    });
    
    return (
      <CustomIcon style={styles.icon} name="back" onPress={() => {}} />
    )
  }

  handleOnPressItem(item) {
    const {
      certifiedInformationEdit,
      navigation: { state, goBack },
    } = this.props;
    if (item.staging !== 1) return false;
    certifiedInformationEdit('collegename', item.id);
    goBack();
  }
  
  _renderItem = (item, key) => (
    <BYTouchable key={key} onPress={() => this.handleOnPressItem(item)} >
      <Text style={[styles.item, item.staging === 1 && styles.itemActive]} >{item.name}</Text>
    </BYTouchable>
  );

  render() {
    const {
      isCanLoad,
      inputValue,
    } = this.state;
    
    const {
      i18n,
      items,
      loading,
      schoolInfo,
      navigation: { navigate },
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <View style={styles.container} >
        <BYHeader 
          headerRight={this.renderHeaderRight()}
          headerTitle={this.renderHeaderTitle()}
        />
        <Text style={styles.tips} >
          Bạn học thân mến, tạm thời chúng tôi chỉ thực hiện thanh toán trả góp tại những trường đại học có trong danh sách, những trường đại học không thể chọn được vì nhân lực công ty chúng tôi có hạn nên tạm thời chưa thể thanh toán, nhưng bạn có thể lựa chọn thanh toán toàn bộ. Nếu có thắc mắc gì, xin hãy để lại lời nhắn trên facebook. Cám ơn sự ủng hộ của bạn.
        </Text>
        <ScrollView>
          {
            isCanLoad
            &&
            items
              .filter((val) => val.name.toLowerCase().indexOf(inputValue) !== -1)
              .map((val, key) => this._renderItem(val, key))
          }
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
          schoolInfo
        } = state;
        return {
          items: schoolInfo.items,
          loading: schoolInfo.loading,
        }
      }
    }
    , 
    {
      ...certifiedInformationActionCreators, 
      ...schoolInfoActionCreators, 
    }
  )(SchoolSelect)
);
