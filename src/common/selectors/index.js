import { createSelector, createSelectorCreator } from 'reselect';
import { denormalize } from 'normalizr';
import Schemas from '../constants/schemas';

const getProps = (state, props) => props;
const selectEntities = state => state.entities;
const selectProductDetail = state => state.productDetail;
const selectProductDetailInfo = state => state.productDetailInfo;

const defaultArray = [];
const defaultObject = {};
const defaultString = '';

export const getAuth = state => state.auth;
export const getAuthUser = state => state.auth.user;
export const getAuthUserFunid = state => state.auth.user.result;
export const getAuthUserMsisdn = state => state.auth.user.msisdn;
export const getLang = state => state.i18n.lang;
export const getCart = state => state.cart;
export const getCartItems = state => state.cart.items;
export const getProductDetailInfoItem = state => state.productDetailInfo.item;
export const getCollectionItems = state => state.collection.items;
export const getSchoolInfoItems = state => state.schoolInfo.items;
export const getAddressItems = state => state.address.items;
export const getBillByYearItems = state => state.billByYear.items;
export const getSearchMonthItem = state => state.searchMonth.item;
export const getBillActiveYear = state => state.bill.activeYear;
export const getBillActiveMonth = state => state.bill.activeMonth;
export const getBillNowYear = state => state.bill.nowYear;
export const getBillNowMonth = state => state.bill.nowMonth;
export const getAddressSelectedId = state => state.address.addressSelectedId;
export const getCertifiedInformationCertUser = state => state.certifiedInformation.certUser;
export const getQueryOrderListItem = state => state.queryOrderList.item;
export const getQueryOrderListScrollTabIndex = state => state.queryOrderList.scrollTabIndex;
export const getQueryOrderListRows = state => state.queryOrderList.rows;


export const makegetProductDetailInfo = () => {
  return createSelector(
    [selectProductDetailInfo, selectEntities, getProps],
    (productDetailInfo, entities, props) => {
      const brandId = props.brandId || props.navigation.state.params.brandId;
      return productDetailInfo[brandId]
        ? denormalize(
            productDetailInfo[brandId].result,
            Schemas.PRODUCTDETAIL,
            entities,
          )
        : defaultObject;
    },
  );
}

export const makegetProductDetailProperties = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector(
    [getProductDetailInfo, selectProductDetailInfo, getProps],
    (productDetailInfo, productDetailInfoResult, props) => {
      let {
        brandId,
        propertiesIds,
      } = props.navigation.state.params;
      const { product_detail } = productDetailInfo;
      let result = {
        colorId: 0,
        versionId: 0,
      }
      brandId = props.brandId || brandId;
      propertiesIds = props.propertiesIds || propertiesIds || '';
      propertiesIds = propertiesIds || ( (product_detail && product_detail[0]) ? product_detail[0].propertiesIds : '');
      if (!propertiesIds || !productDetailInfo.product_detail) return result;
      
      const {
        properties_detail,
      } = productDetailInfo;
      let colorId = 0;
      let versionId = 0;
      propertiesIds = propertiesIds.split('-');
      propertiesIds.forEach((id1, key) => {
        properties_detail.forEach((val1, key1) => {
          const id2 = val1.id;
          if (parseInt(id1) !== id2) return false;
          val1.image ? result.colorId = id2 : result.versionId = id2;
        })
      });
      return result;
    },
  );
}

export const makegetProductDetailItem = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector(
    [getProductDetailInfo, selectProductDetail],
    (productDetailInfo, productDetail) => {
      const { product_detail } = productDetailInfo;
      let result = {};
      const propertiesArray = [];
      
      if (productDetail.colorId) propertiesArray.push(productDetail.colorId);
      if (productDetail.versionId) propertiesArray.push(productDetail.versionId);

      if (!product_detail || !propertiesArray.length ) return defaultObject;

      product_detail.forEach((val, key) => {
        const item = propertiesArray.every((val1, key1) => {
          return val.propertiesIds.indexOf(val1 + '') !== -1;
        })
        if (item) result = val;
      });
      return result;
    },
  );
}

export const makegetProductDetailColorVersionList = () => {
  const getProductDetailInfo = makegetProductDetailInfo();
  return createSelector(
    [getProductDetailInfo],
    (productDetailInfo) => {
      let result = {
        product_color: [],
        product_version: [],
      }
      const { properties_detail } = productDetailInfo;
      if (!properties_detail) return result;
      
      properties_detail.forEach((val, key) => {
        if (val.image) {
          result.product_color.push(val);
        } else {
          result.product_version.push(val);
        }
      });
      return result;
    },
  );
}

export const makegetIsCollection = () => {
  return createSelector(
    [getProductDetailInfoItem, getCollectionItems],
    (productDetailInfoItem, collectionItems) => {
      if (!productDetailInfoItem.brandId || !collectionItems.details) return false;
      return collectionItems.details.some((val, key) => val.brandId === productDetailInfoItem.brandId);
    },
  );
}

export const makegetSchoolName = () => {
  return createSelector(
    [getSchoolInfoItems, getCertifiedInformationCertUser],
    (schoolInfoItems, certifiedInformationCertUser) => {
      if (schoolInfoItems.length === 0) return '';
      if (!certifiedInformationCertUser.collegename) return '';
      for (let index = 0; index < schoolInfoItems.length; index++) {
        const element = schoolInfoItems[index];
        if (element.id === parseInt(certifiedInformationCertUser.collegename)) return element.name;
      }
    },
  );
}

export const getAddressSelectedItem = createSelector(
  [getAddressItems, getAddressSelectedId],
  (addressItems, addressSelectedId) => {
    if (addressItems.length === 0 || addressSelectedId === 0) return defaultObject;
    for (let index = 0; index < addressItems.length; index++) {
      const element = addressItems[index];
      if (element.id === addressSelectedId) return element;
    }
    return defaultObject;
  },
);

export const getBillMonthItem = createSelector(
  [getBillByYearItems, getBillActiveYear, getBillActiveMonth],
  (billByYearItems, billActiveYear, billActiveMonth) => {
    // if (!billByYearItems[billActiveYear]) return defaultObject;
    // const activeItem = billByYearItems[billActiveYear][billActiveMonth - 1];
    // console.log('activeItemactiveItemactiveItemactiveItemactiveItem');
    // console.log(activeItem);

    // const getValidMonth = (array) => {
    //   array = array.reverse();
    //   for (let index = 0; index < array.length; index++) {
    //     const element = array[index];
    //     if (element.status) return element;
    //   }
    //   return defaultObjectZ;
    // };
    
    // billMonthItem.status ? billMonthItem.status : getValidMonth(billByYearItems[billActiveYear]);
    return billByYearItems[billActiveYear] ? billByYearItems[billActiveYear][billActiveMonth - 1] : defaultObject;
  },
);

export const getBillTotalMoney = createSelector(
  [getSearchMonthItem, getBillByYearItems, getBillNowYear, getBillNowMonth],
  (searchMonthItem, billByYearItems, billNowYear, billNowMonth) => {
    if (!searchMonthItem.totalWaitingAmount) return 0;
    if (!billByYearItems[billNowYear]) return 0;
    if (billByYearItems[billNowYear][billNowMonth - 1].status && billByYearItems[billNowYear][billNowMonth - 1].status !== 10000) {
      return searchMonthItem.totalWaitingAmount + billByYearItems[billNowYear][billNowMonth - 1].waitingAmount;
    } else {
      return searchMonthItem.totalWaitingAmount;
    }
  },
);

export const getOrderItem = createSelector(
  [getQueryOrderListItem, getQueryOrderListScrollTabIndex],
  (queryOrderListItem, queryOrderListScrollTabIndex) => {
    return queryOrderListItem[queryOrderListScrollTabIndex];
  },
);
