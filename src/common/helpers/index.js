import { SCREENS } from '../constants';

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
    10001: '交易支付成功',
    10002: i18n.paymentFailed, // '交易支付失败'
    10003: '交易支付等待',
    10004: '交易成功,等待审核(新流程)',
    20000: '未付款交易超时关闭，或支付完成后全额退款',
    20001: '交易结束，不可退款',
    20002: '交易拒绝, 全额退款',
    20003: '交易支付超时, 订单退回',
    30000: i18n.waitingForDelivery, // 等待发货
    30001: '已收货,未评价',
    30002: '已收货,已评价',
    30003: '等待拼单',
    40000: '交易取消(其他)', // 取消交易理由
    40001: '操作有误', // 取消交易理由
    40002: '错误下单', // 取消交易理由
    40003: '其他渠道价格更低', // 取消交易理由
    40004: '分期错误', // 取消交易理由
    40005: '不想买了', // 取消交易理由
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
    30000: i18n.view, // i18n.waitingForDelivery, // 等待发货
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
