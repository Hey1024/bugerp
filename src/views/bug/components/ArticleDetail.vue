<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" >

      <sticky :class-name="'sub-navbar ' + postForm.status">
        <!--<CommentDropdown v-model="postForm.comment_disabled" />-->

        <!--<SourceUrlDropdown v-model="postForm.source_uri" />-->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
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
          <!--<Warning />-->
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="文章类别：">
              <el-select v-model="postForm.selectclass" placeholder="请选择">
                <el-option
                  v-for="item in classname"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="应用版本：">
              <el-select v-model="postForm.appversion" placeholder="请选择">
                <el-option
                  v-for="item in versions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
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
        </el-row>
        <!--<div class="postInfo-container">-->
        <!--<el-row>-->
        <!--<el-col :span="8">-->
        <!--<el-form-item label-width="45px" label="作者:" class="postInfo-container-item">-->
        <!--<el-select v-model="postForm.author" filterable remote placeholder="搜索用户" :remote-method="getRemoteUserList">-->
        <!--<el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="10">-->
        <!--<el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">-->
        <!--<el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">-->
        <!--</el-date-picker>-->
        <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="6">-->
        <!--<el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">-->
        <!--<el-rate style="margin-top:8px;" v-model="postForm.importance" :max='5' :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"-->
        <!--:high-threshold="5">-->
        <!--</el-rate>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <!--<template>-->
        <el-row>
          <el-col :span="8">
            <el-form-item style="margin-bottom: 40px;" label="运行平台：">
              <el-select
                v-model="postForm.selectoses"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择平台">
                <el-option
                  v-for="item in oses"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item style="margin-bottom: 40px;" label="分配任务给：">
              <el-select
                v-model="postForm.selectusers"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择指定的用户">
                <el-option
                  v-for="item in users"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
import { fetchArticle, createArticle } from '@/api/article'
import { getproject, getusers, getversion, getplatform, getclasses, getenvs } from '@/api/createarticle'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
// import { removeToken } from '@/utils/auth'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const defaultForm = {
  // status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  // content_short: '', // 文章摘要
  // source_uri: '', // 文章外链
  // image_uri: '', // 文章图片
  // display_time: undefined, // 前台展示时间
  id: -1,
  // platforms: ['a-platform'],
  // comment_disabled: false,
  selectusers: [],
  projectname: '',
  level: '中',
  envname: '',
  importance: '一般',
  selectclass: 'bug',
  appversion: '1.25',
  selectoses: []
}

export default {
  name: 'ArticleDetail',
  components: {
    Tinymce,
    MDinput,
    Upload,
    Multiselect,
    Sticky,
    Warning,
    CommentDropdown,
    PlatformDropdown,
    SourceUrlDropdown
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule + '为必传项',
          type: 'error'
        })
        callback(null)
      } else {
        callback()
      }
    }
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
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
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
    contentShortLength() {
      return this.postForm.content_short.length
    }
  },
  activated() {
    this.getspuser()
    this.getplatform()
    this.getversion()
    this.getclasses()
    this.getpname()
    this.getenv()
  },
  created() {
    this.getspuser()
    this.getpname()
    this.getplatform()
    this.getversion()
    this.getclasses()
    this.getenv()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    getenv() {
      getenvs().then(response => {
        const arr = response.data
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i]
          aa.label = arr[i]
          this.envnames.push(aa)
        }
      })
    },
    getpname() {
      getproject().then(response => {
        const arr = response.data
        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i]
          aa.label = arr[i]
          if (arr[i] === 'all') {
            continue
          }
          this.projectnames.push(aa)
        }
      })
    },
    getclasses() {
      getclasses().then(response => {
        const arr = response.data
        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i]
          aa.label = arr[i]
          this.classname.push(aa)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getplatform() {
      getplatform().then(response => {
        const arr = response.data
        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i]
          aa.label = arr[i]
          this.oses.push(aa)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getversion() {
      getversion().then(response => {
        const arr = response.data
        for (let i = 0; i < arr.length; i++) {
          const aa = {}
          aa.value = arr[i]
          aa.label = arr[i]
          this.versions.push(aa)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getspuser() {
      getusers().then(response => {
        const arr = response.data
        // console.log(arr)
        // return
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
    fetchData(id) {
      fetchArticle(id).then(response => {
        const dd = response.data
        this.postForm.projectname = dd.projectname
        this.postForm.title = dd.title
        this.postForm.content = dd.content
        this.postForm.id = dd.id
        this.postForm.importance = dd.importance
        this.postForm.selectclass = dd.selectclass
        this.postForm.appversion = dd.appversion
        this.postForm.selectusers = dd.spusers.split(',')
        this.postForm.selectoses = dd.selectoses.split(',')
        // Just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.content_short += `   Article Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      // this.postForm.display_time = parseInt(this.display_time / 1000)
      if (this.postForm.title.length > 30) {
        this.$message({
          message: '标题长度必须小于30位',
          type: 'error'
        })
        return
      }
      if (this.postForm.selectusers.length < 1) {
        this.$message({
          message: '请选择指定给谁',
          type: 'error'
        })
        return
      }
      if (this.postForm.projectname.length < 1) {
        this.$message({
          message: '请原则项目名称',
          type: 'error'
        })
        return
      }
      this.$refs.postForm.validate(valid => {
        if (valid) {
          createArticle(this.postForm).then(resp => {
            if (resp.data === 'fail') {
              this.$notify({
                title: '失败',
                message: '发布' + this.postForm.selectclass + '失败',
                type: 'error',
                duration: 2000
              })
              return
            }
            this.$notify({
              title: '成功',
              message: '发布' + this.postForm.selectclass + '成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push('/bug/list')
          })
        } else {
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
    },
    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
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
