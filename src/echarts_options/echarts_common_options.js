/**
 * Created by liwaiqiang on 2018/1/7.
 * 主要将echart图表的公用部分进行提取并使用
 */
var TOOLBOX_OPTIONS = {
    show : true,                                 //是否显示工具栏组件
    orient:"vertical",                        //工具栏 icon 的布局朝向'horizontal' 'vertical'
    itemSize:15,                                 //工具栏 icon 的大小
    itemGap:10,                                  //工具栏 icon 每项之间的间隔
    showTitle:true,                             //是否在鼠标 hover 的时候显示每个工具 icon 的标题
    feature : {
        mark : {                                 // '辅助线开关'
            show: true
        },
        dataView : {                            //数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
            show: true,                         //是否显示该工具。
            title:"数据视图",
            readOnly: false,                    //是否不可编辑（只读）
            lang: ['数据视图', '关闭', '刷新'],  //数据视图上有三个话术，默认是['数据视图', '关闭', '刷新']
            backgroundColor:"#fff",             //数据视图浮层背景色。
            textareaColor:"#fff",               //数据视图浮层文本输入区背景色
            textareaBorderColor:"#333",         //数据视图浮层文本输入区边框颜色
            textColor:"#000",                    //文本颜色。
            buttonColor:"#c23531",              //按钮颜色。
            buttonTextColor:"#fff",             //按钮文本颜色。
        },

        restore : {                             //配置项还原。
            show: true,                         //是否显示该工具。
            title:"还原",
        },

        magicType: {                            //动态类型切换
            show: true,
            title:"切换",                       //各个类型的标题文本，可以分别配置。
            type: ['line', 'bar','stack','tiled'],              //启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
        },
        saveAsImage : {                         //保存为图片。
            show: true,                         //是否显示该工具。
            type:"png",                         //保存的图片格式。支持 'png' 和 'jpeg'。
            name:"pic1",                        //保存的文件名称，默认使用 title.text 作为名称
            backgroundColor:"#ffffff",        //保存的图片背景色，默认使用 backgroundColor，如果backgroundColor不存在的话会取白色
            title:"保存为图片",
            pixelRatio:1                        //保存图片的分辨率比例，默认跟容器相同大小，如果需要保存更高分辨率的，可以设置为大于 1 的值，例如 2
        },
    },
    zlevel:0,                                   //所属图形的Canvas分层，zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
    z:2,                                         //所属组件的z分层，z值小的图形会被z值大的图形覆盖
    left:"right",                              //组件离容器左侧的距离,'left', 'center', 'right','20%'
    top:"bottom",                                   //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
    right:"auto",                               //组件离容器右侧的距离,'20%'
    bottom:"auto",                              //组件离容器下侧的距离,'20%'
    width:"auto",                               //图例宽度
    height:"auto",                              //图例高度
}
export default {
    chartColumAndBar_options:{
        title: { 
            top: 'top',
         },
        tooltip: {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (datas,params) {
                var res = '报告ID:' + datas[0].name + '<br/>'
                for (var i = 0, length = datas.length; i < length; i++) {
                    res += datas[i].seriesName + '：'
                        + datas[i].value + '<br/>'
                }
                return res
            }
        },
        legend: {
            orient: 'horizontal',
            left: 'right',
            top: '25px',
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox:TOOLBOX_OPTIONS
    },

}