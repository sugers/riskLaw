<template>
  
  <div :id=id ref="data" class="ecthrts"></div>
  
</template>

<script>
// function getDaysOfEveryMonth(){//返回天数
//   var baseMonthsDay = [31,28,31,30,31,30,31,31,30,31,30,31];//各月天数
//   var thisYear = new Date().getFullYear();//今年
//   var thisMonth = new Date().getMonth();//今月
//   var thisMonthDays = [];//这个月有多少天,用于返回echarts用
//   //判断是闰年吗？闰年2月29天
//   function isRunYear(fullYear){
//     return (fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0));
//   }

//   function getThisMonthDays(days){//传天数，返天数数组
//     var arr = [];
//     for(var i=1;i <= days;i++){
//       arr.push(i);
//     }
//     return arr;
//   }

//   if(isRunYear(thisYear) && thisMonth == 1){//闰年2月29天
//     thisMonthDays = getThisMonthDays(baseMonthsDay[thisMonth] + 1);
//   }else{
//     thisMonthDays = getThisMonthDays(baseMonthsDay[thisMonth]);
//   }
//   return thisMonthDays;
// }

export default {
  name: "EchartsTable",
  props:["id","data"],
  data() {
    return {
      Myechart:null,
    };
  },
  beforeDestroy(){
    this.drawLinde.dispose();
  },
  watch:{
    data:{
      handler(value){
        this.drawLinde(value)
      },
      deep: true
    }
  },
  mounted() {
    this.drawLinde(this.data);
  },
  methods: {
    // textTitle 标题
    // nameArray x轴数据
    // series series数据
    drawLinde({textTitle='',legends=[],yaxis='',nameArray=[],series=[]} = {}) {

      let Myechart = this.$echarts.init(document.getElementById(this.id));
      Myechart.clear();
      Myechart.setOption({
        title: {
          text: textTitle
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legends,
          right: 30,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true
            },
            data: nameArray,
          },
        ],
        yAxis: [
          {
            max: yaxis,
            type: "value",
          },
        ],
        series: series,
      });
      window.onresize = function(){
        Myechart.resize();
      }
      // window.addEventListener("resize",function(){
      //   Myechart.resize();
      // })
    },
  },
};
</script>
  
<style lang="less">
  .ecthrts{
    width: 89%;
    height: 25rem;
  }
</style>