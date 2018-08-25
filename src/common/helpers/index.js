import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  HTML_REGEX,
  BRANDID_REGEX,
  CLASSIFYID_REGEX,
  SUBCLASSFYID_REGEX,
  THIRDCLASSFYID_REGEX,
  OSS_IMAGE_QUALITY,
  SCREENS,
} from '../constants';

export const addressJoin = item =>
  item.address +
  (item.division4thName ? ', ' : '') +
  item.division4thName +
  (item.division3rdName ? ', ' : '') +
  item.division3rdName +
  (item.division2ndName ? ', ' : '') +
  item.division2ndName;

export const createOrderno = funid => {
  const mydate = new Date();
  return (
    funid +
    mydate.getDay() +
    mydate.getHours() +
    mydate.getMinutes() +
    mydate.getSeconds() +
    mydate.getMilliseconds() +
    Math.round(Math.random() * 10000)
  );
};

export const tradeStatusCodes = (code = 10000, i18n) => {
  const codes = {
    10000: i18n.pendingPayment, // '交易创建，等待买家付款'
    10001: i18n.successfulCopy, // '交易支付成功'
    10002: i18n.paymentFailed, // '交易支付失败'
    10003: i18n.transactionPaymentWaiting, // '交易支付等待'
    10004: i18n.orderPendingAudit, // '交易成功,等待审核(新流程)'
    20000: i18n.paymentOvertimeClosed, // '未付款交易超时关闭，或支付完成后全额退款'
    20001: i18n.endTransactionNonRefundable, // '交易结束，不可退款'
    20002: i18n.transactionRejectedFullRefund, // '交易拒绝, 全额退款'
    20003: i18n.paymentOvertimeClosed, // '交易支付超时, 订单退回'
    30000: i18n.waitingForDelivery, // 等待发货
    30001: i18n.pendingEvaluation, // '已收货,未评价'
    30002: i18n.transactionComplete, // '已收货,已评价'
    30003: i18n.waitingForTheOrder, // '等待拼单'
    40000: i18n.cancelTransaction, // '交易取消(其他)'
    40001: 'Incorrect operation', // 取消交易理由(操作有误)
    40002: 'Error order', // 取消交易理由(错误下单)
    40003: 'Other channels are cheaper', // 取消交易理由(其他渠道价格更低)
    40004: 'Staging error', // 取消交易理由(分期错误)
    40005: 'Do not want to buy', // 取消交易理由(不想买了)
  };
  return codes[code];
};

export const buttonTextForTradeStatusCodes = (code = 10000, i18n) => {
  const codes = {
    10000: i18n.payment, // '交易创建，等待买家付款'
    10001: i18n.view, // '交易支付成功',
    10002: i18n.view, // '交易支付失败'
    10003: i18n.view, // '交易支付等待',
    10004: i18n.view, // '交易成功,等待审核(新流程)',
    20000: i18n.view, // '未付款交易超时关闭，或支付完成后全额退款',
    20001: i18n.view, // '交易结束，不可退款',
    20002: i18n.view, // '交易拒绝, 全额退款',
    20003: i18n.view, // '交易支付超时, 订单退回',
    30000: i18n.view, // '等待发货',
    30001: i18n.evaluation, // '已收货,未评价',
    30002: i18n.view, // '已收货,已评价',
    30003: i18n.view, // '等待拼单',
    40000: i18n.view, // '交易取消(其他)', // 取消交易理由
    40001: i18n.view, // '操作有误', // 取消交易理由
    40002: i18n.view, // '错误下单', // 取消交易理由
    40003: i18n.view, // '其他渠道价格更低', // 取消交易理由
    40004: i18n.view, // '分期错误', // 取消交易理由
    40005: i18n.view, // '不想买了', // 取消交易理由
  };
  return codes[code];
};

export const billStatusCodes = (code = 10000, i18n) => {
  const codes = {
    10000: i18n.unsettledBills, // 未出账
    10001: i18n.billed, // 已出账
    10002: i18n.hasPaidOff, // 已还清
    10007: i18n.overdue, // '已逾期'
  };
  return codes[code];
};

export const billInitDate = () => {
  const nD = new Date();
  let year = nD.getFullYear();
  let month = nD.getMonth() + 1;
  const date = nD.getDate();
  if (date <= 5) {
    if (month === 1) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }
  }

  return {
    year,
    month,
  };
};

export const payWayToText = (payWay, i18n) => {
  let result = '';
  payWay += '';
  switch (payWay) {
    case '1':
      result = i18n.funCard; // 信用卡
      break;

    case '2':
      result = i18n.internetBanking; // 网银支付
      break;

    case '5':
      result = i18n.mixedPayment; // 混合支付
      break;
    default:
      break;
  }

  return result;
};

export const judge = (boolean, trueFunc, falseFunc = () => {}) => {
  if (boolean) {
    trueFunc();
  } else {
    falseFunc();
  }
};

/* 防止重复提交
- 需在当前组件state里添加submitfreeze字段(boolean)
- 需在当前组件componentWillUnmount方法里添加clearTimeout(this.setTimeoutId);
*/
export const submitDuplicateFreeze = (submitfreeze, self, callback) => {
  if (submitfreeze === false) {
    callback();
    self.setState({ submitfreeze: true });
    self.setTimeoutId = setTimeout(() => {
      self.setState({ submitfreeze: false });
    }, 2000);
  }
};

// navigateCheckLogin
export const navigateCheckLogin = (
  isAuthUser,
  navigate,
  screensName,
  params = {},
) => {
  if (isAuthUser) {
    navigate(SCREENS[screensName], params);
  } else {
    navigate(SCREENS.Login);
  }
};

export const analyzeUrlNavigate = ({
  linkUrl,
  navigation,
  i18n = {},
  isAuthUser = false,
  isQrCode = false,
}) => {
  const { navigate, goBack } = navigation;
  const htmlRegexResult = linkUrl.match(HTML_REGEX);

  let brandIdRegexResult = null;
  let classifyIdRegexResult = null;
  let subClassfyIdRegexResult = null;
  let thirdClassfyIdRegexResult = null;

  const customNavigate = (routeName, params = {}) => {
    if (isQrCode) {
      navigation.dispatch(
        NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: SCREENS.Index }),
            NavigationActions.navigate({ routeName }),
          ],
        }),
      );
    } else {
      navigate(routeName, params);
    }
  };

  const navImg1More = () => {
    brandIdRegexResult = linkUrl.match(BRANDID_REGEX);
    classifyIdRegexResult = linkUrl.match(CLASSIFYID_REGEX);
    subClassfyIdRegexResult = linkUrl.match(SUBCLASSFYID_REGEX);
    thirdClassfyIdRegexResult = linkUrl.match(THIRDCLASSFYID_REGEX);
    navigate(SCREENS.CateList, {
      parent_id: brandIdRegexResult ? brandIdRegexResult[1] : '0',
      classfy_id: classifyIdRegexResult ? classifyIdRegexResult[1] : '0',
      sub_classfy_id: subClassfyIdRegexResult
        ? subClassfyIdRegexResult[1]
        : '0',
      third_classfy_id: thirdClassfyIdRegexResult
        ? thirdClassfyIdRegexResult[1]
        : '0',
    });
  };

  if (!htmlRegexResult) {
    Alert.alert(
      '',
      i18n.error,
      [
        {
          text: i18n.confirm,
          onPress: () => goBack(),
        },
      ],
      { cancelable: false },
    );
  } else {
    switch (htmlRegexResult[1]) {
      case 'more':
        navImg1More(linkUrl);
        break;

      case 'order':
        // 我的订单
        if (isAuthUser) {
          customNavigate(SCREENS.Order, { index: 0 });
        } else {
          customNavigate(SCREENS.Login);
        }

        // navigateCheckLogin(isAuthUser, navigate, 'Order', { index: 0 });
        break;

      case 'couponcenter':
        // 领券中心
        // navigate(SCREENS.Coupon);
        customNavigate(SCREENS.Coupon);
        break;

      case 'prepaid':
        // 充值
        // navigate(SCREENS.Prepaid);
        customNavigate(SCREENS.Prepaid);
        break;

      case 'computerPage':
        // 电脑
        // navigate(SCREENS.Computer);
        customNavigate(SCREENS.Computer);
        break;

      case 'cellphoneBanner':
        // 手机
        // navigate(SCREENS.Mobile);
        customNavigate(SCREENS.Mobile);
        break;

      case 'details':
        // 商品详情
        brandIdRegexResult = linkUrl.match(BRANDID_REGEX);
        if (brandIdRegexResult) {
          customNavigate(SCREENS.ProductDetail, {
            brandId: brandIdRegexResult[1],
          });
        }
        break;

      case 'watch':
        // 手表
        customNavigate(SCREENS.CateList, {
          parent_id: '7',
          classfy_id: '0',
          sub_classfy_id: '0',
          third_classfy_id: '0',
        });
        break;

      default:
        alert('error');
        break;
    }
  }
};

export const jointWebViewImages = images => {
  let WebViewImages;
  switch (images.length) {
    case 0:
      WebViewImages = '';
      break;

    case 1:
      WebViewImages = `<img src="${images}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
      break;

    default:
      WebViewImages = images.reduce((a, b, index) => {
        let resultStr = '';
        if (index === 1) {
          if (a)
            resultStr = `<img src="${a}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
          if (b)
            resultStr += `<img src="${b}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
        } else {
          if (b)
            resultStr = `<img src="${b}?x-oss-process=image/quality,Q_${OSS_IMAGE_QUALITY}" alt="image">`;
          resultStr = a + resultStr;
        }
        return resultStr;
      });
      break;
  }
  return WebViewImages;
};
