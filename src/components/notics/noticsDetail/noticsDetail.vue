<template>
    <section>

        <div class="noticsDetail">
            <div class="nav">
                <Breadcrumb>
                    <BreadcrumbItem to="/notics">公告栏</BreadcrumbItem>
                    <BreadcrumbItem>详情</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="ContentExhibition">
                <div class="title">关于保险公司合作事宜</div>
                <div class="time">2021-07-28 14:55</div>
                <div class="contentVal">
                    保险公司是指依保险法和公司法设立的公司法人。保险公司收取保费，将保费所得资本投资于债券、股票、贷款等资产，运用这些资产所得收入支付保单所确定的保险赔偿。保险公司通过上述业务，能够在投资中获得高额回报并以较低的保费向客户提供适当的保险服务，从而盈利。
                    保险公司的业务分为两类: (1) 人身保险业务，包括人寿保险、健康保险、意外伤害保险等保险业务。(2)
                    财产保险业务，包括财产损失保险、责任保险、信用保险、保证保险等保险业务。我国的保险公司一般不得兼营人身保险业务和财产保险业务。 [1]
                    保险公司（insurance company），是采用公司组织形式的保险人，经营保险业务。
                    保险关系中的保险人，享有收取保险费、建立保险费基金的权利。同时，当保险事故发生时，有义务赔偿被保险人的经济损失。
                    保险公司是销售保险合约、提供风险保障的公司。保险公司是指经营保险业的经济组织。保险公司，是指经中国保险监督管理机构批准设立，并依法登记注册的商业保险公司，包括直接保险公司和再保险公司。
                    保险公司是指依保险法和公司法设立的公司法人。保险公司收取保费，将保费所得资本投资于债券、股票、贷款等资产，运用这些资产所得收入支付保单所确定的保险赔偿。保险公司通过上述业务，能够在投资中获得高额回报并以较低的保费向客户提供适当的保险服务，从而盈利。
                    保险公司的业务分为两类: (1) 人身保险业务，包括人寿保险、健康保险、意外伤害保险等保险业务。(2)
                    财产保险业务，包括财产损失保险、责任保险、信用保险、保证保险等保险业务。我国的保险公司一般不得兼营人身保险业务和财产保险业务。 [1]
                    保险公司（insurance company），是采用公司组织形式的保险人，经营保险业务。
                    保险关系中的保险人，享有收取保险费、建立保险费基金的权利。同时，当保险事故发生时，有义务赔偿被保险人的经济损失。
                </div>
            </div>
            <div class="attachFile">
                <div class="topic">附件：</div>
                <div class="downloadContentt">
                    <div class="downloadList">
                        <a href="" target="_blank">保险公司的介绍文档.doc</a>
                        <a href="">下载</a>
                    </div>
                    <div class="downloadList">
                        <a href="" target="_blank">保险公司的介绍文档.doc</a>
                        <a href="">下载</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {}
    }
</script>

<style scoped>
    .ContentExhibition {
        display: flex;
        width: 80%;
        margin: 0 auto;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;
    }

    .title {
        font-size: 16px;
        color: #333;
        font-weight: 700;
    }

    .time {
        margin: 20px 0;
    }

    .contentVal {
        color: #333;
        font-size: 14px;
    }

    .attachFile {
        display: flex;
        align-content: flex-start;
        width: 80%;
        margin: 0 auto;
        padding-top: 40px;
        font-size: 13px;
    }

    .attachFile .topic {
        color: #333;
    }

    .attachFile .downloadList {
        padding-bottom: 5px;
    }

    .attachFile .downloadList a {
        margin-right: 20px;

    }
</style>