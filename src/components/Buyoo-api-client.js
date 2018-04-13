/* eslint strict:0 */

"use strict";

const axios = require("axios");
const qs = require("qs");

const BASE_URL = "http://119.28.177.175";
const DEBUG = false;
// const CLIENT_ID = "KzEZED7aC0vird8jWyHM38mXjNTY";
// const CLIENT_SECRET = "W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP";
// const filter = "for_ios";

function callApi(url, options) {
  const finalUrl = /^https?:\/\//i.test(url) ? url : BASE_URL + url;
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
      "App-OS": "ios",
      "Accept-Language": "en-us",
      "App-OS-Version": "9.3.3",
      "App-Version": "6.8.3",
      "User-Agent": "PixivIOSApp/6.8.3 (iOS 9.0; iPhone8,2)"
    };
  }

  initTopDigital(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options
      )
    );
    return this.requestUrl(`:8185/fun/digital/initTopDigital?${queryString}`);
  }

  initTopComputer(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options
      )
    );
    return this.requestUrl(`:8185/fun/computer/initTopComputer?${queryString}`);
  }

  initTopCellphone(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options
      )
    );
    return this.requestUrl(`:8185/fun/cellphone/initTopCellphone?${queryString}`);
  }

  mergeGetInfo(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const data = qs.stringify(options);
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    
    return this.requestUrl(`:8185/fun/commodity/merge/getInfo`, options);
  }

  getPromotionInfo(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options
      )
    );
    return this.requestUrl(`:8185/fun/commodity/getPromotionInfo?${queryString}`);
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
    return this.requestUrl(`:8185/fun/commodity/getNewestInfo`, options);
  }

  getAdverstInfo(options) {
    if (!options) {
      return Promise.reject(new Error("fields required"));
    }

    const queryString = qs.stringify(
      Object.assign(
        {
          // filter,
        },
        options
      )
    );
    return this.requestUrl(`:8185/fun/commodity/getAdverstInfo?${queryString}`);
  }

  requestUrl(url, options) {
    if (!url) {
      return Promise.reject("Url cannot be empty");
    }
    options = options || {};
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