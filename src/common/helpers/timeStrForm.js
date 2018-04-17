/* 时间戳格式化(时间戳默认为unix-10位数)
 * 
 * -model:
 *  1:0000-00-00
 *  2:0000-00-00 00:00 (默认)
 *  3:0000-00-00 00:00:00
 *  4:人性化显示-1{
 *     当天: 00:00
 *     昨天: 昨天 00:00
 *     昨天以前: 0月-0日 00:00
 *     一年前: 0000年-0月-0日 00:00
 *   }     
 *  5:人性化显示-2{
 *     当天: 00:00
 *     昨天: 昨天
 *     昨天以前: 0月-0日
 *     一年前: 00/00/00
 *   }     
 *  6:0000.00.00
 */
const timeStrForm = function(str, model, unUnix) {
  let reStr = ''; //返回值
  let monthFormat; //月格式化
  let dateFormat; //日格式化
  let hourFormat; //时格式化
  let minuteFormat; //分格式化
  let secondFormat; //秒格式化

  let nDNow; //现在的时间戳
  let yearNow; //现在的年份
  let monthNow; //现在的月份
  let dateNow; //现在的天数
  let hourNow; //现在的小时
  let minuteNow; //现在的分钟
  let secondNow; //现在的秒数

  let dayDiff; // 相差几天
  let monthDiff; // 相差几年
  let yearDiff; // 相差几年

  if (!str) {
    //默认为当前时间戳
    str = parseInt(+new Date() / 1000);
  }

  if (!unUnix) {
    // 时间戳默认为unix
    str = str + '000';
  }

  // 不为数字,转为数字
  if (typeof str !== 'number') {
    str = Number(str);
  }

  let nD = new Date(str);
  let year = nD.getFullYear();
  let month = nD.getMonth() + 1;
  let date = nD.getDate();
  let hour = nD.getHours();
  let minute = nD.getMinutes();
  let second = nD.getSeconds();

  monthFormat = month;
  dateFormat = date;
  hourFormat = hour;
  minuteFormat = minute;
  secondFormat = second;

  monthFormat < 10 && (monthFormat = '0' + monthFormat);
  dateFormat < 10 && (dateFormat = '0' + dateFormat);
  hourFormat < 10 && (hourFormat = '0' + hourFormat);
  minuteFormat < 10 && (minuteFormat = '0' + minuteFormat);
  secondFormat < 10 && (secondFormat = '0' + secondFormat);

  switch (model) {
    case 1:
      reStr = year + '-' + monthFormat + '-' + dateFormat;
      break;

    case 2:
      reStr = year + '-' + monthFormat + '-' + dateFormat + ' ' + hourFormat + ':' + minuteFormat;
      break;

    case 3:
      reStr = year + '-' + monthFormat + '-' + dateFormat + ' ' + hourFormat + ':' + minuteFormat + ':' + secondFormat;
      break;

    case 4:
      nDNow = new Date();
      yearNow = nDNow.getFullYear();
      monthNow = nDNow.getMonth() + 1;
      dateNow = nDNow.getDate();
      hourNow = nDNow.getHours();
      minuteNow = nDNow.getMinutes();
      secondNow = nDNow.getSeconds();

      dayDiff = dateNow - date; // 相差几天
      monthDiff = monthNow - month; // 相差几年
      yearDiff = yearNow - year; // 相差几年

      if (yearDiff === 0) {
        // 今年发的
        if (monthDiff === 0) {
          //这个月发的
          if (dayDiff === 0) {
            // 今天发的
            reStr = hourFormat + ':' + minuteFormat;
          } else if (dayDiff === 1) {
            // 昨天发的
            reStr = '昨天 ' + hourFormat + ':' + minuteFormat;
          } else if (dayDiff === 2) {
            //前天发的
            reStr = '前天 ' + hourFormat + ':' + minuteFormat;
          } else {
            reStr = month + '月' + date + '日 ' + hourFormat + ':' + minuteFormat;
          }
        } else {
          //不是这个月发的
          reStr = month + '月' + date + '日 ' + hourFormat + ':' + minuteFormat;
        }
      } else {
        // 非今年发的
        reStr = year + '年' + month + '月' + date + '日 ' + hourFormat + ':' + minuteFormat;
      }
      break;

    case 5:
      nDNow = new Date();
      yearNow = nDNow.getFullYear();
      monthNow = nDNow.getMonth() + 1;
      dateNow = nDNow.getDate();
      hourNow = nDNow.getHours();
      minuteNow = nDNow.getMinutes();
      secondNow = nDNow.getSeconds();

      dayDiff = dateNow - date; // 相差几天
      monthDiff = monthNow - month; // 相差几年
      yearDiff = yearNow - year; // 相差几年

      // 格式化 年份
      year = (year + '*').slice(-3, -1);

      if (yearDiff === 0) {
        // 今年发的
        if (monthDiff === 0) {
          //这个月发的
          if (dayDiff === 0) {
            // 今天发的
            reStr = hourFormat + ':' + minuteFormat;
          } else if (dayDiff === 1) {
            // 昨天发的
            reStr = '昨天';
          } else if (dayDiff === 2) {
            //前天发的
            reStr = '前天';
          } else {
            reStr = month + '月' + date + '日';
          }
        } else {
          //不是这个月发的
          reStr = month + '月' + date + '日';
        }
      } else {
        // 非今年发的
        reStr = year + '/' + month + '/' + date + '/';
      }
      break;

    case 6:
      reStr = year + '.' + monthFormat + '.' + dateFormat;
      break;

    case 7:
      reStr = year + '/' + monthFormat + '/' + dateFormat;
      break;

    case 8:
      reStr = dateFormat + '/' + monthFormat + '/' + year;
      break;

    default:
      reStr = year + '-' + monthFormat + '-' + dateFormat + ' ' + hourFormat + ':' + minuteFormat;
      break;
  }

  return reStr;
};

export default timeStrForm;
