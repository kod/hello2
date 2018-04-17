/**
 * 金额格式化
 * @Author   taichiyi
 * @DateTime 2017-11-10
 * @param    {number/string}   price      待格式化的金额
 * @param    {number}          interval   间隔位数, 默认为3
 * @param    {string}          separator  分隔符/分节符, 默认为","
 * @return   {string}                     格式化后的金额
 */
const priceFormat = function(price, separator, interval) {
  price = parseInt(price);
  price = price === price ? price + '' : '';
  separator = separator || ',';
  interval = interval || 3;
  let i;
  let result = '';
  let price_length = price.length;
  let quotient = parseInt(price_length / interval);
  let module = price_length % interval;

  if (quotient) {
    for (i = quotient; i > 0; i -= 1) {
      result = separator + price.slice(module + interval * (i - 1), module + interval * i) + result;
    }
    if (module === 0) {
      result = result.slice(1);
    } else {
      result = price.slice(0, module) + result;
    }
  } else {
    result = price;
  }
  return result;
};

export default priceFormat;
