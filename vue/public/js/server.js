//微服务地址
var pathConfig;
(function() {
  var obj = {};

  obj.gateway_protocol = "http";
  // obj.gateway_ip = "www.100xsys.cn";
  obj.gateway_ip = "39.98.203.134";
  // obj.gateway_ip = "113.200.255.90";
  // obj.port = "8101";
  obj.port = "8081";

  //网关地址
  obj.gateway =
    obj.gateway_protocol + "://" + obj.gateway_ip + ":" + obj.port + "";
  window.backendIpAddr = obj.gateway;

  obj.sso_app = "sso";
  var current_app = sessionStorage.getItem("current_app");
  if (current_app == null) {
    obj.application = "sqfw";
  } else {
    obj.application = current_app;
  }

  obj.app_path = obj.gateway + "/" + obj.application;

  top.window.pathConfig = obj;
  let loginUser = localStorage.getItem("current_login_user");
  if (loginUser) {
    top.user = JSON.parse(loginUser);
  }

})();
