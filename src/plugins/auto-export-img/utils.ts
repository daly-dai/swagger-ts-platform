export function createCode() {
  const chars = ['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd', '0', '1', '2', '3']; //用数组chars保存验证码里出现的字符

  let randCode = ''; //定义一个初始值为空的字符串变量为最终产生的随机验证码

  for (let i = 0; i < 4; i++) {
    //0-1的随机小数 -->  0~数组长度-1的范围   取整
    const randPosition = Math.floor(Math.random() * (chars.length - 1)); //每次生成一个随机数的位置
    randCode += chars[randPosition]; //带有随机位置作为下标，指示到当前随机产生的某个字符上，将其连接到随机验证码的后面
  }

  //循环四次后即可显示出验证码
  return randCode; //当产生验证码后，将其显示到 div 中
}
