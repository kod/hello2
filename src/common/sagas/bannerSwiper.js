import { Platform } from 'react-native';
import { takeEvery, apply, put } from 'redux-saga/effects';
import { bannerSwiperFetchSuccess, bannerSwiperFetchFailure } from '../actions/bannerSwiper';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BANNER_SWIPER } from '../constants/actionTypes';
import { encrypt_MD5, signType_MD5 } from '../../components/AuthEncrypt';
import timeStrForm from "../../common/helpers/timeStrForm";

export function* bannerSwiperFetchWatchHandle(action) {
  const { swiperId } = action.payload;
  try {
    let response = [];
    let item;

    let Key = 'commodityKey';
    let appId = Platform.OS === 'ios' ? '1' : '2';
    let charset = 'utf-8';
    let timestamp = timeStrForm(parseInt(+new Date() / 1000), 3);
    let version = '1.0';

    switch (swiperId) {
      case 'one':
        let method = 'fun.adverst.query';
        let type_id = '';
        let classfy_id = '0';
        let position = '2';
        let pagesize = '20';
        let currentPage = '1';
    
        let signType = signType_MD5(appId, method, charset, Key, false);
    
        let encrypt = encrypt_MD5(
          [
            {
              key: 'type_id',
              value: type_id
            },
            {
              key: 'classfy_id',
              value: classfy_id
            },
            {
              key: 'position',
              value: position
            },
            {
              key: 'pagesize',
              value: pagesize
            },
            {
              key: 'currentPage',
              value: currentPage
            }
          ],
          Key
        );
  
        item = yield apply(buyoo, buyoo.getAdverstInfo, [
          {
            appId: appId,
            method: method,
            charset: charset,
            signType: signType,
            encrypt: encrypt,
            timestamp: timestamp,
            version: version,
            type_id: type_id,
            classfy_id: classfy_id,
            position: position,
            pagesize: pagesize,
            currentPage: currentPage,
          }
        ]);
        let array = item.details;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          response.push(element.imageUrl);
        }
        break;

      case 'two':
          {
            let method = 'fun.cellphone.topad';
            let typeid = '1';
            let pagesize = '5';
            let currentpage = '1';
        
            let signType = signType_MD5(appId, method, charset, Key, true);
        
            let encrypt = encrypt_MD5(
              [
                {
                  key: 'typeid',
                  value: typeid
                },
                {
                  key: 'pagesize',
                  value: pagesize
                },
                {
                  key: 'currentpage',
                  value: currentpage
                }
              ],
              Key
            );

            item = yield apply(buyoo, buyoo.initTopCellphone, [
              {
                appid: appId,
                method: method,
                charset: charset,
                signtype: signType,
                encrypt: encrypt,
                timestamp: timestamp,
                version: version,
                typeid: typeid,
                pagesize: pagesize,
                currentpage: currentpage,
              }
            ]);

            for (let index = 0; index < item.topadinfo.length; index++) {
              const element = item.topadinfo[index];
              response.push(element.imageUrl);
            }
          }

        break;

      case 'three':
        {
          let method = 'fun.computer.topad';
          let typeid = '2';
          let pagesize = '5';
          let currentpage = '1';
      
          let signType = signType_MD5(appId, method, charset, Key, true);
      
          let encrypt = encrypt_MD5(
            [
              {
                key: 'typeid',
                value: typeid
              },
              {
                key: 'pagesize',
                value: pagesize
              },
              {
                key: 'currentpage',
                value: currentpage
              }
            ],
            Key
          );
          
          item = yield apply(buyoo, buyoo.initTopComputer, [
            {
              appid: appId,
              method: method,
              charset: charset,
              signtype: signType,
              encrypt: encrypt,
              timestamp: timestamp,
              version: version,
              typeid: typeid,
              pagesize: pagesize,
              currentpage: currentpage,
            }
          ]);

          for (let index = 0; index < item.computerltopadinfo.length; index++) {
            const element = item.computerltopadinfo[index];
            response.push(element.imageUrl);
          }
        }
        break;

      case 'four':
        {
          let method = 'fun.digital.topad';
          let typeid = '5';
          let pagesize = '5';
          let currentpage = '1';
      
          let signType = signType_MD5(appId, method, charset, Key, true);
      
          let encrypt = encrypt_MD5(
            [
              {
                key: 'typeid',
                value: typeid
              },
              {
                key: 'pagesize',
                value: pagesize
              },
              {
                key: 'currentpage',
                value: currentpage
              }
            ],
            Key
          );
          
          item = yield apply(buyoo, buyoo.initTopDigital, [
            {
              appid: appId,
              method: method,
              charset: charset,
              signtype: signType,
              encrypt: encrypt,
              timestamp: timestamp,
              version: version,
              typeid: typeid,
              pagesize: pagesize,
              currentpage: currentpage,
            }
          ]);

          for (let index = 0; index < item.digitaltopadinfo.length; index++) {
            const element = item.digitaltopadinfo[index];
            response.push(element.imageUrl);
          }
        }
        break;
        
      default:
        break;
    }

    yield put(bannerSwiperFetchSuccess(swiperId, response));
  } catch (err) {
    yield put(bannerSwiperFetchFailure(swiperId));
    yield put(addError(typeof err === 'string' ? err : err.toString()));
  }
}

export function* bannerSwiperFetchWatch() {
  yield takeEvery(BANNER_SWIPER.REQUEST, bannerSwiperFetchWatchHandle);
}
