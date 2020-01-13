<template>
  <div class="more_wrap">
    <first-header></first-header>
    <second-header  activePage="首页"></second-header>
    <div class="cen">
      <div class="cen_left">
        <div class="title">
          <ul class="menu">
            <li
              @click="change(item,index)"
              :class="{highLight:index==ActisHighLight}"
              v-for="(item,index) in businessType"
              :key="index"
            >{{ item.menu_name }}</li>
          </ul>
        </div>
      </div>
      <div class="cen_right">
        <div class="cen_right_top">
          <news-list :newslist="lists" :link-url-func="sqgg"></news-list>
        </div>

        <div class="cen_right_bot">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="changePage"
            :current-page="page.pageNo"
            :page-size="page.rownumber"
            :total="page.total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div-ision></div-ision>
    <foo-ter></foo-ter>
  </div>
</template>
<script>
import FirstHeader from "@/components/shequ/FirstHeader";
import SecondHeader from "@/components/shequ/SecondHeader";
import NewsList from "@/components/shequ/NewsList";
import DivIsion from "@/components/shequ/DivIsion";
import FooTer from "@/components/shequ/FooTer";
export default {
  name: "More",
  components: {
    FirstHeader,
    SecondHeader,
    NewsList,
    DivIsion,
    FooTer
  },
  data() {
    return {
      ActisHighLight: 0,
      lists: [],
      businessType: [
        {
          menu_name: "金台区公告",
          menu_service: "srvzhsq_gsgg_select",
          type: "zhdj"
        },
        {
          menu_name: "社区公告",
          menu_service: "srvzhsq_notice_select",
          type: "sqfw"
        },
        {
          menu_name: "社区公示",
          menu_service: "srvzhsq_notice_public_select",
          type: "sqfw"
        }
      ],
      page: {
        total: 0,
        pageNo: 1,
        rownumber: 7
      },
      service2: ""
    };
  },
  computed: {},
  watch: {
    queryFor2ndList(newval, oldval) {
      this.load2ndList(newval);
    }
  },
  methods: {
    change(item, index) {
      this.ActisHighLight = index;
      this.page.pageNo = 1;
      if (item.menu_name == "金台区公告") {
        this.service2 = "srvzhsq_gsgg_select";
        this.select(
          this.service2,
          [],
          this.page,
          null,
          null,
          null,
          this.businessType[index].type
        ).then(resp => {
          if (resp.data.data.length > 0) {
            let a = resp.data.data;
            let aginlist = [];
            for (let i = 0; i < a.length; i++) {
              aginlist[i] = {};
              aginlist[i]["activity_title"] = a[i].bt;
              aginlist[i]["create_time"] = a[i].create_time;
              aginlist[i]["id"] = a[i].id;
            }
            this.lists = aginlist;
            this.page = resp.body.page;
            // console.log("me",this.page)
          }
        });
      } else if (item.menu_name == "社区公告") {
        this.service2 = "srvzhsq_notice_select";
        this.select(
          this.service2,
          [],
          this.page,
          null,
          null,
          null,
          this.businessType[index].type
        ).then(resp => {
          if (resp.data.data.length > 0) {
            // console.log(resp)
            let a = resp.data.data;
            let aginlist = [];
            for (let i = 0; i < a.length; i++) {
              aginlist[i] = {};
              aginlist[i]["activity_title"] = a[i].title;
              aginlist[i]["create_time"] = a[i].notice_date;
              aginlist[i]["id"] = a[i].id;
            }
            this.page = resp.body.page;
            this.lists = aginlist;
            //  console.log("me2",this.page)
          }
        });
      } else if (item.menu_name == "社区公示") {
        this.service2 = "srvzhsq_notice_public_select";
        this.select(
          this.service2,
          [],
          this.page,
          null,
          null,
          null,
          this.businessType[index].type
        ).then(resp => {
          if (resp.data.data.length > 0) {
            // console.log(resp)
            let a = resp.data.data;
            let aginlist = [];
            for (let i = 0; i < a.length; i++) {
              aginlist[i] = {};
              aginlist[i]["activity_title"] = a[i].title;
              aginlist[i]["create_time"] = a[i].notice_date;
              aginlist[i]["id"] = a[i].id;
            }
            this.page = resp.body.page;
            this.lists = aginlist;
            //  console.log("me3",this.page)
          }
        });
      }
    },
    sqgg(item) {
      if (this.service2 == "srvzhsq_gsgg_select") {
        return (
          "xxfb_index.html#/detail/" +
          this.service2 +
          "/" +
          item.id +
          "/zhdj?no=id&title=bt&origin=lx&content=nr"
        );
      } else {
        return (
          "xxfb_index.html#/detail/" +
          this.service2 +
          "/" +
          item.id +
          "/sqfw?no=id&title=title&origin=ly"
        );
      }
    },
    load2ndList() {
      if (this.service2 == "srvzhsq_gsgg_select") {
        this.select(
          this.service2,
          [],
          this.page,
          null,
          null,
          null,
          "zhdj"
        ).then(resp => {
          resp.data && (this.lists = resp.data.data);
          let a = resp.data.data;
          let aginlist = [];
          for (let i = 0; i < a.length; i++) {
            aginlist[i] = {};
            aginlist[i]["activity_title"] = a[i].bt;
            aginlist[i]["create_time"] = a[i].create_time;
            aginlist[i]["id"] = a[i].id;
          }
          this.lists = aginlist;
          this.page = resp.body.page;
          //   console.log("fir",this.page)
        });
      } else {
        this.select(
          this.service2,
          [],
          this.page,
          null,
          null,
          null,
          "sqfw"
        ).then(resp => {
          resp.data && (this.lists = resp.data.data);
          let a = resp.data.data;
          let aginlist = [];
          for (let i = 0; i < a.length; i++) {
            aginlist[i] = {};
            aginlist[i]["activity_title"] = a[i].title;
            aginlist[i]["create_time"] = a[i].notice_date;
            aginlist[i]["id"] = a[i].id;
          }
          this.lists = aginlist;
          this.page = resp.body.page;
          //   console.log("sec",this.page)
        });
      }
    },
    changePage(val) {
      this.page.pageNo = val;
      // console.log("pp",this.page.pageNo)
      // this.load2ndList(this.queryFor2ndList)
      this.load2ndList();
    }
  },
  mounted() {
    // 更多公告---金台区公告查询
    this.service2 = "srvzhsq_gsgg_select";
    this.select(this.service2, [], this.page, null, null, null, "zhdj").then(
      resp => {
        if (resp.data.data.length > 0) {
          let a = resp.data.data;
          let aginlist = [];
          for (let i = 0; i < a.length; i++) {
            aginlist[i] = {};
            aginlist[i]["activity_title"] = a[i].bt;
            aginlist[i]["create_time"] = a[i].create_time;
            aginlist[i]["id"] = a[i].id;
          }
          this.lists = aginlist;
          this.page = resp.body.page;
          // console.log("page",this.page)
        }
      }
    );
  }
};
</script>
<style  scoped>
.highLight {
  background-color: #c4c3c3;
}
.cen_1 {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
}
.cen_1 p {
  font-size: 15px;
  margin: 10px auto;
}
.cen {
  /* width: 60%; */
  width: 1200px;
  /* min-height: 400px; */
  height: 400px;
  margin: 20px auto 20px;
  border: 1px solid black;
}
.cen_left {
  width: 20%;
  height: 90%;
  float: left;
  margin: 20px 0;
  /* background-color: grey; */
}
.title {
  width: 100%;
  display: flex;
  height: 20%;
  flex-direction: column;
  align-items: center;
}
.menu {
  display: block;
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  width: 120px;
  height: 40px;
  /* background: #f19b7c; */
  border-radius: 10px;
  line-height: 40px;
  margin-top: 10px;
  text-indent: 10px;
  cursor: pointer;
  /* &:hover{
          background-color: #f19b7c;
          color:rgb(219, 45, 45);
        } */
}
.menu li {
  border: 1px solid #dcdfe6;
}
.cen_right {
  width: 70%;
  height: 90%;
  float: right;
  margin-right: 2%;
  margin-top: 2%;
  /* background-color: rgb(231, 101, 101); */
}
.cen_right_top {
  width: 100%;
  height: 80%;
  /* background-color: grey; */
}
.cen_right_bot {
  width: 20%;
  height: 15%;
  margin: 0 auto 20px;
  /* background-color: grey; */
}
.more_wrap {
  width: 100%;
}
</style>


