<template>
  <div :id="id" ref="data" class="ecthrts"></div>
</template>

<script>
export default {
  name: "EchartsTable",
  props: ["id", "data"],
  data() {
    return {
      Myechart: null,
    };
  },
  beforeDestroy() {
    this.drawLinde.dispose();
  },
  watch: {
    data: {
      handler(value) {
        this.drawLinde(value);
      },
      deep: true,
    },
  },
  mounted() {
    this.drawLinde(this.data);
  },
  methods: {
    // textTitle 标题
    // nameArray x轴数据
    // series series数据
    // yaxis y轴最大值
    drawLinde({
      textTitle = "",
      colors = [],
      legends = [],
      yaxis = "",
      nameArray = [],
      series = [],
    } = {}) {
      let Myechart = this.$echarts.init(document.getElementById(this.id));
      
      // Myechart.clear();
      if (this.id == "echars1") {
        Myechart.off("legendselectchanged");
        // 图例开关的行为只会触发 legendselectchanged 事件
        Myechart.on("legendselectchanged", function (params) {
          // 获取点击图例的选中状态
          // var isSelected = params.selected[params.name];
          var isSelecteds = params.selected["通过量"];
          var isSelectedt = params.selected["拒绝量"];
          // 打印所有图例的状态
          console.log('3',series);
          let seried = series;
          if (isSelecteds && isSelectedt) {
            seried[0].label.normal.show = true;
            seried[1].label.normal.show = false;
            seried[2].label.normal.show = false;
          } else if (!isSelecteds && isSelectedt) {
            seried[0].label.normal.show = false;
            seried[1].label.normal.show = false;
            seried[2].label.normal.show = true;
          } else if (isSelecteds && !isSelectedt) {
            seried[0].label.normal.show = false;
            seried[1].label.normal.show = true;
            seried[2].label.normal.show = false;
          }
        });
      }

      Myechart.setOption({
        title: {
          text: textTitle,
        },
        tooltip: {
          trigger: "axis",
        },
        color: colors,
        legend: {
          data: legends,
          right: 30,
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
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
      window.onresize = function () {
        Myechart.resize();
      };
      // window.addEventListener("resize",function(){
      //   Myechart.resize();
      // })
    },
  },
};
</script>
  
<style lang="less">
.ecthrts {
  width: 89%;
  height: 25rem;
}
</style>