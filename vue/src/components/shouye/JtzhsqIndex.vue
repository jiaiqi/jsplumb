/* eslint-disable no-unused-vars */
<template>
  <div class="home">
    <nav class="navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">样本预处理</a>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-xs-2 col-md-1 menu-left">
          <ul id="handle_tree" class="ztree"></ul>
        </div>
        <div class="col-xs-5 col-md-7">
          <div class="layout-center">
            <div id="work_panel" class="work_panel">
              <!-- controls -->
              <div class="controls">
                <i class="fa fa-home selected-mode" reset title="适应画布"></i>
                <i class="fa fa-search" realsize title="实际尺寸"></i>
                <i class="fa fa-search-plus" mode="up" title="放大"></i>
                <i class="fa fa-search-minus" mode="down" title="缩小"></i>
                <i class="fa fa-arrows" mode="pan" title="移动"></i>
                <i class="fa fa-pencil" mode="select" title="编辑选择"></i>
              </div>
              <!-- miniview -->
              <div class="miniview"></div>
            </div>
            <el-button
              class="el-button el-button--primary submit"
              type="primary"
              @click="sub()"
              >提交</el-button
            >
            <div id="guide-h" class="guide"></div>
            <div id="guide-v" class="guide"></div>
          </div>
        </div>
        <div class="col-xs-5 col-md-4">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active">
              <a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab"
                >参数设置</a
              >
            </li>
            <!-- <li role="presentation">
              <a href="#tab2" aria-controls="tab2" role="tab" data-toggle="tab"
                >执行调试</a
              >
            </!-->
          </ul>
          <div id="app">
            <el-row>
              <simple-add :service="serviceName" ref="addTest"> </simple-add>
            </el-row>
          </div>
          <!-- Tab panes -->
          <!-- <div id="app" v-cloak class="tab-content">

            <el-form v-if="colData.length > 0" :inline="true">
              <div
                class="form_only"
                v-for="(item, index) in colData"
                :key="index"
              >
                <el-form-item>
                  <label slot="label">
                    <span
                      v-if="item.verify_info.required == 'required'"
                      class="red_star"
                      >*</span
                    >
                    {{ item.label }}
                  </label>
 
                  <el-input
                    @blur="blurs(item)"
                    v-if="
                      item.bx_col_type == 'string' && item.col_type == 'String'
                    "
                    v-model="item.value"
                  ></el-input>
                  <el-input
                    @blur="blurs"
                    v-if="
                      item.bx_col_type == 'money' && item.col_type == 'Money'
                    "
                    v-model="item.value"
                  ></el-input>
                  <el-input
                    @blur="blurs(item)"
                    type="textarea"
                    v-if="
                      item.bx_col_type == 'mtext' &&
                        item.col_type == 'MultilineText'
                    "
                    v-model="item.value"
                  >
                  </el-input>
                  <el-radio-group
                    v-if="
                      item.bx_col_type == 'string' && item.col_type == 'Enum'
                    "
                    v-model="item.value"
                  >
                    <el-radio
                      @change="blurs(item)"
                      v-for="(eum, i) in item.option_list_v2"
                      :key="i"
                      :label="eum.label"
                    >
                      {{ eum.value }}</el-radio
                    >
                  </el-radio-group>
                  <el-input
                    @blur="blurs(item)"
                    v-if="item.bx_col_type == 'int' && item.col_type == 'int'"
                    v-model="item.value"
                  ></el-input>
                  <el-select
                    @change="blurs(item)"
                    v-if="item.bx_col_type == 'enum' && item.col_type == 'Enum'"
                    v-model="item.value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="a in item.option_list_v2"
                      :key="a.value"
                      :label="a.label"
                      :value="a.value"
                    >
                    </el-option>
                  </el-select>
                  <el-date-picker
                    @change="blurs(item)"
                    v-if="item.bx_col_type == 'date' && item.col_type == 'Date'"
                    v-model="item.value"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                  <el-date-picker
                    @change="blurs(item)"
                    v-if="
                      item.bx_col_type == 'DateRange' &&
                        item.col_type == 'DateRange'
                    "
                    v-model="item.value"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                  <el-date-picker
                    @change="blurs(item)"
                    v-if="
                      item.bx_col_type == 'string' &&
                        item.col_type == 'DateTime'
                    "
                    v-model="item.value"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
                <span
                  v-if="item.verify_info && item.verify_info.isShow"
                  class="hint"
                  >{{ item.verify_info.meg }}</span
                >
              </div>
            </el-form>
          </div> -->
        </div>
      </div>
    </div>

    <!-- <proc-detail
      v-if="!!procInstNo"
      :proc-instance-no-prop="procInstNo"
      :navigate-handler="onNavigate"
    ></proc-detail>
    <proc-detail
      v-else
      :serviceProp="serviceName"
      :navigate-handler="onNavigate"
    ></proc-detail> -->
    <div id="node_template" style="display:none;">
      <div
        align="center"
        id="${nodeId}"
        name="${name}"
        class="pane-node-content"
        style="position:absolute;display: flex;align-items: center;"
      >
        <div class="task_right"></div>

        <div class="right">
          <span class="bt">${text}</span>
          <span class="status ico-warning-o"></span>
        </div>
        <div class="left"><span class="iconfont ${icon}">x</span></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery'
import axios from 'axios'
// import { zNodes } from '@/assets/js/ztree.util.js'

var mainData = []
export default {
  name: 'home',
  components: {},
  data () {
    return {
      a: 1,
      serviceName: "srvzhsq_organizie_member_add",
      procInstNo: '2019072609413142910000',
      colOriData: [],
      colData: [],
      currentId: '',
      currentNode: null
    }
  },
  methods: {
    sub () {
      let xx = this.$refs.addTest.srvValFormModel()
      this.$refs.addTest.validateForm().then((result) => {
        console.log('result', result)
      }).catch((err) => {
        console.log('err', err)
      });
      console.log('xx', xx)
    },
    onNavigate (eventType, procInstanceNo) {
      this.$router.push({
        name: "procdetail",
        params: { proc_instance_no: procInstanceNo }
      });
      window.location.reload(true);
    },
    blurs (item) {
      console.log("this.currentId", this.currentId, requiredColData)

      // if (JSON.stringify(item.verify_info) !== "{}") {
      //   if (item.col_value == undefined || item.col_value === "") {
      //     this.isShow = true;
      //   } else {
      //     this.isShow = false;
      //   }
      // }
      // console.log(item)
      // console.log($(`#${this.currentId}`))

      // $(`#${this.currentId}`).css({
      //   border:'1px solid #289D3F' 
      // })
      // $(`#${this.currentId}`).children('.left').children('.iconfont').css({
      //   backgroundColor:"#289D3F"
      // })
      // console.log($(`#${this.currentId}`).children('.left').children('.iconfont'))
      if (item.columns === "deptno") {
        console.log($(`#${this.currentId}`).children('.right').children('.bt').html())
        if (item.value != "") {
          $(`#${this.currentId}`).children('.right').children('.bt').html(item.value)
          mainData.forEach(only => {
            if (only.instance_no === this.currentId) {
              only.title = item.value
            }
          })
          console.log("修改标题：", mainData)
        }

      }
      this.save(item)
    },
    save (cols) {
      console.log("currentId", this.currentId)
      let colObj = {}
      let hasMust = false
      // this.colData.forEach(cols=>{

      if (JSON.stringify(cols.verify_info) != "{}" && cols.verify_info.required == 'required' && cols.value == "") {
        // this.isShow = true
        cols.verify_info.isShow = true
        hasMust = true
      }
      if (JSON.stringify(cols.verify_info) != "{}" && cols.verify_info.required == 'required' && cols.value != "") {
        cols.verify_info.isShow = false
        hasMust = false
      }
      // })
      if (hasMust === false) {
        this.colData.forEach(colname => {
          colObj[ colname.columns ] = colname.value
        })
        mainData.forEach(curr => {
          if (this.currentId === curr.instance_no) {
            curr.form.data = colObj
            console.log('save:----', curr)
          }
        })
        let hasRequire = false

        for (keys in colObj) {
          if (requiredColData.indexOf(keys) >= 0 && colObj[ keys ] == "") {
            hasRequire = true
          }
          // if(colObj[keys]){
          //   $(`#${this.currentId}`).css({
          //     border:'1px solid #289D3F' 
          //   })
          //   $(`#${this.currentId}`).children('.left').children('.iconfont').css({
          //     backgroundColor:"#289D3F"
          //   })
          //   break
          // }
        }
        if (hasRequire) {
          mainData.forEach(currs => {
            if (this.currentId === currs.instance_no) {
              currs.isFin = false
              // console.log('save:----',curr)
            }
          })
          // curr.isFin = false
          $(`#${this.currentId}`).css({
            border: '1px solid red'
          })
          $(`#${this.currentId}`).children('.left').children('.iconfont').css({
            backgroundColor: "red"
          })
        } else {
          mainData.forEach(currs => {
            if (this.currentId === currs.instance_no) {
              currs.isFin = true
              // console.log('save:----',curr)
            }
          })
          $(`#${this.currentId}`).css({
            border: '1px solid #289D3F'
          })
          $(`#${this.currentId}`).children('.left').children('.iconfont').css({
            backgroundColor: "#289D3F"
          })
        }
      }

    },
    getCol (serviceName, type, id, activeNode) {
      this.currentId = id
      let self = this
      let cond = {
        serviceName: "srvsys_service_columnex_v2_select",
        colNames: [ "*" ],
        condition: [
          {
            colName: "service_name",
            ruleType: "eq",
            value: serviceName
          },
          {
            colName: "use_type",
            ruleType: "eq",
            value: type
          }
        ],
      }
      let htp = null
      if (top.pathConfig) {
        htp = top.pathConfig.gateway
      } else {
        htp = "http://39.98.203.134:8081"
      }

      axios.post(`${htp}/sqfw/select/srvsys_service_columnex_v2_select?colsel_v2=` + serviceName, cond).then(res => {
        let colOriData = res.data.data.srv_cols
        this.colOriData = colOriData.filter(item => {
          // return item["in_add"] === 1;
          return item[ 'in_' + type ] === 1;
        });
        self.colOriData.forEach(ori => {
          ori[ 'value' ] = ""
          ori[ "verify_info" ] = {};
          ori[ '_isShow' ] = true
          ori[ '_xif' ] = ""
          if (ori.x_if) {
            ori[ '_xif' ] = ori.x_if
          }
          let verify = {
            required: "1",
            meg: "1"
          };
          if (
            ori.validators &&
            ori.validators.indexOf("required") >= 0
          ) {
            requiredColData.push(ori.columns)
            let mesge = null
            if (ori.validators_message) {
              mesge = ori.validators_message.split("=");
              mesge = mesge[ 1 ];
            }

            if (mesge === null) {
              verify = {
                required: "required",
                meg: "此项为必填项",
                isShow: false
              };
            } else {
              verify = {
                required: "required",
                meg: mesge,
                isShow: false
              };
            }

            ori.verify_info = verify;
          }
          // ori.verify_info = verify;
        })
        console.log('必填字段-----', requiredColData)
        self.colData = self.deepCopy(self.colOriData)
        console.log('this.colData', self.colData, 'this.colOriData', self.colOriData)
        if (JSON.stringify(activeNode) != "{}") {
          for (let h = 0; h < self.colData.length; h++) {
            for (o in activeNode) {
              if (self.colData[ h ].columns == o) {
                self.colData[ h ].value = activeNode[ o ]
              }
            }
          }
        }
      })

    },
    /**
* 深拷贝
* @param {*} obj 拷贝对象(object or array)
* @param {*} cache 缓存数组
*/
    deepCopy (obj, cache = []) {
      let self = this;
      // typeof [] => 'object'
      // typeof {} => 'object'
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
      /**
       * 类似下面这种
       * var a = {b:1}
       * a.c = a
       * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
       */
      const hit = cache.filter(c => c.original === obj)[ 0 ];
      if (hit) {
        return hit.copy;
      }

      const copy = Array.isArray(obj) ? [] : {};
      // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
      cache.push({
        original: obj,
        copy
      });
      Object.keys(obj).forEach(key => {
        copy[ key ] = self.deepCopy(obj[ key ], cache);
      });

      return copy;
    }
  },
  mounted () {
    window.getCol = this.getCol
  }
}
function getUpdateData () {
  let cond = {
    serviceName: serviceName,
    colNames: [ "*" ],
    condition: [
      {
        colName: "id",
        ruleType: "eq",
        value: ids
      }
    ],
  }
  let htp = null
  if (top.pathConfig) {
    htp = top.pathConfig.gateway
  } else {
    htp = "http://39.98.203.134:8081"
  }

  axios.post(`${htp}/sqfw/select/${serviceName}`, cond).then(res => {
    if (res.data.data) {
      $('.title_text').html(res.data.data[ 0 ].instance_name)
      let resData = res.data.data[ 0 ].design_data

    }
  })
}
function getLeftDesign (serviceName) {
  let cond = {
    serviceName: serviceName,
    colNames: [ "*" ],
    condition: [],
  }
  let htp = null
  if (top.pathConfig) {
    htp = top.pathConfig.gateway
  } else {
    htp = "http://39.98.203.134:8081"
  }

  axios.post(`${htp}/sqfw/select/${serviceName}`, cond).then(res => {
    if (res.data.data) {
      $('.title_text').html(res.data.data[ 0 ].instance_name)
      let resData = res.data.data[ 0 ].design_data

    }
  })
}
function getQueryVariable (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[ i ].split("=");
    if (pair[ 0 ] == variable) { return pair[ 1 ]; }
  }
  return (false);
}
let pageType = getQueryVariable("pageType")
let ids = getQueryVariable("id")
let serviceName = getQueryVariable("service")
console.log('pageType---', pageType)
var mainData = []
if (pageType === 'add') {
  mainData = []
  // getLeftDesign(serviceName)
}
if (pageType === 'update') {
  // getLeftDesign(serviceName)
  mainData = [
    // 	{
    // 	id: 'node1',
    // 	title: '存储过程1',
    // 	position: {
    // 		x: 80,
    // 		y: 20
    // 	},
    // 	lineData: [{
    // 		to: 'node2',
    // 		from: null
    // 	}, {
    // 		to: 'node3',
    // 		from: null
    // 	}]
    // }, {
    // 	id: 'node2',
    // 	title: 'SQL脚本',
    // 	position: {
    // 		x: 180,
    // 		y: 180
    // 	},
    // 	lineData: [{
    // 		to: 'node3',
    // 		from: 'node1'
    // 	}]
    // },
    {
      comp_no: "work_start",
      instance_no: "node1",
      title: "存储过程1",
      x_pos: -370,
      y_pos: 265,
      in_instance_no: [], //被xxx连接
      in_comp: [],//能被xxx连接
      isFin: false,
      icon: "../jsplumb/css/img/start.png",
      form: {
        srv: {
          add_srv: "srvzhsq_dept_add",
          update_srv: "srvzhsq_dept_update"
        },
        // col 使用通用v2查询
        data: {

          // name: "yyy"
        }
      }
    },
    {
      comp_no: "work_task",
      instance_no: "node2",
      title: "存储过程2",
      x_pos: -396,
      y_pos: 75,
      isFin: false,
      in_instance_no: [ "node1" ], //被xxx连接
      in_comp: [],
      icon: '../jsplumb/css/img/task.png',
      form: {
        srv: {
          add_srv: "srvzhsq_information_add",
          update_srv: "srvzhsq_information_update"
        },
        // col 使用通用v2查询
        data: {
          // name: "yyy"
        }
      }
    }
  ];
  // mainData.forEach(only=>{
  //   only['']
  // })
}


$(function () {
  var h = $(window).height() - $(".navbar-inverse").height();
  $(".menu-left,.layout-center,.work_panel,.menu-right").height(h);
  $('.submit').click(() => {
    console.log(mainData)
    let parentMin = true
    let childMin = true


    for (let i = 0; i < zNodes.length; i++) {
      let parentMinNums = zNodes[ i ].limit_comp
      let childAppear = []
      for (let j = 0; j < zNodes[ i ].children.length; j++) {
        let a = 0
        let isHas = false
        if (mainData.length > 0) {
          for (let o = 0; o < mainData.length; o++) {
            if (mainData[ o ].comp_no === zNodes[ i ].children[ j ].comp_no) {
              isHas = true
            }
          }
          if (isHas) {
            for (let k = 0; k < mainData.length; k++) {
              if (zNodes[ i ].children[ j ].comp_no === mainData[ k ].comp_no) {
                a++
                if (a < zNodes[ i ].children[ j ].amount_limit) {
                  childMin = false
                  alert(zNodes[ i ].children[ j ].name + "节点不得少于" + zNodes[ i ].children[ j ].amount_limit + "个")
                }
              }
            }
            childAppear.push(a)
          } else {
            childAppear.push(a)
            if (zNodes[ i ].children[ j ].amount_limit > 0) {
              childMin = false
              alert(zNodes[ i ].children[ j ].name + "节点不得少于" + zNodes[ i ].children[ j ].amount_limit + "个")
            }
          }
        }


        //链接数量限制

      }
      if (childAppear.length > 0) {
        let childAppearSum = childAppear.reduce(function (prev, next, index) {
          return prev + next
        })
        if (childAppearSum >= parentMinNums) {
          parentMin = true
        } else {
          parentMin = false
          alert(zNodes[ i ].name + "节点不得少于" + parentMinNums + "个")
        }
        console.log("childAppear", zNodes[ i ].name, childAppear, childAppearSum)

      }


    }
    if (mainData.length === 0) {
      childMin = false
      alert("没有可提交数据")
    }


    // for (let b = 0; b < array.length; b++) {
    //   const element = array[b];

    // }
    if (parentMin && childMin) {
      let isOk = true
      mainData.forEach(m => {
        // m.form = m.form.data
        if (!m.isFin) {
          isOk = false
        }
      })
      if (isOk) {
        let endData = []
        let endDataObj = {}
        if ($('.title_text').html() == "") {
          alert("标题不能为空")
        } else {
          endDataObj[ 'instance_name' ] = $('.title_text').html()
          endDataObj[ 'design_data' ] = mainData

          console.log(endDataObj)
        }

      } else {
        alert('信息未完善')
      }
    }
  })
  $(".title").blur(function () {
    let titles = $(this).val()
    if (titles == "") {
    } else {
      $(this).css({
        display: "none"
      })
      $('.title_text').html(titles)
      $('.title_text').css({
        display: "block"
      })
      $('.title_icon').css({
        display: 'block'
      })
    }
  });
  $(".title_icon").click(function () {
    let Tit = $('.title_text').html()
    $('.title_text').css({
      display: "none"
    })
    $('.title_icon').css({
      display: 'none'
    })
    $(".title").css({
      display: 'block'
    })
    $(".title").val(Tit)
  })
});

/**-----------------*/
window.onload = function () {
  setTimeout(() => {
    let addNode = window.addJsplumbNode;
    let addPorts = window.addJsplumbPort;
    // window.getCol("srvzhsq_dept_add",'add')

    mainData.forEach(item => {
      let positionObj = {
        x: item.x_pos,
        y: item.y_pos
      };
      let nodes = addNode(item.instance_no, item.title, positionObj, item.icon);
      console.log("nodes==" + item.instance_no, nodes);
      addPorts(nodes, [ "out" ]);
    });
    let instance = window.jsp;
    console.log("instance=====", window);
    for (let i = 0; i < mainData.length; i++) {
      for (let j = 0; j < mainData[ i ].in_instance_no.length; j++) {
        if (mainData[ i ].in_instance_no[ j ].length > 0) {
          instance.connect({
            uuids: [
              `${mainData[ i ].in_instance_no[ j ]}-out`,
              `${mainData[ i ].instance_no}-out`
            ],
            editable: true
          });
        }
      }
    }

    // console.log('instance-----end----', instance, instance.getContainer(), window)
    // for (let i = 0; i < mainData.length; i++) {

    // }
    // console.log("window", sourceEndpoint)
  }, 0);
};

/** ------------------------------  */
var core = {};

core.relative_w = 75;
core.relative_h = 14;
core.$tree_node_elm_source = null; //点击后树节点源元素
core.$tree_node_dragging_elm = null; //点击后树节点拖拽元素
core.work_panel_scope = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0
}; //容器面板角定位
/** 鼠标放开所在范围是否有效 **/
core.checkDropScope = function (event) {
  if (
    event.clientX > core.work_panel_scope.x1 &&
    event.clientX < core.work_panel_scope.x2 &&
    event.clientY > core.work_panel_scope.y1 &&
    event.clientY < core.work_panel_scope.y2
  ) {
    return true;
  }
  return false;
};

//辅助对齐 - 动态创建的对齐参照
window.ref_node_elm = null;
//辅助对齐 - 源算法组件
window.ref_node_elm_source = null;

$(function () {
  var childCompNo = null; //child的comp_no
  let currtAdd = null; //当前拖动parent 的数据
  $(".ztree a").hover(
    function (event) {
      if (
        $(this)
          .parent("li")
          .has("ul")[ 0 ]
      ) {
        return false;
      }
      $(this).addClass("ztree-node-a-hover");
      return false;
    },
    function (event) {
      $(this).removeClass("ztree-node-a-hover");
      return false;
    }
  );

  /** 树节点上鼠标点击事件 **/
  $(".ztree a").bind("mousedown", function (event, treeId, treeNode) {
    if (
      $(this)
        .parent("li")
        .has("ul")[ 0 ]
    ) {
      return false;
    }
    // let domDataTitle = $(this).children('node_name').context.innerText
    let domParentDataTitle = $(this)
      .parent()
      .parent()
      .prev()[ "0" ].innerText;
    let domChildDataTitle = $(this).children("node_name").context.innerText;

    let domData = {};
    console.log("treeNode", domParentDataTitle, domChildDataTitle);
    zNodes.forEach(item => {
      if (domParentDataTitle === item.name) {
        item.children.forEach(child => {
          if (domChildDataTitle === child.name) {
            childCompNo = child.comp_no;
            currtAdd = child;
          }
        });
      }
    });
    console.log("currtAdd", currtAdd);
    //拖拽模板的生成
    var template = $("#node_template").html();
    console.log("template", template);
    template = template
      .replace(/\$\{nodeId\}/g, "tempnode11")
      .replace(/\$\{icon\}/g, "ico-click");
    template = template.replace(
      /\$\{text\}/g,
      $(this)
        .find(".node_name")
        .text()
    );

    var nd = $(template);
    console.log(nd);
    nd.css({
      left: event.clientX - core.relative_w,
      top: event.clientY - core.relative_h
    });
    $("body").append(nd);
    core.$tree_node_dragging_elm = nd; //鼠标点击创建树节点拖拽元素
    core.$tree_node_elm_source = $(event.target).parent(); ////鼠标点击创建树节点源元素

    //容器面板左上角、右下角
    core.work_panel_scope.x1 = $("#work_panel").offset().left;
    core.work_panel_scope.x2 =
      $("#work_panel").offset().left + $("#work_panel").width();
    core.work_panel_scope.y1 = $("#work_panel").offset().top;
    core.work_panel_scope.y2 =
      $("#work_panel").offset().top + $("#work_panel").height();
  });

  /** 容器上的元素鼠标点击事件 **/
  var currNode = null
  var clickTimeId = null
  $(document).on("mousedown", ".draggable", function (event) {
    // clearTimeout(clickTimeId);
    //执行延时
    if (event.button != 0) {
      return false;
    }
    let currentId = event.currentTarget.id;

    console.log("按下event", event, currentId);
    mainData.forEach(downonly => {
      if (downonly.instance_no === currentId) {
        currNode = downonly
        console.log('当前按下元素:', currNode)
        // window.getCol(downonly.form.srv.add_srv, 'add')
      }
    })
    // let a = window.getAllConnections()
    // console.log('a----', window.jsp.remove('node1'))
    window.ref_node_elm_source = this;

    draggable.addRefNode();

    draggable.start(event);

  });
  $(document).on("dblclick", ".draggable", function (event) {
    if (event.button != 0) {
      return false;
    }
    // let currentId = event.currentTarget.id;

    console.log("双击", currNode);
    // mainData.forEach(downonly => {
    //   if (downonly.instance_no === currentId) {
    //     console.log('当前按下元素:', downonly, window)
    // if(JSON.stringify(currNode.form.data)!= "{}"){

    window.getCol(currNode.form.srv.add_srv, 'add', currNode.instance_no, currNode.form.data)
    // }else{
    //   window.getCol(currNode.form.srv.add_srv, 'add', currNode.instance_no,false)
    // }


    //   }
    // })
    // let a = window.getAllConnections()
    // console.log('a----', window.jsp.remove('node1'))
    // window.ref_node_elm_source = this;

    // draggable.addRefNode();

    // draggable.start(event);
  });
  $(document).on("mousedown", ".ico-click", function (event) {
    event.stopPropagation();
    let currtId = $(this)
      .parent()
      .parent()[ "0" ].id;
    if (window.confirm("确认删除吗？")) {
      window.jsp.remove(currtId);
      for (let j = 0; j < mainData.length; j++) {
        if (mainData[ j ].instance_no === currtId) {
          if (mainData[ j ].in_instance_no.length > 0) {
            for (let k = 0; k < mainData[ j ].in_instance_no.length; k++) {
              if (mainData[ j ].in_instance_no[ k ] === currtId) {
                mainData[ j ].in_instance_no.splice(k, 1);
              }
            }
          }
          mainData.splice(j, 1);
          console.log(mainData);
        }
      }
    }
  });
  /** 鼠标移动事件 **/
  $(document).mousemove(function (event) {
    if (window.ref_node_elm) {
      // debugger
      //所在范围内拖动移动鼠标
      var ui = {
        position: {}
      };
      currNode.x_pos = event.clientX - core.relative_w
      currNode.y_pos = event.clientY - core.relative_h
      ui.position.top = $(window.ref_node_elm).position().top;
      ui.position.left = $(window.ref_node_elm).position().left;
      console.log('ui.position.top:', ui.position.top, 'ui.position.left:', ui.position.left)
      draggable.drag(event, ui);
      // console.log('--------', $(`#${currNode.instance_no}`).css('left'))

    } else if (core.$tree_node_dragging_elm) {
      if (core.$tree_node_dragging_elm.is(":animated")) {
        return false;
      }
      core.$tree_node_dragging_elm.css({
        left: event.clientX - core.relative_w,
        top: event.clientY - core.relative_h
      });
      // console.log('============', $(`#${currNode.instance_no}`).css('left'))

    }
  });

  /** 鼠标释放事件 **/
  $(document).mouseup(function (event) {
    if (window.ref_node_elm) {
      //所在范围内拖动释放鼠标
      draggable.stop();
      $(window.ref_node_elm).remove();
      window.ref_node_elm = null;
      window.ref_node_elm_source = null;
    } else if (core.$tree_node_dragging_elm) {
      //鼠标放开所在范围是否有效
      if (core.checkDropScope(event)) {
        //alert("位置有效");
        core.$tree_node_dragging_elm.remove();
        core.$tree_node_dragging_elm = null;

        //做添加时的判断

        console.log("currtAdd", currtAdd);
        let minDataNum = currtAdd.limit_comp;
        let a = 0;

        if (currtAdd.is_unique) {
          mainData.forEach(all => {
            if (all.comp_no === currtAdd.comp_no) {
              a++;
              ;
              alert("有且只有一个");
            }
          });
        }
        if (a === 0) {
          var x =
            event.pageX -
            $(".menu-left").width() -
            $(".jtk-surface-canvas").position().left -
            core.relative_w;
          var y =
            event.pageY -
            $(".menu-left").offset().top -
            $(".jtk-surface-canvas").position().top -
            core.relative_h;
          var uid = jsPlumbUtil.uuid().replace(/\-/g, "");
          var node = window.addJsplumbNode(
            uid,
            core.$tree_node_elm_source.find(".node_name").text(), {
            x: x,
            y: y
          },
            currtAdd.icon
          );
          let nodeObj = {
            comp_no: childCompNo,
            instance_no: uid,
            title: core.$tree_node_elm_source.find(".node_name").text(),
            x_pos: x,
            y_pos: y,
            in_instance_no: [],
            in_comp: currtAdd.in_comp,
            icon: currtAdd.icon,
            isUpdate: false,
            form: {
              srv: {
                add_srv: "srvetl_start_add",
                update_srv: "srvetl_start_update"
              },
              // col 使用通用v2查询
              data: {
                // name: "yyy"
              }
            }
          };
          mainData.push(nodeObj);
          console.log(1111);
          window.addJsplumbPort(node, [ "out" ]);
        }

        console.log("mainData-------", mainData);
      } else {
        //alert("位置无效");
        //重新归置源节点所处的位置,并且删除消失
        core.$tree_node_dragging_elm.animate({
          left: core.$tree_node_elm_source.offset().left,
          top: core.$tree_node_elm_source.offset().top
        },
          400,
          function () {
            core.$tree_node_dragging_elm.remove();
            core.$tree_node_dragging_elm = null;
          }
        );
      }
    }
  });
});
/**---------------------------------------- */
</script>

<style lang="scss">
.layout-center {
  position: relative;
}
</style>