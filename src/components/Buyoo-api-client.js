/* eslint strict:0 */

'use strict';

const axios = require('axios');
const qs = require('qs');

const DEBUG = true;

const TIMEOUT = 30 * 1000;

const BASE_URL = DEBUG ? 'http://14.162.145.248' : '';

const PORT_80 = DEBUG ? ':8180' : 'https://uc.buyoo.vn';
// const PORT_81 = DEBUG ? ':8181' : 'https://payment.buyoo.vn';
const PORT_83 = DEBUG ? ':8183' : 'https://trade.buyoo.vn';
const PORT_84 = DEBUG ? ':8184' : 'https://settlement.buyoo.vn';
const PORT_85 = DEBUG ? ':8185' : 'https://commodity.buyoo.vn';
const PORT_87 = DEBUG ? ':8187' : 'https://market.buyoo.vn';

function callApi(url, options) {
  const finalUrl = /^https?:\/\//i.test(url) ? url : BASE_URL + url;
  if (DEBUG) {
    console.log(finalUrl);
    console.log(options);
  }
  return axios(finalUrl, options)
    .then(res => res.data)
    .catch(err => {
      if (err.response) {
        throw err.response.data;
      } else {
        throw err.message;
      }
    });
}

class ReactStore {
  constructor() {
    this.headers = {
      // "App-OS": "ios",
      // "Accept-Language": "en-us",
      // "App-OS-Version": "9.3.3",
      // "App-Version": "6.8.3",
      // "User-Agent": "PixivIOSApp/6.8.3 (iOS 9.0; iPhone8,2)"
    };
  }

  returnMoney(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/installment/returnMoney`, options);
  }

  orderCreate(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/order/create`, options);
  }

  getPhoneRecharge(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getPhoneRecharge`, options);
  }

  getProvidersCard(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getProvidersCard`, options);
  }

  get3GProvidersCard(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/virtual/get3GProvidersCard`,
      options,
    );
  }

  getProvidersValue(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/virtual/getProvidersValue`, options);
  }

  queryOrderList(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/queryOrderList`, options);
  }

  // orderPay(options) {
  //   if (!options) {
  //     return Promise.reject(new Error('fields required'));
  //   }
  //   const data = qs.stringify(options);
  //   options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   return axios(`http://192.168.7.99${PORT_83}/fun/trade/order/pay`, options)
  //     .then(res => {
  //       if (res.data.status !== 10000) {
  //         throw new Error(res.data.result);
  //       }
  //       return res.data;
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }

  orderPay(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/order/pay`, options);
  }

  orderCancel(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/orderCancel`, options);
  }

  orderPayInternetBank(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return `${BASE_URL}${PORT_83}/fun/trade/order/pay?${queryString}`;
  }

  // queryOrder(options) {
  //   if (!options) {
  //     return Promise.reject(new Error('fields required'));
  //   }
  //   const data = qs.stringify(options);
  //   options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   return axios(`http://192.168.7.99${PORT_83}/fun/trade/queryOrder`, options)
  //     .then(res => {
  //       if (res.data.status !== 10000) {
  //         throw new Error(res.data.result);
  //       }
  //       return res.data;
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }

  queryOrder(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_83}/fun/trade/queryOrder`, options);
  }

  billDetails(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/billDetails`, options);
  }

  repaymentRecord(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/repaymentRecord`, options);
  }

  searchMonth(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/searchMonth`, options);
  }

  billByYear(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_84}/fun/bill/billByYear`, options);
  }

  queryGoods(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/user/consume/queryGoods`, options);
  }

  // queryGoods(options) {
  //   if (!options) {
  //     return Promise.reject(new Error('fields required'));
  //   }
  //   const data = qs.stringify(options);
  //   options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   return axios(`http://192.168.7.99${PORT_80}/fun/user/consume/queryGoods`, options)
  //     .then(res => {
  //       if (res.data.status !== 10000) {
  //         throw new Error(res.data.result);
  //       }
  //       return res.data;
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }

  cardSubmit(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/card/submit`, options);
  }

  cardQuery(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/card/query`, options);
  }

  userCertificateInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userViewDetailInfo`,
      options,
    );
  }

  receiveVoucher(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/receiveVoucher`, options);
  }

  getVoucherList(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getVoucherList`, options);
  }

  judgeVoucher(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/judgeVoucher`, options);
  }

  userAddDetailInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userAddDetailInfo`,
      options,
    );
  }

  userGetCollection(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userGetCollection`,
      options,
    );
  }

  userViewAddr(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userViewAddr`, options);
  }

  useraddaddr(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userAddAddr`, options);
  }

  userDelAddrs(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userDelAddrs`, options);
  }

  userModifyAddr(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/userModifyAddr`, options);
  }

  getCityInfos(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getCityInfos`, options);
  }

  getSchoolInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/usercenter/getSchoolInfo`, options);
  }

  userBatchCollection(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userBatchCollection`,
      options,
    );
  }

  userCancelCollection(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/usercenter/userCancelCollection`,
      options,
    );
  }

  otp(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_80}/fun/userCenter/userAction/otp`, options);
  }

  updatePeriod(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/updatePeriod`,
      options,
    );
  }

  register(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/register`,
      options,
    );
  }

  modifyPayPassword(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/modifyPayPassword`,
      options,
    );
  }

  getUserInfoById(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/getUserInfoById`,
      options,
    );
  }

  login(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/login`,
      options,
    );
  }

  changePassword(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_80}/fun/userCenter/userAction/changePassword`,
      options,
    );
  }

  // login(options) {
  //   const data = qs.stringify(options);
  //   options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     data,
  //   };

  //   console.log(`${BASE_URL}${PORT_80}/fun/userCenter/userAction/login`);
  //   console.log(options);
  //   return axios(`https://twitter.com/?sadf=${Math.random()}`, options)
  //     .then(res => {
  //       console.log(res);
  //       if (res.data.status !== 10000) {
  //         throw new Error(res.data.result);
  //       }
  //       return res.data;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       throw err;
  //     });
  // }

  initTopDigital(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/digital/initTopDigital?${queryString}`,
    );
  }

  initAdDigital(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/digital/initAdDigital?${queryString}`,
    );
  }

  initNewComputer(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/computer/initNewComputer?${queryString}`,
    );
  }

  initTopComputer(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/computer/initTopComputer?${queryString}`,
    );
  }

  initTopCellphone(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/cellphone/initTopCellphone?${queryString}`,
    );
  }

  initAdCellphone(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/cellphone/initAdCellphone?${queryString}`,
    );
  }

  getEvaluationInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getEvaluationInfo`,
      options,
    );
  }

  getMenu(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/getMenu`, options);
  }

  getProductDetailInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getProductDetailInfo`,
      options,
    );
  }

  mergeGetInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getInfo`, options);
  }

  mergeGetDetail(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getDetail`, options);
  }

  mergeGetSlave(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getSlave`, options);
  }

  mergeCheck(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/check`, options);
  }

  mergeGetMaster(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/getMaster`, options);
  }

  mergeGate(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    return this.requestUrl(`${PORT_85}/fun/commodity/merge/gate`, options);
  }

  getAdverstInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getAdverstInfo?${queryString}`,
    );
  }

  getAllProductInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/getAllProductInfo?${queryString}`,
    );
  }

  findProducts(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );

    return this.requestUrl(
      `${PORT_85}/fun/commodity/findProducts?${queryString}`,
    );
  }

  getPromotionInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/commodity/getPromotionInfo?${queryString}`,
    );
  }

  getSquaresInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options,
      ),
    );
    return this.requestUrl(
      `${PORT_85}/fun/commodity/getSquaresInfo?${queryString}`,
    );
  }

  getNewestInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    // const queryString = qs.stringify(
    //   Object.assign(
    //     {
    //       // filter,
    //     },
    //     options
    //   )
    // );

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/getNewestInfo`, options);
  }

  cartGetInfo(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/getInfo`, options);
  }

  cartRemove(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/remove`, options);
  }

  cartChangeNum(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/changeNum`, options);
  }

  cartGate(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_85}/fun/commodity/cart/gate`, options);
  }

  collectFiles(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    // const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'multipart/form-data',
      },
      data: options,
    };
    return this.requestUrl(`${PORT_80}/fun/userfile/collectFiles`, options);
  }

  getVoucher(options) {
    if (!options) {
      return Promise.reject(new Error('fields required'));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    return this.requestUrl(`${PORT_87}/fun/market/getVoucher`, options);
  }

  requestUrl(url, options) {
    // if (!url) {
    //   return Promise.reject('Url cannot be empty');
    // }
    options = options || {};
    options.timeout = TIMEOUT;
    options.headers = Object.assign({}, this.headers, options.headers || {});

    return callApi(url, options)
      .then(json => json)
      .catch(err => {
        // if (this.rememberPassword) {
        //   if (this.username && this.password) {
        //     return this.login(this.username, this.password).then(() => {
        //       options.headers.Authorization = `Bearer ${this.auth.access_token}`;
        //       return callApi(url, options);
        //     });
        //   }
        // }
        throw err;
      });
  }
}

module.exports = ReactStore;
