<template>
    <section>
        <div class="InsuranceCompany">
            <div class="insuranceTop">
                <div class="otherScreen">

                    <div class="companySelect onlyClass">
                        <span class="name">保险公司：</span>
                        <div class="selectContent">
                            <el-select v-model="fieldVal" slot="prepend" placeholder="请选择" @change="insuranceSelect">
                                <el-option v-for="(item,index) in insuranceDta" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="companySelect onlyClass">
                        <span class="name">省份：</span>
                        <div class="selectContent">
                            <el-select v-model="areaVal" slot="prepend" placeholder="请选择" @change="areaSelect">
                                <el-option v-for="(item,index) in areaData" :key="index" :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="timeSelect onlyClass">
                        <span class="name">月份：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="monthVal" type="month" placeholder="选择月" @change="monthChange">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="timeSelect onlyClass">
                        <span class="name">年份：</span>
                        <div class="selectContent">
                            <el-date-picker v-model="yearVal" type="year" placeholder="选择年" @change="yearChange">
                            </el-date-picker>
                        </div>
                    </div>

                    <!-- 筛选按钮 -->
                    <div class="screenBtn">
                        <el-button type="info" icon="el-icon-refresh" @click="refresh">重置</el-button>
                        <el-button type="primary" icon="el-icon-search" @click="searchClick">搜索
                        </el-button>
                        <!-- <el-button type="primary" icon="el-icon-document" @click="getexport">导出
                    </el-button> -->
                    </div>
                </div>
            </div>
            <div class="insuranceBottom" stype="position:relative;">
                <div id="submitChart" style="width: 100%;height:400px;"></div>
                <div id="tradChart" style="width: 100%;height:400px;"></div>
                <Spin fix v-show="isdone">
                    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
                    <div>Loading</div>
                </Spin>
            </div>
        </div>
    </section>
</template>
<script>
    import * as echarts from 'echarts';
    import {
        GetinsuranceAreaList,
        GetinsuranceList,
        GetTrendChart,
        GetTrendChartOrder
    } from '../../api/api';
    import provinces from "../../../static/js/pca-code.json";
    export default {
        data() {
            return {
                isdone: false,
                currendRole: '',
                yearVal: '',
                monthVal: '',
                fieldVal: '',
                areaVal: '',
                areaData: [],
                insuranceDta: [],
                submitChart: null,
                tradChart: null,
            }
        },
        mounted() {
            // 获取角色权限
            this.isdone = true;
            let userInfo = JSON.parse(localStorage.getItem('userinfor'));
            this.currendRole = userInfo.roleID;
            let getDate = new Date();

            this.monthVal =
                `${getDate.getFullYear()}-${Number(getDate.getMonth())+1>9?Number(getDate.getMonth())+1:'0'+(Number(getDate.getMonth())+1)}-${Number(getDate.getDay())+1>9?Number(getDate.getDay())+1:'0'+(Number(getDate.getDay())+1)}`


            // 获取趋势数据
            this.submitChart = echarts.init(document.getElementById('submitChart'));
            this.tradChart = echarts.init(document.getElementById('tradChart'));
            this.submitChart.setOption({
                title: {
                    text: '提交量'
                },
                tooltip: {
                    trigger: 'axis',
                },
                color: ['#409EFF', '#F4AA43'],
                legend: {
                    data: ['拒绝量', '通过量'],
                    right: 30
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                        name: '总数',
                        type: 'bar',
                        barGap: '-100%',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: 'rgba(128, 128, 128, 0)'
                            }
                        },
                        label: {
                            normal: {
                                show: true, //显示数值
                                position: 'top', // 位置设为top
                                formatter: function (params) {
                                    if (params.value > 0) {
                                        return params.value;
                                    } else {
                                        return '';
                                    }
                                },
                                textStyle: {
                                    color: '#000'
                                } //设置数值颜色
                            }
                        },
                    },
                    {
                        name: '通过量',
                        type: 'bar',
                        data: [],
                        stack: 'submit',

                    },
                    {
                        name: '拒绝量',
                        type: 'bar',
                        data: [],
                        stack: 'submit',
                    },

                ]
            });
            this.tradChart.setOption({
                title: {
                    text: '出单量'
                },
                tooltip: {
                    trigger: 'axis',
                },
                color: ['#F4AA43', '#409EFF'],
                legend: {
                    data: ['出单量', '出单保费金额'],
                    right: 30
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    // boundaryGap: false,
                    // axisTick: {
                    //     alignWithLabel: true
                    // },
                },
                yAxis: [{
                        type: 'value',
                        name: '出单量',
                        min: 0,
                        max: 10,
                        splitLine: { //网格线
                            show: true
                        }
                    },
                    {
                        type: 'value',
                        name: '出单保费金额',
                        min: 0,
                        max: 1000,
                        splitLine: { //网格线
                            show: false
                        }
                    }
                ],
                series: [{
                        name: '出单量',
                        type: 'line',
                        data: [],
                        // barWidth: 20,
                        // label: {
                        //     normal: {
                        //         show: true, //显示数值
                        //         position: 'top', // 位置设为top
                        //         formatter: function (params) {
                        //             if (params.value > 0) {
                        //                 return params.value;
                        //             } else {
                        //                 return '';
                        //             }
                        //         },
                        //         textStyle: {
                        //             color: '#000'
                        //         }
                        //     }
                        // }
                    },
                    {
                        name: '出单保费金额',
                        type: 'bar',
                        data: [],
                        // barWidth: 20,
                        // barGap: '-100%',
                        // itemStyle: {
                        //     normal: {
                        //         color: 'rgba(128, 128, 128, 0)'
                        //     }
                        // },
                        label: {
                            normal: {
                                show: true, //显示数值
                                position: 'top', // 位置设为top
                                formatter: function (params) {
                                    if (params.value > 0) {
                                        return params.value;
                                    } else {
                                        return '';
                                    }
                                },
                                textStyle: {
                                    color: '#000'
                                } //设置数值颜色
                            }
                        }
                    },

                ]
            });
            this.GetInsurance()
        },
        methods: {
            // arrMax(arr){
            //     arr.sort();
            //     return arr[arr.length-1]
            // },
            yearChange() {
                this.monthVal = '';
            },
            monthChange() {
                let getDate = new Date();
                let day = getDate.getDay();
                let hours = getDate.getHours();
                let minutes = getDate.getMinutes();
                let seconds = getDate.getSeconds();
                let monthValYear = new Date(this.monthVal).getFullYear();
                let monthValMonth = new Date(this.monthVal).getMonth();
                let timeval =
                    `${this.monthVal?monthValYear:new
                Date().getFullYear()}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                if (this.yearVal) {
                    this.yearVal = timeval;
                }

            },
            GetInsurance() {
                let that = this;
                let data = {
                    status: this.currendRole == 2001 ? -1 : -1,
                    keyword: '',
                }
                GetinsuranceList(data).then((res) => {
                    if (res.code == 200) {
                        res.data.list.map((item) => {
                            this.insuranceDta.push({
                                'name': item.name,
                                'code': item.ID
                            })
                        })

                        setTimeout(() => {
                            if (res.data.list.length == 1) {
                                that.fieldVal = that.insuranceDta[0].code;
                                that.fieldValName = that.insuranceDta[0].name;
                                that.insuranceSelect(that.insuranceDta[0].code, 1)
                            }

                        }, 200)
                    }

                })
            },
            insuranceSelect(e) {
                this.areaVal = ''
                this.areaData = [];
                let data = {
                    icco_id: e
                }
                this.insuranceDta.map((item) => {
                    if (item.code == e) {
                        this.fieldValName = item.name
                    }
                })
                GetinsuranceAreaList(data).then(res => {
                    res.data.list.map((childitem) => {
                        provinces.forEach((areaitem) => {
                            if (childitem.adcode == areaitem.code) {
                                this.areaData.push({
                                    name: areaitem.name,
                                    code: childitem.ID
                                });

                            }
                        })
                    })

                });
                setTimeout(() => {


                    if (this.areaData.length == 1) {
                        this.areaVal = this.areaData[0].code;
                        this.areaValName = this.areaData[0].name;
                    }
                    this.getListFn();

                }, 500)
            },
            areaSelect(e) {
                this.areaData.map((item) => {
                    if (item.code == e) {
                        this.areaValName = item.name
                    }
                })
            },
            getListFn() {
                let timeVal = null;
                let type = null;
                let getDate = new Date();
                let month = getDate.getMonth();
                let day = getDate.getDay();
                let hours = getDate.getHours();
                let minutes = getDate.getMinutes();
                let seconds = getDate.getSeconds();
                let monthValYear = new Date(this.monthVal).getFullYear();
                let monthValMonth = new Date(this.monthVal).getMonth();

                if (!this.yearVal) {
                    type = 0
                    timeVal =
                        `${monthValYear}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`

                } else if (this.yearVal && this.monthVal) {
                    this.yearVal = monthValYear;
                    type = 0;
                    timeVal =
                        `${new
                        Date(this.monthVal).getFullYear()}-${Number(monthValMonth)+1>9?Number(monthValMonth)+1:'0'+(Number(monthValMonth)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                    this.yearVal = timeVal
                } else if (this.yearVal && !this.monthVal) {
                    this.yearVal = new Date(this.yearVal).getFullYear()
                    this.monthVal = ''
                    type = 1;
                    timeVal
                        =
                        `${this.yearVal}-${Number(month)+1>9?Number(month)+1:'0'+(Number(month)+1)}-${Number(day)+1>9?Number(day)+1:'0'+(Number(day)+1)} ${hours>9?hours:'0'+hours}:${minutes>9?minutes:'0'+minutes}:${seconds>9?seconds:'0'+seconds}`
                    this.yearVal = timeVal
                }

                this.getSubmitChart(this.fieldVal, this.areaVal ? this.areaVal : 0, this.yearVal, timeVal, type, this
                    .submitChart)

                this.getTradChart(this.fieldVal, this.areaVal ? this.areaVal : 0, this.yearVal, timeVal, type, this
                    .tradChart)
            },
            getSubmitChart(icco_id, area_id, year, month, type, myChart) {

                let sumNum = [];
                let data = {
                    icco_id: icco_id,
                    area_id: area_id?area_id:0,
                    year: year,
                    month: month,
                    type: type
                }
                GetTrendChart(data).then((res) => {
                    if (res.code == 200) {

                        res.data.reject_vals.map((item, index) => {
                            sumNum.push(Number(item) + Number(res.data.success_vals[index]))
                        })
                        myChart.setOption({
                            xAxis: {
                                data: res.data.dates
                            },
                            series: [{
                                    name: '拒绝量',
                                    data: res.data.reject_vals
                                },
                                {
                                    name: '通过量',
                                    data: res.data.success_vals
                                },
                                {
                                    name: '总数',
                                    data: sumNum
                                }
                            ]
                        });
                        myChart.off('legendselectchanged');
                        myChart.on('legendselectchanged', function (params) {

                            let rejectStatu = params.selected['拒绝量'];
                            let paddStatu = params.selected['通过量'];
                            if (rejectStatu && paddStatu) {
                                myChart.setOption({
                                    series: [{
                                            name: '拒绝量',
                                            data: res.data.reject_vals,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                    position: 'top', // 位置设为top
                                                }
                                            },
                                        },
                                        {
                                            name: '通过量',
                                            data: res.data.success_vals,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                    position: 'top', // 位置设为top
                                                }
                                            },
                                        },
                                        {
                                            name: '总数',
                                            data: sumNum,
                                            type: 'bar',
                                            barGap: '-100%',
                                            itemStyle: {
                                                normal: {
                                                    color: 'rgba(128, 128, 128, 0)'
                                                }
                                            },
                                            label: {
                                                normal: {
                                                    show: true, //显示数值
                                                    formatter: function (params) {
                                                        if (params.value > 0) {
                                                            return params.value;
                                                        } else {
                                                            return '';
                                                        }
                                                    },
                                                }
                                            },
                                        }
                                    ]
                                });
                            } else if (rejectStatu && !paddStatu) {
                                myChart.setOption({
                                    series: [{
                                            name: '拒绝量',
                                            data: res.data.reject_vals,
                                            label: {
                                                normal: {
                                                    show: true, //显示数值
                                                    position: 'top', // 位置设为top
                                                    formatter: function (params) {
                                                        if (params.value > 0) {
                                                            return params.value;
                                                        } else {
                                                            return '';
                                                        }
                                                    },
                                                }
                                            },

                                        },
                                        {
                                            name: '通过量',
                                            data: res.data.success_vals,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                    position: 'top', // 位置设为top
                                                }
                                            },
                                        },
                                        {
                                            name: '总数',
                                            data: sumNum,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                }
                                            },
                                        }
                                    ]
                                });
                            } else if (!rejectStatu && paddStatu) {
                                myChart.setOption({
                                    series: [{
                                            name: '拒绝量',
                                            data: res.data.reject_vals,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                }
                                            },
                                        },
                                        {
                                            name: '通过量',
                                            data: res.data.success_vals,
                                            label: {
                                                normal: {
                                                    show: true, //显示数值
                                                    position: 'top', // 位置设为top
                                                    formatter: function (params) {
                                                        if (params.value > 0) {
                                                            return params.value;
                                                        } else {
                                                            return '';
                                                        }
                                                    },
                                                }
                                            },
                                        },
                                        {
                                            name: '总数',
                                            data: sumNum,
                                            label: {
                                                normal: {
                                                    show: false, //显示数值
                                                }
                                            },
                                        }
                                    ]
                                });
                            }

                        });
                        this.isdone = false;
                    }
                }).catch(() => {
                    this.isdone = false;
                })
            },
            getTradChart(icco_id, area_id, year, month, type, myChart) {
                let data = {
                    icco_id: icco_id,
                    area_id: area_id,
                    year: year,
                    month: month,
                    type: type
                }
                GetTrendChartOrder(data).then((res) => {
                    if (res.code == 200) {
                        let currentMaxVal = Math.max(...res.data.counts) * 2
                        // console.log(currentMaxVal)
                        console.log(res.data.counts)
                        myChart.setOption({
                            yAxis: [{
                                    type: 'value',
                                    name: '出单量',
                                    min: 0,
                                    max: currentMaxVal ? currentMaxVal : 10,
                                    splitLine: { //网格线
                                        show: true
                                    }
                                },
                                {
                                    type: 'value',
                                    name: '出单保费金额',
                                    min: 0,
                                    max: Math.max(...res.data.amounts) ? Math.max(
                                        ...res.data.amounts) + 1000 : 1000,
                                    splitLine: { //网格线
                                        show: false
                                    }

                                }
                            ],
                            xAxis: {
                                type: 'category',
                                data: res.data.dates
                            },
                            series: [{
                                name: '出单量',
                                type: 'line',
                                data: res.data.counts
                            }, {
                                name: '出单保费金额',
                                type: 'bar',
                                yAxisIndex: 1,
                                data: res.data.amounts
                            }, ]
                        });
                        myChart.off('legendselectchanged');
                        myChart.on('legendselectchanged', function (params) {
                            let rejectStatu = params.selected['出单量'];
                            let paddStatu = params.selected['出单保费金额'];
                            console.log(rejectStatu, paddStatu)
                            if (rejectStatu && paddStatu) {
                                myChart.setOption({
                                    yAxis: [{
                                            type: 'value',
                                            name: '出单量',
                                            show: true,
                                            min: 0,
                                            max: currentMaxVal ? currentMaxVal : 10,
                                            splitLine: { //网格线
                                                show: true
                                            }
                                        },
                                        {
                                            type: 'value',
                                            name: '出单保费金额',
                                            show:true,
                                            min: 0,
                                            max: Math.max(...res.data.amounts) ? Math.max(
                                                ...res.data.amounts) + 1000 : 1000,
                                            splitLine: { //网格线
                                                show: false
                                            }

                                        }
                                    ],
                                    xAxis: {
                                        type: 'category',
                                        data: res.data.dates
                                    },
                                    series: [{
                                        name: '出单量',
                                        type: 'line',
                                        data: res.data.counts
                                    }, {
                                        name: '出单保费金额',
                                        type: 'bar',
                                        yAxisIndex: 1,
                                        data: res.data.amounts
                                    }, ]
                                });
                            } else if (!rejectStatu && paddStatu) {
                                myChart.setOption({
                                    yAxis: [{
                                            type: 'value',
                                            name: '出单量',
                                            show: false,
                                            min: 0,
                                            max: currentMaxVal ? currentMaxVal : 10,
                                            splitLine: { //网格线
                                                show: false
                                            }
                                        },
                                        {
                                            type: 'value',
                                            name: '出单保费金额',
                                            min: 0,
                                            max: Math.max(...res.data.amounts) ? Math.max(
                                                ...res.data.amounts) + 1000 : 1000,
                                            splitLine: { //网格线
                                                show: true
                                            }
                                        }
                                    ],
                                    xAxis: {
                                        type: 'category',
                                        data: res.data.dates
                                    },
                                    series: [{
                                        name: '出单量',
                                        type: 'line',
                                        data: res.data.counts
                                    }, {
                                        name: '出单保费金额',
                                        type: 'bar',
                                        yAxisIndex: 1,
                                        data: res.data.amounts
                                    }, ]
                                });
                            } else if (rejectStatu && !paddStatu) {
                                myChart.setOption({
                                    yAxis: [{
                                            type: 'value',
                                            name: '出单量',
                                            show: true,
                                            min: 0,
                                            max: currentMaxVal ? currentMaxVal : 10,
                                            splitLine: { //网格线
                                                show: true
                                            }
                                        },
                                        {
                                            type: 'value',
                                            name: '出单保费金额',
                                            show: false,
                                            min: 0,
                                            max: Math.max(...res.data.amounts) ? Math.max(
                                                ...res.data.amounts) + 1000 : 1000,
                                            splitLine: { //网格线
                                                show: false
                                            }
                                        }
                                    ],
                                    xAxis: {
                                        type: 'category',
                                        data: res.data.dates
                                    },
                                    series: [{
                                        name: '出单量',
                                        type: 'line',
                                        data: res.data.counts
                                    }, {
                                        name: '出单保费金额',
                                        type: 'bar',
                                        yAxisIndex: 1,
                                        data: res.data.amounts
                                    }, ]
                                });
                            }
                        })

                    }
                }).catch(() => {
                    this.isdone = false;
                })
            },
            refresh() {
                this.yearVal = '';
                this.areaVal = '';
            },
            searchClick() {
                this.isdone = true;
                this.getListFn();
            }
        }

    }
</script>

<style scoped>
    .screenBtn {
        margin-left: 30px;
    }

    .screenBtn button {
        padding: 0;
        font-size: 13px;
        width: 66px;
        height: 30px;
    }

    .screenBtn button+button {
        margin-left: 20px;
    }

    .radioStatu {
        display: flex;
        align-items: center;
        margin-left: 30px;
    }

    .otherScreen {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        /* justify-content: space-evenly; */
        width: 100%;
    }

    .onlyClass {
        display: flex;
        align-items: center;
        margin-left: 30px;
        margin-bottom: 20px;
    }

    .onlyClass span {
        width: 90px;
        text-align: left;
        font-size: 14px;
        font-weight: 600;
    }

    .insuranceBottom {
        position: relative;
        padding: 20px 0;
    }
</style>