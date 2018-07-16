import React from 'react';
import { View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';

// 上拉加载状态
const PULLUPLOAD = {
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    ING: 'ING',
    NOMORE: 'NOMORE'
}

function WrapView(props) {
  return (
    <View style={{ 
      height: 50,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      // backgroundColor: 'blue'
    }}>
    {props.children}
    </View>
  )
}

const ScrollViewPullUp = {
  /**
   * onScroll
   * @param {string} loadingKey props里上拉加载的键值
   * @param {function} callback 
   */
  onScroll(loadingKey, callback) {
    return function(event) {
      var loading = this.props[loadingKey];

      // 已经在加载
      if(loading === PULLUPLOAD.ING)return;

      const y = event.nativeEvent.contentOffset.y;
      const height = event.nativeEvent.layoutMeasurement.height;
      const contentHeight = event.nativeEvent.contentSize.height;
      // console.log('offsetY-->' + y);
      // console.log('height-->' + height);
      // console.log('contentHeight-->' + contentHeight);

      // 距离底部
      if(y + height >= contentHeight - 300){
          callback()
      }
    }
  },
  /**
   * 上拉的底部组件
   * @param {PULLUPLOAD.TYPE} state 
   */
  scrollViewFooter(state) {
    if(state === PULLUPLOAD.NOMORE){
      return <WrapView><Text>没有更多了</Text></WrapView>
    }else if(state === PULLUPLOAD.FAILURE){
      return <WrapView><Text>加载失败</Text></WrapView>
    }else if(state === PULLUPLOAD.ING){
      return <WrapView><Spinner type="ThreeBounce" size={28} /><Text>加载中</Text></WrapView>
    }
    return false;
  }
}

export {
    PULLUPLOAD,
    ScrollViewPullUp,
}