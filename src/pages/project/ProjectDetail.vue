<template>

    <div >
        <ul class="title-project">
            <li class="title-li" title="Test API Project">
                <b>{{projectInfo.name}}</b>
                <b class="desc-li">{{projectInfo.desc}}</b>

            </li>
        </ul>

        <ul class="project_detail">
            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe74a;</i> &nbsp;{{projectInfo.api_count}} 个接口</p>
                <p class="desc-p">接口总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe6da;</i> &nbsp;{{projectInfo.case_count}} 个用例</p>
                <p class="desc-p">用例集总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xee32;</i> &nbsp;{{projectInfo.config_count}} 套配置</p>
                <p class="desc-p">配置总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe692;</i> &nbsp;{{projectInfo.variables_count}} 对变量</p>
                <p class="desc-p">全局变量对数</p>
            </li>
        </ul>

        <ul class="project_detail">
            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe609;</i> &nbsp;{{projectInfo.host_count}} 套环境</p>
                <p class="desc-p">环境总数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe61e;</i> &nbsp;{{projectInfo.task_count}} 项任务</p>
                <p class="desc-p">定时任务个数</p>
            </li>

            <li class="pull-left">
                <p class="title-p"><i class="iconfont">&#xe66e;</i> &nbsp;{{projectInfo.report_count}} 个报告</p>
                <p class="desc-p">测试报告总数</p>
            </li>

          
        </ul>
        <el-row class="chart-container">
            <el-col :span="24">
              <div id="task_summary" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import echarts_common_options from '../../echarts_options/echarts_common_options'
    export default {
        name: "ProjectDetail",
        data() {
            return {
                projectInfo: {},
                task_summary: null,
                task_summary_details: {},
            }
        },
        mounted: function () {
            let that = this;
            that.getProjectDetail();
            // 增加echarts柱形图的点击事件，点击对应柱形图，打开对应的测试报告
            that.task_summary.on('click', function (param) {
                var index = param.name;
                window.open(that.$api.baseUrl + "/api/fastrunner/reports/" + index + "/")
            });
        },
        methods: {
            success(resp) {
                this.$notify({
                    message: resp["msg"],
                    type: 'success',
                    duration: 1000
                });
            },
            failure(resp) {
                this.$notify.error({
                    message: resp.msg,
                    duration: 1000
                });
            },

            getProjectDetail() {
                let that = this;
                const pk = that.$route.params.id;
                // 初始化echarts图表
                that.task_summary =echarts.init(document.getElementById('task_summary'));
                that.task_summary.setOption(echarts_common_options.chartColumAndBar_options);
                that.$api.getProjectDetail(pk).then(res => {
                    that.projectInfo = res;
                    // 加载项目的echarts图表
                    that.task_summary_details = res.task_summary;
                    that.task_summary.setOption(that.task_summary_details);
                });

            },
        },

    }
</script>

<style scoped>


    .chart-container .el-col {
    padding: 30px 20px;
    }
    .desc-p {
        padding-top: 10px;
        font-size: 12px;
        color: #b6b6b6;
    }

    .title-p {
        font-size: 18px;
        margin-top: 10px;
    }

    .title-project li a {
        font-size: 12px;
        text-decoration: none;
        color: #a3a3a3;
        margin-left: 20px;

    }

    .pull-left {
        float: left;
        margin-left: 10px;
    }

    .project_detail li {
        margin-top: 10px;
        text-indent: 20px;
        display: inline-block;
        height: 90px;
        width: calc(20% - 1.5px);
        border: 1px solid #ddd;
    }

    .project_detail {
        height: 100px;
        margin-top: 20px;
    }

    .title-project {
        margin-top: 40px;
        margin-left: 10px;
    }

    ul li {
        list-style: none;
    }

    .title-li {
        font-size: 24px;
        color: #607d8b;
    }

    .desc-li {
        margin-top: 10px;
        color: #b6b6b6;
        font-size: 14px;
    }
</style>
