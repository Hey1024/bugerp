<template>

  <div>
    <div>
      <!--<sticky :class-name="'sub-navbar'">-->
      <!--&lt;!&ndash;<CommentDropdown v-model="postForm.comment_disabled" />&ndash;&gt;-->

      <!--&lt;!&ndash;<SourceUrlDropdown v-model="postForm.source_uri" />&ndash;&gt;-->
      <!--<el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">转交-->
      <!--</el-button>-->
      <!--&lt;!&ndash;<el-button v-loading="loading" type="warning" @click="handleModifyStatus">关闭</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button v-loading="loading" type="warning" @click="draftForm">删除</el-button>&ndash;&gt;-->
      <!--</sticky>-->
    </div>
    <div class="components-container">
      <code style="text-align: center">{{ bug.title }}</code>

      <el-card class="box-card" style="background-color: #8cbda4">
        <el-row>
          <!--<el-col :span="5">-->
          <!--<span>类型: {{ bug.selectclass }}</span>-->
          <!--</el-col>-->
          <el-col :span="5">
            <span>版本：{{ bug.appversion }}</span>
          </el-col>
          <el-col :span="5">
            <span>状态：{{ bug.status }}</span>
          </el-col>
        </el-row>

      </el-card>

      <!--<code>{{$t('components.backToTopTips2')}}</code>-->
      <div id="tinymcecontent" class="placeholder-container" v-html="bug.content"/>
      <div v-for="(cc, index) in bug.comment" :key="index" style="margin-bottom: 5px">
        <el-card class="box-card">
          <div >{{ cc.date | parseTime('{y}-{m}-{d} {h}:{i}') }}由{{ cc.user }}转交给{{ cc.passuser }}</div>
          <div>转交原因：</div>
          <div>{{ cc.info }}</div>
        </el-card>
      </div>
    <!--<el-tooltip placement="top" content="tooltip">-->
      <!--<back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>-->
    <!--</el-tooltip>-->
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item :label="$t('table.status')">
          <el-select v-model="bug.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item, index) in statusOptions" :key="index" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='5'></el-rate>-->
        <!--</el-form-item>-->
        <el-form-item style="margin-bottom: 40px;" label="任务给：">
          <el-select
            v-model="temp.selectusers"
            multiple
            placeholder="请选择指定的用户">
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item"
              :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.reason')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>-->
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import BackToTop from '@/components/BackToTop'
import { showBug, passBug } from '@/api/bugs'
// import { getUsers, getPermStatus } from '@/api/get'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { getProject } from '@/utils/auth'

export default {
  name: 'ShowBug',
  components: { Sticky },
  data() {
    return {
      users: [],
      loading: false,
      bug: {
        title: '',
        appversion: '',
        status: '',
        comment: []
      },
      statusOptions: [],
      dialogFormVisible: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogStatus: '',
      temp: {
        id: undefined,
        remark: '',
        status: '',
        selectusers: ''
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
    // this.getusers()
    // this.getstatus()
  },
  activated() {
    // this.getstatus()
  },
  methods: {
    // getstatus() {
    //   getPermStatus().then(response => {
    //     if (response.data.statuscode === 0) {
    //       const tmp = response.data.statuslist
    //       this.statusOptions = tmp
    //     }
    //   })
    // },
    draftForm() {
      console.log(11)
    },
    submitForm() {
      // this.dialogStatus = 'update'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    // getusers() {
    //   getUsers().then(response => {
    //     if (response.data.statuscode === 0) {
    //       const data = response.data.users
    //       const l = data.length
    //       for (let i = 0; i < l; i++) {
    //         this.users.push(data[i].nickname + '(' + data[i].realname + ')')
    //       }
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    create() {
      const url = window.location.href
      const ul = url.split('/')
      const id = ul[ul.length - 1]
      if (id % 1 === 0) {
        this.temp.id = parseInt(id)
        showBug(id).then(response => {
          console.log(response.data)
          if (response.data.statuscode === 0) {
            this.bug = response.data
          }
        })
      }
    },
    updateData() {
      this.dialogFormVisible = true
      console.log(this.temp)
      this.temp.status = this.bug.status
      passBug(this.temp).then(response => {
        if (response.data.statuscode === 0) {
          const data = response.data
          this.bug.comment.push({
            date: data.date,
            info: data.remark,
            user: data.user,
            passuser: data.selectusers
          })
          this.temp.remark = ''
          this.temp.status = data.status
          this.temp.selectusers = ''
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
