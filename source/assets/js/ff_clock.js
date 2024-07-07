/*
JavaScript
For DarkDream906
*/

function ToChineseNum(num) {
  var cnNums = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"]; //汉字的数字
  nums = num.toString();
  nums = nums.split("");
  tnum="";
  for(a=0;a<nums.length;a++)
  {
    tnum=tnum+cnNums[parseInt(nums[a])];
  }
  return(tnum);
}

function Real_FormDate(date)
{
  var local_real_month = "公历"+date.getFullYear()+"年"+(date.getMonth()+1) + "月"+date.getDate()+"日"; //对应月份设置 
 return(local_real_month);
}

function Fantasy_FormDate(date)
{
  var ff_month_time = ["火","水","岩","风","炎","冰","土","岚","热","冷","岩","空"]; //架空月份数组
  var local_ff_month = "鸥历 "+(date.getFullYear()-1169)+" 年"+ff_month_time[date.getMonth()] + "之月"+date.getDate()+"日"; //对应月份设
  return(local_ff_month); //返回月份
}

function Fantasy_Now()
{
  var time = new Date();
  return(Fantasy_FormDate(time));
}

function Real_Now()
{
  var time = new Date();
  return(Real_FormDate(time));
}
