function toThousandFilterZero(number, decimals, dec_point, thousands_sep) {
  decimals = 2; //这里默认设置保留两位小数，也可以注释这句采用传入的参数
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * */
  number = (number+ '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  var s = n.toString().split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  } else {
    s[1] = s[1].substring(0, prec); //小数点位数超出长度时截取前面的位数
  }
  return s.join(dec);
}
//toThousandFilterZero(1234567.089, 2, ".", ","); //1,234,567.08 （精度不存在误差）
export {
 toThousandFilterZero//通过此处导出方法
}