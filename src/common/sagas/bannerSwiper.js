import { takeEvery, apply, put } from 'redux-saga/effects';
import { bannerSwiperFetchSuccess, bannerSwiperFetchFailure } from '../actions/bannerSwiper';
import { addError } from '../actions/error';
import buyoo from '../helpers/apiClient';
import { BANNER_SWIPER } from '../constants/actionTypes';

export function* bannerSwiperFetchWatchHandle(action) {
  const { swiperId } = action.payload;
  try {
    let response = [];
    let item;

    switch (swiperId) {
      case 'one':
        item = yield apply(buyoo, buyoo.getNewestInfo, [
          {
            appId: '',
            charset: 'UTF-8',
            classfy_id: '0',
            currentPage: '1',
            encrypt: '1e2219033472ece44d402fb6ddabb06d',
            signType: '232d3721d7461bdfc771ce28408ce7c9',
            method: 'fun.newest.query',
            pagesize: '5',
            position: '2',
            timestamp: '2017-09-06 11:30:50',
            type_id: '0',
            version: '1.0'
          }
        ]);
        response.push(item.details[0].imageUrl);

        item = yield apply(buyoo, buyoo.getAdverstInfo, [
          {
            appId: '110',
            charset: 'utf-8',
            classfy_id: '0',
            currentPage: '1',
            encrypt: 'a03f98acb81ab1783a014c9c0f062098',
            signType: '2032a9f6733d8d7c9a53a63078314714',
            method: 'fun.adverst.query',
            pagesize: '5',
            position: '2',
            timestamp: '2017-09-06 11:30:50',
            type_id: '1',
            version: '1.0'
          }
        ]);
        response.push(item.details[0].imageUrl);

        item = yield apply(buyoo, buyoo.getAdverstInfo, [
          {
            appId: '110',
            charset: 'utf-8',
            classfy_id: '0',
            currentPage: '1',
            encrypt: 'ca0a87cbd4ca8742cd312e251531d024',
            signType: '2032a9f6733d8d7c9a53a63078314714',
            method: 'fun.adverst.query',
            pagesize: '5',
            position: '2',
            timestamp: '2017-09-06 11:30:50',
            type_id: '2',
            version: '1.0'
          }
        ]);
        response.push(item.details[0].imageUrl);

        item = yield apply(buyoo, buyoo.getAdverstInfo, [
          {
            appId: '110',
            charset: 'utf-8',
            classfy_id: '0',
            currentPage: '1',
            encrypt: '81d00032c7f85a46a8d64d21f1bc39df',
            signType: '2032a9f6733d8d7c9a53a63078314714',
            method: 'fun.adverst.query',
            pagesize: '5',
            position: '2',
            timestamp: '2017-09-06 11:30:50',
            type_id: '5',
            version: '1.0'
          }
        ]);
        response.push(item.details[0].imageUrl);
        break;

      case 'two':
        item = yield apply(buyoo, buyoo.initTopCellphone, [
          {
            appid: '0',
            method: 'fun.cellphone.topad',
            charset: 'utf-8',
            signtype: '8720705762660220dde60ead0e2c2a7b',
            encrypt: '4da4224a06337b9564da736a1adfa7c9',
            timestamp: '2018-03-20 14:39:13',
            version: '1.0',
            typeid: '1',
            pagesize: '5',
            currentpage: '1'
          }
        ]);

        for (let index = 0; index < item.topadinfo.length; index++) {
          const element = item.topadinfo[index];
          response.push(element.imageUrl);
        }
        break;

      case 'three':
        item = yield apply(buyoo, buyoo.initTopComputer, [
          {
            appid: '0',
            method: 'fun.computer.topad',
            charset: 'utf-8',
            signtype: '9ec5f0c86d5dea7156d3e2077525774c',
            encrypt: 'e9f6d00136af83b2e25e7561064cd82d',
            timestamp: '2018-03-20 19:37:10',
            version: '1.0',
            typeid: '2',
            pagesize: '5',
            currentpage: '1'
          }
        ]);

        for (let index = 0; index < item.computerltopadinfo.length; index++) {
          const element = item.computerltopadinfo[index];
          response.push(element.imageUrl);
        }
        break;

      case 'four':
        item = yield apply(buyoo, buyoo.initTopDigital, [
          {
            appid: '0',
            method: 'fun.digital.topad',
            charset: 'utf-8',
            signtype: '2b824d6b0e78cd97cc7e9ef61250cced',
            encrypt: '58a2dcb3b9d7453d532b32faf36fa7a4',
            timestamp: '2018-03-21 10:54:53',
            version: '1.0',
            typeid: '5',
            pagesize: '5',
            currentpage: '1'
          }
        ]);

        for (let index = 0; index < item.digitaltopadinfo.length; index++) {
          const element = item.digitaltopadinfo[index];
          response.push(element.imageUrl);
        }
        break;
        
      default:
        break;
    }

    yield put(bannerSwiperFetchSuccess(swiperId, response));
  } catch (err) {
    yield put(bannerSwiperFetchFailure(swiperId));
    yield put(addError(err));
  }
}

// export function* handleAddIllustComment(action) {
//   const { illustId, comment } = action.payload;
//   try {
//     yield apply(pixiv, pixiv.addIllustComment, [illustId, comment]);
//     yield put(addIllustCommentSuccess(illustId));
//   } catch (err) {
//     yield put(addIllustCommentFailure(illustId));
//     yield put(addError(err));
//   }
// }

export function* bannerSwiperFetchWatch() {
  yield takeEvery(BANNER_SWIPER.REQUEST, bannerSwiperFetchWatchHandle);
}

// export function* watchAddIllustComment() {
//   yield takeEvery(ILLUST_COMMENTS.ADD, handleAddIllustComment);
// }
