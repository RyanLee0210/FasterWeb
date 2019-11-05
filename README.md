# FasterWeb

## 介绍

> 依赖于FasterRunner的Web项目

### 项目结构

```
└── FasterWeb    # 前端Web项目
    ├── build    # 编译相关配置源码
    ├── conf.d    # nginx相关配置文件
    │   └── yelda.conf
    ├── config
    ├── default.conf
    ├── dist    # 前端Web打包后的目标文件
    ├── Dockerfile    # FasterWeb镜像docker脚本文件
    ├── index.html
    ├── LICENSE
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── src    # 前端项目源代码
    └── static
```

### 相关技术：

- Vue：是一个开源Web前端开发框架。
- Element-UI：Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。
- NPM：npm 为你和你的团队打开了连接整个 JavaScript 天才世界的一扇大门。它是世界上最大的软件注册表，每星期大约有 30 亿次的下载量，包含超过 600000 个 *包（package）* （即，代码模块）。来自各大洲的开源软件开发者使用 npm 互相分享和借鉴。包的结构使您能够轻松跟踪依赖项和版本。

## 配置说明：

`npm`反向代理服务器：`./FasterWeb/config/index.js`

```javascript
const path = require('path')

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // 增加本地调试环境，使用node的dev代理功能
            '/api': {
                changeOrigin: true,
                target: 'http://127.0.0.1:8000',
                pathRewrite: {
                  '^/api': '/api'
                }
              }
        },
        host: 'localhost',
        port: 8080, 
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}

```

主要是在dev开发模式下，对于前端Web访问后端http接口时，可通过`proxyTable`将请求进行转发，不需要单独配置nginx服务器进行开发；

## 本地开发环境部署

``` bash
# 一般npm下载东西比较慢，可安装cnpm，具体百度一下~~~
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# 打包前端文件至dist文件夹下
# 在FasterWeb/src/restful/api.js中配置baseUrl为在FasterRunner后台地址如："http://192.168.1.100:8000"，或者为""
npm run build

```

测试
-----------

1. 需要保证FasterRunner服务已经启动；
2. open url(recommend chrome): http://localhost:8080/fastrunner/register

## docker部署

详情见：https://github.com/RyanLee0210/FasterRunnerWeb