<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.level" :placeholder="$t('table.level')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="(item, index) in levels" :key="index" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.project" :placeholder="$t('table.project')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in projectnames" :key="index" :label="item" :value="item"/>
      </el-select>

      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">-->
      <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">-->
      <!--<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
      <el-dropdown :hide-on-click="false" :show-timeout="100" trigger="click" style="vertical-align: top;">
        <el-button plain >
          状态({{ statuslength }})
          <i class="el-icon-caret-bottom el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border" >
          <el-checkbox-group v-model="checkstatus" style="padding-left: 15px;" @change="HandleChange">
            <el-checkbox v-for="(item, index) in platformsOptions" :label="item" :key="index">
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:350px;">
      <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.project')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectname }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.title')" min-width="150px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/showbug/'+scope.row.id" class="link-type">
            <span class="link-type" >{{ scope.row.title }}</span>
          </router-link>
          <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.author')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
      <!--<template slot-scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.level')" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.importance')" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.importance }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
      <!--<span v-else>0</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.status')" class-name="status-col" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" style="width: 200px" class="filter-item" placeholder="修改状态" @change="changestatus(scope.row)">
            <el-option v-for="(item, index) in statuslist" :key="index" :label="item" :value="item"/>
          </el-select>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="130" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handlePass(scope.row)">{{ $t('table.pass') }}</el-button>
          <!--<el-button :disabled="scope.row.disable" size="mini" type="success" @click="handleModifyStatus(scope.row)">{{ scope.row.action }}-->
          <!--</el-button>-->
          <!--v-if="scope.row.status!='published'"-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <!--<el-button size="mini" type="danger" @click="handleStopStatus(scope.row)">{{ scope.row.stop }}-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
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
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="(item, index) in platformsOptions" :key="index" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <!--<el-form-item :label="$t('table.importance')">-->
        <!--<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='5'></el-rate>-->
        <!--</el-form-item>-->
        <el-form-item style="margin-bottom: 40px;" label="任务给：">
          <el-select
            v-model="temp.selectusers"
            filterable
            multiple
            allow-create
            default-first-option
            placeholder="请选择指定的用户">
            <el-option
              v-for="(item, index) in users"
              :key="index"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.reason')">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="Please input"/>
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
import { getUsers, getPermStatus, getProject, getStatus, getMyStatus } from '@/api/get'
import { changeMyStatus, passBug, changeStatus } from '@/api/bugs'
import { searchMyTasks } from '@/api/search'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
// import { getProject } from '@/utils/auth'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'Mytask',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      users: [],
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 5,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3, 4, 5],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        // importance: 1,
        remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        status: '新建',
        selectusers: ''
        // status: 'published'
      },
      changeaction: {
        id: 0,
        status: '',
        action: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      platformsOptions: [],
      statuslist: [],
      pvData: [],
      stop: {
        id: undefined,
        stop: '',
        status: ''
      },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      levels: ['高', '中', '低'],
      projectnames: [],
      checkstatus: [],
      statuslength: 0
    }
  },
  activated() {
    this.getstatus
    this.getList()
  },
  created() {
    this.getstatus()
    this.getmystatus()
    this.getspuser()
    this.getList()
    this.getpname()
    // this.gettaskstatus()
  },
  methods: {
    getstatus() {
      getStatus().then(resp => {
        if (resp.data.statuscode === 0) {
          this.platformsOptions = resp.data.statuslist
        }
      })
      getPermStatus().then(resp => {
        if (resp.data.statuscode === 0) {
          this.statuslist = resp.data.statuslist
        }
      })
    },
    HandleChange() {
      const data = {
        checkstatus: this.checkstatus
      }
      changeMyStatus(data).then(resp => {
        if (resp.data.statuscode === 0) {
          if (resp.data.checkstatus !== null) {
            this.checkstatus = resp.data.checkstatus
            this.statuslength = this.checkstatus.length
          }
          this.listLoading = true
          searchMyTasks(this.listQuery).then(resp => {
            console.log(resp.data)
            if (resp.data.statuscode === 0) {
              this.list = resp.data.articlelist
              this.total = resp.data.total
              this.listQuery.page = resp.data.page
            }
          })
          this.listLoading = false
        }
      })
    },
    getpname() {
      getProject().then(response => {
        if (response.data.statuscode === 0) {
          this.projectnames = response.data.projectlist
        }
      })
    },
    getmystatus() {
      getMyStatus().then(response => {
        if (response.data.statuscode === 0) {
          if (response.data.statuslist !== null) {
            this.checkstatus = response.data.statuslist
            this.statuslength = this.checkstatus.length
          }
        }
      })
    },
    getspuser() {
      getUsers().then(response => {
        if (response.data.statuscode === 0) {
          const arr = response.data.users
          for (let i = 0; i < arr.length; i++) {
            const aa = {}
            aa.value = arr[i].nickname + '(' + arr[i].realname + ')'
            aa.label = arr[i].nickname + '(' + arr[i].realname + ')'
            this.users.push(aa)
          }
        }
      })
    },
    getList() {
      this.listLoading = true

      searchMyTasks(this.listQuery).then(resp => {
        console.log(resp.data)
        if (resp.data.statuscode === 0) {
          this.list = resp.data.articlelist
          this.total = resp.data.total
          this.listQuery.page = resp.data.page
        }
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row) {
      this.changeaction.id = row.id
      this.changeaction.status = row.status
      this.changeaction.action = row.action
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handlePass(row) {
      this.temp.id = parseInt(row.id) // copy obj
      this.dialogFormVisible = true
    },
    updateData() {
      // var data = this.temp
      // const tl = this.temp.selectusers.length
      // for (let i = 0; i < tl; i++) {
      // this.temp.selectusers = this.temp.selectusers.split('(')[0]
      // }
      passBug(this.temp).then(response => {
        if (response.data.statuscode === 0) {
          const data = response.data
          this.temp.remark = ''
          this.temp.status = data.status
          this.temp.selectusers = ''
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
      this.dialogFormVisible = false
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
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    changestatus(row) {
      const param = {
        id: row.id,
        status: row.status
      }
      changeStatus(param).then(response => {
        if (response.data.statuscode === 0) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'error'
          })
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
