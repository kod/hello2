/* eslint strict:0 */

"use strict";

const axios = require("axios");
const qs = require("qs");

const BASE_URL = "http://192.168.1.100";
const CLIENT_ID = "KzEZED7aC0vird8jWyHM38mXjNTY";
const CLIENT_SECRET = "W9JZoJe00qPvJsiyCGT3CCtC6ZUtdpKpzMbNlUGP";
const filter = "for_ios";

function callApi(url, options) {
  const finalUrl = /^https?:\/\//i.test(url) ? url : BASE_URL + url;
  console.log(finalUrl);
  console.log(options);
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

  getNewestInfo(options) {
    // if (!options) {
    //   return Promise.reject(new Error('fields required'));
    // }

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

  login(username, password, rememberPassword) {
    if (!username) {
      return Promise.reject(new Error("username required"));
    }
    if (!password) {
      return Promise.reject(new Error("password required"));
    }
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      get_secure_url: 1,
      grant_type: "password",
      username,
      password,
      device_token: "pixiv"
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data
    };
    return axios("https://oauth.secure.pixiv.net/auth/token", options)
      .then(res => {
        this.auth = res.data.response;
        // eslint-disable-next-line no-unneeded-ternary
        this.rememberPassword = rememberPassword === false ? false : true;
        if (rememberPassword) {
          this.username = username;
          this.password = password;
        }
        return res.data.response;
      })
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }

  logout() {
    this.auth = null;
    this.headers.Authorization = undefined;
    this.username = null;
    this.password = null;
    return Promise.resolve();
  }

  authInfo() {
    return this.auth;
  }

  refreshAccessToken(refreshToken) {
    if ((!this.auth || !this.auth.refresh_token) && !refreshToken) {
      return Promise.reject(new Error("refresh_token required"));
    }
    const data = qs.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      get_secure_url: 1,
      grant_type: "refresh_token",
      refresh_token: refreshToken || this.auth.refresh_token
    });
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data
    };
    return axios("https://oauth.secure.pixiv.net/auth/token", options)
      .then(res => {
        this.auth = res.data.response;
        return res.data.response;
      })
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }

  // eslint-disable-next-line class-methods-use-this
  createProvisionalAccount(nickname) {
    if (!nickname) {
      return Promise.reject(new Error("nickname required"));
    }
    const data = qs.stringify({
      ref: "pixiv_ios_app_provisional_account",
      user_name: nickname
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer WHDWCGnwWA2C8PRfQSdXJxjXp0G6ULRaRkkd6t5B6h8"
      },
      data
    };
    return axios("https://accounts.pixiv.net/api/provisional-accounts/create", options)
      .then(res => res.data.body)
      .catch(err => {
        if (err.response) {
          throw err.response.data;
        } else {
          throw err.message;
        }
      });
  }

  // require auth
  userState() {
    return this.requestUrl(`/v1/user/me/state`);
  }

  setLanguage(lang) {
    this.headers["Accept-Language"] = lang;
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

export default new ReactStore();
