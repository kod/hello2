import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BYHeader from '../components/BYHeader';
import { globalStyleVariables } from '../styles';

const { width, height } = Dimensions.get('window');

class Feedback extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Cart',
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="shopping-cart" size={25} color={tintColor} />
    )
  };

  handleOnPressHeaderBackButton = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  renderHeaderTitle = () => {
    return (
      <View style={{ flex: 1 }} >
        <Text style={{ fontSize: 18, color: '#fff', textAlign: 'center' }} >Shopping cart</Text>
      </View>
    )
  }

  renderHeaderRight = () => {
    return (
      <View>
        <Text style={{ color: '#fff', fontSize: 15, paddingLeft: 10, paddingRight: 10 }} >Edit</Text>
      </View>
    )
  }

  renderheaderLeft = () => {
    return (
      <View style={{ height: 50 }} >
        <Text style={{ color: globalStyleVariables.HEADER_BACKGROUND_COLOR, fontSize: 15, paddingLeft: 10, paddingRight: 10 }} >Edit</Text>
      </View>
    )
  }

  render() {
    console.log(width);
    return (
      <View>
        <BYHeader
          headerTitle={this.renderHeaderTitle()}
          headerRight={this.renderHeaderRight()}
          headerLeft={this.renderheaderLeft()}
          darkTheme
          onPressBackButton={this.handleOnPressHeaderBackButton}
        />
        <ScrollView style={{ height: height - 55 - 25 - 55 - 50 }} >
          <View style={{ backgroundColor: '#fff',  }} >
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, paddingTop: 12, paddingBottom: 12 }} >
              <View style={{ flex: 1 , alignItems: 'center', justifyContent: 'center' }} >
                <MaterialIcons name="check-circle" style={{ fontSize: 24,  }} />
              </View>
              <Image source={require('../images/1516440780730_F5_b01.jpg')} style={{ height: 114, width: 114, borderColor: '#f5f5f5', borderWidth: 1, }} />
              <View style={{ flex: 4, paddingLeft: width * 0.03, paddingRight: width * 0.03, paddingTop: 3 }} >
                <Text style={{ fontSize: 12, height: 32, color: '#333', marginBottom: 60, }} numberOfLines={ 2 } >【新品】Apple MacBook Pro 13.3英寸笔记本电脑2017年新款</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }} >
                  <Text style={{ color: '#4A9DF4', fontSize: 12, }} >6,190,000 VND</Text>
                  <Text style={{ color: '#333', fontSize: 12 }}>x1</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', height: 55, backgroundColor: '#fff', borderTopColor: '#eee', borderTopWidth: 1, }} >
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: width * 0.03 }} >
            <MaterialIcons name="check-circle" style={{ fontSize: 24, marginRight: width * 0.01 }} />
            <Text style={{ fontSize: 12 }} >Select all</Text>
          </View>
          <View style={{ flex: 3, }} >
            <View style={{ paddingLeft: width * 0.05, paddingTop: 5 }} >
              <Text>Total:</Text>
              <View style={{ flexDirection: 'row' }} >
                <Text style={{ fontSize: 20, color: '#4A9DF4', marginRight: width * 0.03 }} >6,190,000</Text>
                <Text style={{ fontSize: 12, paddingTop: 10 }} >VND</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR }} >
            <Text style={{ color: '#fff', fontSize: 16 }} >Pay(3)</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Feedback;