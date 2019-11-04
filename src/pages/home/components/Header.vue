<template>
    <div>
        <!--
        <div class="nav-header">
        -->
        <div class="topbar-wrap">
            <!--
            <div class="topbar-logo topbar-btn">
                <a href="/"><img src="../../../assets/cm_logo.png" style="padding-left:8px;"></a>
            </div>
            <div class="topbar-logos" v-show="!collapsed">
                <a href="/"><img src="../../../assets/txt_logo.png"></a>
            </div>
            -->
            <div class="topbar-title">
                <span style="color: white; font-size: 25px; margin-left: 10px">FasterRunner 接口自动化测试平台</span>
            </div>
            <div class="topbar-account topbar-btn">
                <span class="right" style="color: white; font-size: 14px; ">
                    <div style="float: right;margin-right: 100px">
                        <el-dropdown trigger="click">
                            <span style="color: white; font-size: 14px; " class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{this.$store.state.user}}  <i
                                class="iconfont icon-down"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div @click="userchangepwd"><span style="color: #555;font-size: 14px;">修改密码</span></div>
                                </el-dropdown-item>
                                <el-dropdown-item divided @click.native="handleLogOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </span>
            </div>

        </div>
    </div>

    
</template>

<script>

    export default {
        methods: {
            handleLogOut () {
                this.$store.commit("isLogin", null);
                this.setLocalValue("token", null);
                this.$router.push({name:"Login"});
            },
            userchangepwd(){
                this.$router.push({name:"ChangePwd"});
            }

        },
        name: "Header",

    }
</script>

<style scoped>
    .left {
        width: 180px;
        left: 20px;
        display: inline-block;
        position: fixed;
        z-index: 900;
        top: -5px;
    }

    .right {
        position: fixed;
        left: 300px;
        right: 0;
        top: 0;

    }

    .right div a:hover {
        color: darkcyan;
    }

    .logo {
        background: white;
        height: 40px;
    }

    .nav-header {
        background: #242F42;
        margin: 0 auto;
        font-size: 14px;
        width: 100%;
        border-bottom: 1px solid #ddd;
        height: 49px;
        line-height: 49px;
    }
    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #333744;
      padding: 0px;
    
      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 59px;
        line-height: 26px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }

</style>
