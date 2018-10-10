<template>

  <div>
    <div>
      <sticky :className="'sub-navbar'">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->

        <!--<SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">转交
        </el-button>
        <!--<el-button v-loading="loading" type="warning" @click="handleModifyStatus">关闭</el-button>-->
        <!--<el-button v-loading="loading" type="warning" @click="draftForm">删除</el-button>-->
      </sticky>
    </div>
    <div class="components-container">
    <code style="text-align: center">{{ article.title }}</code>

    <el-card class="box-card" style="background-color: #8cbda4">
      <el-row>
        <el-col :span="5">
        <span>类型: {{ article.selectclass }}</span>
        </el-col>
        <el-col :span="5">
        <span>平台：{{ article.selectoses }}</span>
        </el-col>
        <el-col :span="5">
        <span>版本：{{ article.appversion }}</span>
        </el-col>
      </el-row>

    </el-card>

    <!--<code>{{$t('components.backToTopTips2')}}</code>-->
    <div id="tinymcecontent"  class="placeholder-container" v-html="article.content">
    </div>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->

      <div v-for="cc in article.comment" style="margin-bottom: 5px">
        <el-card class="box-card">
        <div >{{ cc.date | parseTime('{y}-{m}-{d} {h}:{i}') }}由{{ cc.name }}转交给{{ cc.users }}</div>
          <div>转交原因：</div>
          <div>{{ cc.info }}</div>
        </el-card>
      </div>


    <!--<el-tooltip placement="top" content="tooltip">-->
      <!--<back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>-->
    <!--</el-tooltip>-->
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <!--<el-form-item :label="$t('table.type')" prop="type">-->
        <!--<el-select class="filter-item" v-model="temp.type" placeholder="Please select">-->
        <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.date')" prop="timestamp">-->
        <!--<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">-->
        <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('table.title')" prop="title">-->
        <!--<el-input v-model="temp.title"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item :label="$t('table.status')">
          <el-select class="filter-item" v-model="article.status" placeholder="Please select">
            <el-option v-for="(item, index) in  statusOptions" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='5'></el-rate>-->
        <!--</el-form-item>-->
        <el-form-item style="margin-bottom: 40px;" label="任务给：">
          <el-select
            v-model="temp.selectusers"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择指定的用户">
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.reason')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>-->
        <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import BackToTop from '@/components/BackToTop'
import { showArticle, updateArticle } from '@/api/article'
import { getusers } from '@/api/createarticle'
import { getstatuslist } from '@/api/bugs'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getProject } from '@/utils/auth'

export default {
  name: 'backToTop-demo',
  components: { Sticky },
  data() {
    return {
      users: [],
      loading: false,
      article: {},
      statusOptions: [],
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: '',
      temp: {
        id: undefined,
        // importance: 1,
        remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        status: '新建',
        selectusers: []
        // status: 'published'
      },
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.create()
    this.getspuser()
    this.getstatus()
  },
  activated() {
    this.getstatus()
    this.getstatus()
  },
  methods: {
    getstatus() {
      getstatuslist().then(response => {
        const tmp = response.data
        this.statusOptions = tmp
        // const sl = tmp.length
        // for (let i = 0; i < sl; i++) {
        //   const aa = {}
        //   aa.value = tmp[i]
        //   aa.label = tmp[i]
        //   this.statusOptions.push(aa)
        // }
      })
    },
    draftForm() {
      console.log(11)
    },
    submitForm() {
      this.temp.id = this.article.id // copy obj
      // this.info.id = row.id // copy obj
      // this.info.
      // console.log(this.info)
      // getthistask(this.info).then(response => {
      //   console.log(response.data)
      // })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    getspuser() {
      getusers(getProject()).then(response => {
        const arr = response.data

        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i].nickname + '(' + arr[i].realname + ')'
          aa.label = arr[i].nickname + '(' + arr[i].realname + ')'
          this.users.push(aa)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    create() {
      const url = window.location.href
      const ul = url.split('/')
      const id = ul[ul.length - 1]
      if (id % 1 === 0) {
        console.log(id)
        showArticle(id).then(response => {
          console.log(response.data)
          this.article = response.data
        })
      }
    },
    updateData() {
      console.log(this.temp)
      var data = this.temp
      const tl = this.temp.selectusers.length
      console.log(tl)
      for (let i = 0; i < tl; i++) {
        data.selectusers[i] = this.temp.selectusers[i].split('(')[0]
      }
      console.log(data)
      updateArticle(this.temp).then(response => {
        if (response.data === 'ok') {
          // this.list = this.list.filter(item => {
          //   return item.id !== this.temp.id
          // })
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
        this.dialogFormVisible = false
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;
          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
</style>
<style>
  #tinymcecontent img {
    max-width: 800px;
    text-align: center;
  }
</style>
