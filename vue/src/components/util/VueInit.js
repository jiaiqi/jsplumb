import Vue from "vue";
import VueResource from "vue-resource";
import ElementUI from "element-ui";
// const ElementUI = import(/* webpackChunkName: "element-ui" */'element-ui')
import "vue2-ace-editor"
import "element-ui/lib/theme-chalk/index.css";
// const Bxfront = import(
//   /* webpackChunkName: "bxfront" */ "bxfront/dist/index.cjs.js"
// );
// import Bxfront from '../../../public/temp/index.cjs';
import Bxfront from "bxfront/dist/index.cjs.js";
import Swiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

// 初始化插件
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Swiper);
Vue.use(Bxfront);
// ajax conf, 请求跨域
Vue.http.options.xhr = {
  withCredentials: true
};

// ajax 拦截器
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  let ticket = "44b4bc14-3ad9-47e8-9471-749cb0c1dd2e";
  // if(sessionStorage.getItem("bx_auth_ticket")){
  //   ticket = sessionStorage.getItem("bx_auth_ticket")
  // }
  ticket && request.headers.set("bx_auth_ticket", ticket);

  return function (response) {
    if (response.data.state == "FAILURE") {
      // debugger;
      if (
        response.data.resultCode == "0011"
      ) {
        console.info("session timeout !");
        if (localStorage.getItem("need_login_flag") != "need_login") {
          console.info("需要登录访问，跳转到登录页面");
          localStorage.setItem("need_login_flag", "need_login");
          this.$confirm('需要登录访问，即将跳转到登录页面, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '已跳转到登录页面!'
            });
            if (this.getRootWindow().layer) {
              var login_page = "/login.html";
              this.getRootWindow().layer.open({
                title: false,
                type: 2,
                content: login_page,
                closeBtn: 1,
                area: ["370px", "445px"],
                shade: 0.9
              });
            } else {
              window.location.href = "/login.html#/";
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消跳转到登录页面'
            });
            location.reload()
          });
        } else {
          console.info("不需要登录访问");
        }
      } else if (response.data.resultCode == "0000") {
        if (localStorage.getItem("need_login_flag") != "need_login") {
          // 未登录&&没有访问权限
          // alert(response.data.resultMessage);
          this.$confirm("没有访问权限，是否打开登录页面", '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '已打开登录页面!'
            });
            if (this.getRootWindow().layer) {
              var login_page = "/login.html";
              this.getRootWindow().layer.open({
                title: false,
                type: 2,
                content: login_page,
                closeBtn: 1,
                area: ["370px", "445px"],
                shade: 0.9
              });
            } else {
              window.location.href = "/login.html#/";
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消跳转到登录页面'
            });
          });
        } else {
          // 已登录&&没有访问权限
          this.$message({
            type: 'error',
            message: "没有访问权限、请登录后进行操作"
          });
        }
      }else if(response.data.resultCode==="FAILURE"){
        this.$message({
          type: 'error',
          message: response.data.resultMessage
        });
      } else {
        this.$message({
          type: 'error',
          message: response.data.resultMessage
        });
      }
    }
  };
  next();
});


function getV2RequestData(service_name, use_type) {
  return {
    serviceName: "srvsys_service_columnex_v2_select",
    colNames: ["*"],
    condition: [
      {
        colName: "service_name",
        value: service_name,
        ruleType: "eq"
      },
      {
        colName: "use_type",
        value: use_type,
        ruleType: "eq"
      }
    ],
    order: [
      {
        colName: "seq",
        orderType: "asc"
      }
    ]
  };
}

/**
 * 查询serviceCols, use an vuex cache here
 * @param service_name 服务名
 * @param use_type  
 * @returns {*}
 */
Vue.prototype.loadColsV2 = function (service_name, use_type) {
  let loadedP = this.doLoadColsV2(service_name, use_type);
  return loadedP;
};

Vue.prototype.doLoadColsV2 = function (service_name, use_type) {
  var data = getV2RequestData(service_name, use_type);

  var url = this.getServiceUrl("select", "srvsys_service_columnex_v2_select");
  url = url + "?colsel_v2=" + service_name;
  return this.$http.post(url, data).then(response => {
    //region mock data
    //endregion

    return response;
  });
};

// 请求url 处理
/**
 *
 * @param operate_type: operate | select
 * @param service  
 * @param app   
 * @param gateway 是否只返回网关地址，默认为true，不填为false
 * @returns {string}
 */
Vue.prototype.getServiceUrl = function (operate_type, service, app, gateway) {
  app = app || this.resolveDefaultSrvApp();
  if (gateway) {
    return backendIpAddr;
  } else {
    return backendIpAddr + "/" + app + "/" + operate_type + "/" + service;
  }
};



/**
 * resolve default srvapp from vue component
 * @returns {*}
 */
Vue.prototype.resolveDefaultSrvApp = function () {
  let app = null;
  // search $srvApp from node to root
  let node = this;
  while (!node.$srvApp) {
    if (node.$parent) {
      node = node.$parent;
    } else {
      break;
    }
  }

  if (node.$srvApp) {
    app = node.$srvApp;
  } else {
    // whole path does not have $srvApp,
    // try  page level
    if (this.$route && this.$route.query && this.$route.query.srvApp) {
      app = this.$route.query.srvApp;
    } else {
      // try top level
      let appFromIFrame =
        window.frameElement && window.frameElement.dataset["app"];
      let defaultApp =
        appFromIFrame ||
        (top.window.pathConfig && top.window.pathConfig.application);
      app = defaultApp;
    }
  }

  return app;
};

/**
 * 查询列表
 *
 * */
Vue.prototype.select = function (
  service_name,
  condition,
  page,
  order,
  group,
  mapcondition,
  app
) {
  var url = this.getServiceUrl("select", service_name, app);
  return this.doSelect(
    url,
    service_name,
    condition,
    page,
    order,
    group,
    mapcondition
  );
};

/**操作*/
Vue.prototype.operate = function (requests) {
  let service = requests.length > 0 ? requests[0].serviceName : "";
  let srvApp = requests[0].srvApp;
  var url = this.getServiceUrl("operate", service, srvApp);
  return this.$http.post(url, requests);
};

/**
 * 提交流程
 * @param requests
 * @returns {PromiseLike<HttpResponse>}
 */
Vue.prototype.apply = function (requests) {
  let service = requests.length > 0 ? requests[0].serviceName : "";
  let srvApp = requests[0].srvApp;
  var url = this.getServiceUrl("apply", service, srvApp);
  return this.$http.post(url, requests);
};

Vue.prototype.doSelect = function (
  url,
  service_name,
  condition,
  page,
  order,
  group,
  mapcondition
) {
  var params = {
    serviceName: service_name,
    colNames: ["*"],
    condition: condition || [],
    page: page,
    order: order
  };

  if (group) {
    params.group = group;
  }

  if (mapcondition != undefined && mapcondition != "" && mapcondition != null) {
    params["map_table_condtion"] = mapcondition;
  }
  url = url + "?" + service_name;
  return this.$http.post(url, params);
};

Vue.prototype.emitEvent = function (eventType, data) { };

// noinspection JSUnusedLocalSymbols
/**
 *
 * @param expr
 * @param data
 * @param vm
 * @returns {*}
 */
Vue.prototype.evalBxExpr = function (expr, data, vm, defaultValue) {
  try {
    let user = top.user;
    return eval(expr);
  } catch (e) {
    console.error("fail to eval expr:" + e.stack);
    return defaultValue || null;
  }
};
