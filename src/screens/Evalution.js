import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, } from 'react-native';
import { connect } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import { SCREENS, WINDOW_WIDTH } from "../common/constants";

import { connectLocalization } from "../components/Localization";
import BYHeader from '../components/BYHeader';
import BYTextInput from "../components/BYTextInput";
import BYButton from "../components/BYButton";
import BYTouchable from "../components/BYTouchable";
import ActionSheet from "../components/ActionSheet";
import Loader from "../components/Loader";
import { RED_COLOR, PRIMARY_COLOR } from "../styles/variables";
import { SIDEINTERVAL } from "../common/constants";

import * as collectFilesActionCreators from '../common/actions/collectFiles';
import * as authActionCreators from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

class Evalution extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenActionSheet: false,
      payWayButtons: ['相册', '拍照'],
      starNumber: 3,
      textValue: '',
    };

    this.actionSheetCallback = this.actionSheetCallback.bind(this);
  }

  componentDidMount() {
    // const { collectFilesFetch } = this.props;
    // collectFilesFetch();
  }

  createResizedImageImageResizer({ uri, width, height}) {
    const {
      collectFilesFetch 
    } = this.props;

    ImageResizer.createResizedImage(uri, width, height, 'JPEG', 50).then((response) => {
        collectFilesFetch({
          files: {
            // uri: uri,
            uri: response.uri,
            name: response.name,
          }
        });

    }).catch((err) => {
      console.dir(err);
    });

  }

  actionSheetCallback(ret) {
    const {
      navigation: { navigate }
    } = this.props;
    if (ret.buttonIndex === -1) return false;


    if (ret.buttonIndex === 0) {
      // 相册
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        this.createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        })
      });
    } else {
      // 拍照
      ImagePicker.openCamera({
        // width: 300,
        // height: 400,
        // cropping: true
      }).then(image => {
        this.createResizedImageImageResizer({
          uri: image.path,
          width: image.width,
          height: image.height,
        })
      });
    }
  }

  handleOnPressToggleModal = (key, val) => {
    this.setState({
      [key]: typeof val !== 'boolean' ? !this.state[key] : val,
    });
  };

  handleOnPressStar(index) {
    this.setState({
      starNumber: index,
    })
  }

  handleOnLongPressImgDel(index) {
    const {
      collectFilesRemove,
    } = this.props;
    collectFilesRemove(index);
    // this.setState({
    //   images: this.state.images.splice(index, 1),
    // })
  }
  
  handleOnPressSelectPics() {
    this.handleOnPressToggleModal('isOpenActionSheet')
  }

  renderContent() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      startWrap: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
      },
      starIcon: {
        color: '#ccc',
        fontSize: 18,
        marginRight: 5,
      },
      starIconActive: {
        color: PRIMARY_COLOR,
        fontSize: 18,
        marginRight: 5,
      },
      mainWrap: {
        paddingRight: SIDEINTERVAL,
        paddingLeft: SIDEINTERVAL,
        marginBottom: 70,
      },
      main: {
        backgroundColor: '#f5f5f5',
        marginBottom: 10,
      },
      textInput: {
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
        marginBottom: 50,
      },
      pics: {
        flexDirection: 'row',
        paddingLeft: SIDEINTERVAL,
        paddingRight: SIDEINTERVAL,
        paddingBottom: SIDEINTERVAL,
      },
      imageItem: {
        position: 'relative',
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        backgroundColor: '#e5e5e5',
        marginRight: SIDEINTERVAL,
      },
      imageItemOnLongPress: {
        position: 'absolute',
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        // backgroundColor: '#ff0',
        zIndex: 888,
      },
      imageItemImage: {
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      selectPics: {
        alignItems: 'center',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        height: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
        width: (WINDOW_WIDTH - SIDEINTERVAL * 9) / 6,
      },
      cameraIcon: {
        color: '#999',
        fontSize: 16,
        // marginBottom: 5,
        paddingTop: 7,
      },
      cameraText: {
        color: '#ccc',
        fontSize: 8,
      },
      tips: {
        fontSize: 11,
        color: '#ccc',
        lineHeight: 11 * 1.618,
      },
    });

    const {
      starNumber,
      textValue,
    } = this.state;

    const {
      loading,
      images,
    } = this.props;
    
    return (
      <View style={styles.container} >
        <View style={styles.startWrap} >
          {
            [0,1,2,3,4].map((val) => 
              <FontAwesome 
                style={starNumber > val ? styles.starIconActive : styles.starIcon } 
                name="star" 
                key={val}
                onPress={() => this.handleOnPressStar(val + 1)}
              />
            )
          }
        </View>
        <View style={styles.mainWrap} >
          <View style={styles.main} >
            <BYTextInput 
              style={styles.textInput}
              placeholder={'please enter your name'}
              placeholderTextColor={'#ccc'}
              onChangeText={(val) => this.setState({ textValue: val })}
              value={textValue}
              maxLength={150}
              numberOfLines={3}
              multiline={true}
            />
            <View style={styles.pics} >
              {
                images.map((val, key) => {
                  return (
                    <View style={styles.imageItem} key={key} >
                      <Text style={styles.imageItemOnLongPress} onLongPress={() => this.handleOnLongPressImgDel(key)} ></Text>
                      <Image style={styles.imageItemImage} source={{ uri: val }} />
                      {/* <Image style={styles.imageItemImage} source={require('../images/viemnam.png')} /> */}
                    </View>
                  )
                })
              }
              <BYTouchable style={styles.selectPics} onPress={() => this.handleOnPressSelectPics()} >
                <FontAwesome  style={ styles.cameraIcon } name="camera" />
                <Text style={styles.cameraText} >0/5</Text>
              </BYTouchable>
            </View>
          </View>
          <Text style={styles.tips} >your comment will be anonymous</Text>
          <Text style={styles.tips} >长按删除图片</Text>
        </View>
        <BYButton text={'publish'} styleWrap={styles.button} onPress={() => {}} />
      </View>
    )
  }
  
  render() {
    const {
      isOpenActionSheet,
      payWayButtons,
    } = this.state;

    const {
      collectFiles,
      navigation: { navigate },
      loading,
      i18n,
    } = this.props;

    return (
      <View style={styles.container} >
        <BYHeader />
        <ScrollView>
          {this.renderContent()}
        </ScrollView>
        <ActionSheet 
          visible={isOpenActionSheet}
          onRequestClose={() => this.handleOnPressToggleModal('isOpenActionSheet')}
          buttons={payWayButtons}
          callback={this.actionSheetCallback}
        />
        {loading && <Loader absolutePosition />}
      </View>
    );
  }
}

export default connectLocalization(
  connect(
    () => {
      return (state, props) => {
        const {
          collectFiles,
        } = state;

        const {

        } = props;

        return {
          collectFiles: collectFiles,
          loading: collectFiles.loading,
          images: collectFiles.images,
        }
      }
    },
    {
      ...collectFilesActionCreators,
      ...authActionCreators,
    }
  )(Evalution)
);


// function mapStateToProps(state, props) {
//   const { collectFiles } = state;
//   return {
//     collectFiles: collectFiles,
//     loading: collectFiles.loading,
//     images: collectFiles.images,
//   };
// }

// export default connectLocalization(
//   connect(mapStateToProps, { ...collectFilesActionCreators, ...authActionCreators })(Evalution)
// );
