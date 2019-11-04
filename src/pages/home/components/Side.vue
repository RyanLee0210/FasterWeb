<template>

  <el-menu
      class="common-side-bar"
      :default-active="$store.state.routerName"
      background-color="#304056"
      text-color="#BFCBD9"
      active-text-color="#318DF1"
      @select="select"
  >
      <el-menu-item index="ProjectList">
          <i class="iconfont" >&#xe631;</i>&nbsp;&nbsp;首  页
      </el-menu-item>

     <!-- <el-submenu index="ApiTest">
          <template slot="title">
              <i class="el-icon-view"></i>
              <span slot="title">接口自动化</span>
          </template>-->

          <!--<el-menu-item-group>-->
              <el-menu-item v-for="item of side_menu" :index="item.url" :key="item.url" :disabled="$store.state.routerName === 'ProjectList'">
                  <span class="iconfont" v-html="item.code"></span>&nbsp;&nbsp;{{item.name}}
              </el-menu-item>
         <!-- </el-menu-item-group>
      </el-submenu>-->
    <!--  <el-menu-item index="Pressure" disabled>
          &nbsp;<span class="iconfont">&#xe61f;</span>&nbsp;&nbsp;压力测试
      </el-menu-item>-->


  </el-menu>
</template>


<script>
    export default {
        name: "Side",
        data() {
            return {
                side_menu: [
                    {name: "项目概况", url: "ProjectDetail", code: "&#xe64a;"},
                    {name: "API 模板", url: "RecordApi", code: "&#xe74a;"},
                    {name: "测试用例", url: "AutoTest", code: "&#xe6da;"},
                    {name: "配置管理", url: "RecordConfig", code: "&#xee32;"},
                    {name: "全局变量", url: "GlobalEnv", code: "&#xe692;"},
                    {name: "域名管理", url: "HostIP", code: "&#xe609;"},
                    {name: "驱动代码", url: "DebugTalk", code: "&#xe7ca;"},
                    {name: "定时任务", url: "Task", code: "&#xe61e;"},
                    {name: "历史报告", url: "Reports", code: "&#xe66e;"}
                ],
                collapsed: false,
            }
        },
        methods:{
            select(url) {
                this.$store.commit('setRouterName',url);
                this.$router.push({name:url});
                this.setLocalValue("routerName",url);
            },
             //折叠导航栏
             collapse: function () {
              this.collapsed = !this.collapsed;
            },
        }
    }
</script>

<style scoped>

    .common-side-bar {
        position: fixed;
        top: 48px;
        border-right: 1px solid #ddd;
        height: 100%;
        width: 202px;
        background-color: #fff;
        display: inline-block;
    }
    /*aside--start*/
    aside {
            min-width: 50px;
            background: #333744;
            &::-webkit-scrollbar {
              display: none;
            }
      
            &.showSidebar {
              overflow-x: hidden;
              overflow-y: auto;
            }
      
            .el-menu {
              height: 100%; /*写给不支持calc()的浏览器*/
              height: -moz-calc(100% - 80px);
              height: -webkit-calc(100% - 80px);
              height: calc(100% - 80px);
              border-radius: 0px;
              background-color: #333744;
              border-right: 0px;
            }
      
            .el-submenu .el-menu-item {
              min-width: 60px;
            }
            .el-menu {
              width: 180px;
            }
            .el-menu--collapse {
              width: 60px;
            }
      
            .el-menu .el-menu-item, .el-submenu .el-submenu__title {
              height: 46px;
              line-height: 46px;
            }
      
            .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
              background-color: #7ed2df;
            }
    }
    /*aside--end*/
    .menu-toggle {
            background: #4A5064;
            text-align: center;
            color: white;
            height: 26px;
            line-height: 30px;
          }
      
          /*.content-container-start*/  
          .content-container {
            background: #fff;
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            padding-bottom: 1px;
      
            .content-wrapper {
              background-color: #fff;
              box-sizing: border-box;
            }
          }
        /*.content-container-end*/
</style>
