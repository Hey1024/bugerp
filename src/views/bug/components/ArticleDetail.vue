<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" >

      <sticky :class-name="'sub-navbar ' + postForm.status">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->
        <!--<PlatformDropdown v-model="postForm.platforms" />-->
        <!--<SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" :disabled="ispub" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <!--<el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>-->
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <!--<el-col :span="24" >-->
          <el-form-item style="margin-bottom: 40px;" prop="title" label="文章标题：">
            <el-input
              v-model="postForm.title"
              :maxlength="100"
              placeholder="请输入标题"
              clearable
              style="width: 80%;"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="项目名称：">
              <el-select v-model="postForm.projectname" placeholder="请选择">
                <el-option
                  v-for="item in projectnames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="运行环境：">
              <el-select v-model="postForm.envname" placeholder="请选择">
                <el-option
                  v-for="item in envnames"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="应用版本：">
              <el-select v-model="postForm.appversion" placeholder="请选择">
                <el-option
                  v-for="(item, index) in versions"
                  :key="index"
                  :label="item"
                  :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<Warning />-->
          <!--<el-col :span="8">-->
          <!--<el-form-item style="margin-bottom: 40px;" label="文章类别：">-->
          <!--<el-select v-model="postForm.selectclass" placeholder="请选择">-->
          <!--<el-option-->
          <!--v-for="item in classname"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value"/>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
        <el-row>

          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="优先级别：">
              <el-select v-model="postForm.level" placeholder="请选择">
                <el-option
                  v-for="item in levels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!--<el-form-item style="margin-bottom: 40px;" prop="title">-->
            <!--<PlatformDropdown v-model="postForm.platforms" />-->
            <!--</el-form-item>-->
            <el-form-item style="margin-bottom: 40px;" label="严重级别：">
              <el-select v-model="postForm.importance" placeholder="请选择">
                <el-option
                  v-for="item in importances"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="分配任务：">
              <el-select v-model="postForm.selectuser" multiple placeholder="分配任务">
                <el-option
                  v-for="item in users"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row/>
        <!--</template>-->
        <el-form-item style="margin-bottom: 40px;">
          <div class="editor-container">
            <Tinymce ref="editor" v-model="postForm.content"/>
          </div>
        </el-form-item>

      </div>
      <!--<el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">-->
      <!--<el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.content_short">-->
      <!--</el-input>-->
      <!--<span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span>-->
      <!--</el-form-item>-->

      <!--<div style="margin-bottom: 20px;">-->
      <!--<Upload v-model="postForm.image_uri" />-->
      <!--</div>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
import Sticky from '@/components/Sticky' // 粘性header组件
import { validateURL } from '@/utils/validate'
import { fetchBug, createBug } from '@/api/bugs'
import { getEnv, getProject, getUsers, getVersion } from '@/api/get'
// import Warning from './Warning'
// import { removeToken } from '@/utils/auth'
// import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  // status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  id: -1,
  selectuser: '',
  projectname: '',
  level: '中',
  envname: '',
  importance: '一般',
  // selectclass: 'bug',
  appversion: '',
  platforms: 'iphone'
  // selectoses: []
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Multiselect,
    Sticky
    // Warning
    // CommentDropdown,
    // PlatformDropdown,
    // SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(null)
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      ispub: false,
      rules: {
        // image_uri: [{ validator: validateRequire }],
        // title: [{ validator: validateRequire }],
        // content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri }]
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      classname: [],
      versions: [],
      importances: [
        { value: '致命', label: '致命' },
        { value: '严重', label: '严重' },
        { value: '一般', label: '一般' },
        { value: '建议', label: '建议' }
      ],
      levels: [
        { value: '高', label: '高' },
        { value: '中', label: '中' },
        { value: '低', label: '低' }
      ],
      oses: [],
      users: [],
      projectnames: [],
      envnames: []
    }
  },
  computed: {
    // contentShortLength() {
    //   return this.postForm.content_short.length
    // }
  },
  activated() {
    this.getuser()
    this.getversion()
    // this.getclasses()
    this.getproject()
    this.getenv()
  },
  created() {
    this.getuser()
    this.getproject()
    this.getversion()
    // this.getclasses()
    this.getenv()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.postForm.id = parseInt(id)
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    getenv() {
      getEnv().then(response => {
        if (response.data.statuscode === 0) {
          const arr = response.data.envlist
          for (let i = 0; i < arr.length; i++) {
            const aa = {}
            aa.value = arr[i]
            aa.label = arr[i]
            this.envnames.push(aa)
          }
        }
      })
    },
    getproject() {
      getProject().then(response => {
        if (response.data.statuscode === 0) {
          const arr = response.data.projectlist
          for (let i = 0; i < arr.length; i++) {
            const aa = {}
            aa.value = arr[i]
            aa.label = arr[i]
            this.projectnames.push(aa)
          }
        }
      })
    },
    getversion() {
      getVersion().then(response => {
        if (response.data.statuscode === 0) {
          this.versions = response.data.versionlist
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getuser() {
      getUsers().then(response => {
        if (response.data.statuscode === 0) {
          const arr = response.data.users
          // return
          for (let i = 0; i < arr.length; i++) {
            const aa = {}
            aa.value = arr[i].nickname + '(' + arr[i].realname + ')'
            aa.label = arr[i].nickname + '(' + arr[i].realname + ')'
            this.users.push(aa)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    fetchData(id) {
      fetchBug(id).then(response => {
        if (response.data.statuscode === 0) {
          const dd = response.data
          this.postForm.title = dd.title
          this.postForm.content = dd.content
          this.postForm.importance = dd.importance
          this.postForm.version = dd.version
          this.postForm.selectuser = dd.handle
          this.postForm.envname = dd.env
          this.postForm.projectname = dd.projectname
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.ispub = true
      // this.postForm.display_time = parseInt(this.display_time / 1000)
      if (this.postForm.title.length > 40) {
        this.$message({
          message: '标题长度必须小于40位',
          type: 'error'
        })
        this.ispub = false
        return
      }
      if (this.postForm.selectuser.length < 1) {
        this.$message({
          message: '请选择指定给谁',
          type: 'error'
        })
        this.ispub = false
        return
      }
      if (this.postForm.projectname.length < 1) {
        this.$message({
          message: '请选择项目名称',
          type: 'error'
        })
        this.ispub = false
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          console.log('this.verion:' + this.postForm.appversion)
          createBug(this.postForm).then(resp => {
            console.log(resp.data)
            if (resp.data.statuscode === 0) {
              if (this.postForm.id === -1) {
                this.$notify({
                  title: '成功',
                  message: '发布成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
              }
            }
            this.ispub = false
            // this.$router.push('/bug/allbugs')
          })
        } else {
          this.ispub = false
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      // this.postForm.status = 'draft'
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
