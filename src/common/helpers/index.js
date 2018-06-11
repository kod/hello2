export const addressJoin = item => {
  console.log(item);
  console.log('addressJoinaddressJoinaddressJoinaddressJoin');
  return item.address + (item.division4thName ? ', ' : '') + item.division4thName + (item.division3rdName ? ', ' : '') + item.division3rdName + (item.division2ndName ? ', ' : '') + item.division2ndName;
};

export const createOrderno = funid => {
  var mydate = new Date();
  return funid + mydate.getDay() + mydate.getHours() + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 10000);
};

export const tradeStatusCodes = (code = 10000, i18n) => {
  const codes =  {
    10000: '交易创建，等待买家付款',
    10001: '交易支付成功',
    10002: '交易支付失败',
    10003: '交易支付等待',
    10004: '交易成功,等待审核(新流程)',
    20000: '未付款交易超时关闭，或支付完成后全额退款',
    20001: '交易结束，不可退款',
    20002: '交易拒绝, 全额退款',
    20003: '交易支付超时, 订单退回',
    30000: '等待发货',
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
  console.log(code);
  console.log(codes[code]);
  return codes[code];
};
