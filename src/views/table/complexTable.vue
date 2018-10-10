<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">
      </el-input>
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
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" border fit highlight-current-row
      style="width: 100%;min-height:350px;">
      <el-table-column align="center" :label="$t('table.id')" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" :label="$t('table.project')">
        <template slot-scope="scope">
          <span>{{scope.row.projectname}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150px" align="center" :label="$t('table.title')">
        <template slot-scope="scope">
          <router-link class="link-type" :to="'/components/back-to-top/'+scope.row.id">
            <span class="link-type" >{{scope.row.title}}</span>
          </router-link>
          <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" :label="$t('table.author')">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
        <!--<template slot-scope="scope">-->
          <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column width="80px" align="center" :label="$t('table.level')">
        <template slot-scope="scope">
          <span>{{scope.row.level}}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" :label="$t('table.importance')">
        <template slot-scope="scope">
          <span>{{scope.row.importance}}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
          <!--<span v-else>0</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column class-name="status-col" :label="$t('table.status')" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">{{$t('table.pass')}}</el-button>
          <el-button  size="mini" type="success" :disabled="scope.row.disable" @click="handleModifyStatus(scope.row)">{{ scope.row.action }}
          </el-button>
          <!--v-if="scope.row.status!='published'"-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <el-button  size="mini" type="danger" @click="handleStopStatus(scope.row)">{{ scope.row.stop }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
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
          <el-select class="filter-item" v-model="temp.status" placeholder="Please select">
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

    <!--<el-dialog title="Reading statistics" :visible.sync="dialogPvVisible">-->
      <!--<el-table :data="pvData" border fit highlight-current-row style="width: 100%">-->
        <!--<el-table-column prop="key" label="Channel"> </el-table-column>-->
        <!--<el-table-column prop="pv" label="Pv"> </el-table-column>-->
      <!--</el-table>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="dialogPvVisible = false">{{$t('table.confirm')}}</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->

  </div>
</template>

<script>
import { fetchPv, updateArticle } from '@/api/article'
import { getusers } from '@/api/createarticle'
import { getstatuslist } from '@/api/bugs'
import { getlist, changetask, stoptask } from '@/api/table'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { getProject } from '@/utils/auth'

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
  name: 'complexTable',
  directives: {
    waves
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
      statusOptions: [],
      showReviewer: false,
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
      downloadLoading: false
    }
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
  activated() {
    this.getList()
    this.getstatus()
  },
  created() {
    this.getspuser()
    this.getList()
    this.getstatus()
    // this.gettaskstatus()
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
    // gettaskstatus() {
    //   gettasklist().then(response => {
    //     const statusmap = response.data
    //     const l = statusmap.length
    //     for (let i = 0; i < l; i++) {
    //       this.statusOptions.push(statusmap[i].taskstatus)
    //     }
    //     console.log(response.data)
    //   })
    // },
    getList() {
      this.listLoading = true
      getlist().then(response => {
        if (response.data !== 'fail') {
          this.list = response.data
        }
        this.listLoading = false
      })
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
    handleStopStatus(row) {
      this.stop.id = row.id
      this.stop.status = row.status
      this.stop.stop = row.stop
      stoptask(this.stop).then(resp => {
        const newlist = resp.data
        if (resp.data === 'fail') {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        } else {
          const ll = this.list.length
          for (let i = 0; i < ll; i++) {
            if (this.list[i].id === row.id) {
              this.list[i].status = newlist.status
              this.list[i].stop = newlist.stop
              this.list[i].disable = newlist.disable
            }
          }
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'fail'
        })
      })
    },
    handleModifyStatus(row) {
      this.changeaction.id = row.id
      this.changeaction.status = row.status
      this.changeaction.action = row.action
      changetask(this.changeaction).then(resp => {
        if (resp.data === 'ok') {
          if (row.action === '完成') {
            this.list = this.list.filter(item => {
              return item.id !== row.id
            })
          }
          if (row.action === '领取') {
            row.status = '解决中'
            const ll = this.list.length
            for (let i = 0; i < ll; i++) {
              if (row.id === this.list[i].id) {
                this.list[i].action = '完成'
              }
            }
            row.action === '完成'
          }
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      }).catch(() => {
        this.$message({
          message: '操作失败',
          type: 'error'
        })
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      // this.temp.id = row.id // copy obj
      console.log(row.id)
      // this.dialogStatus = 'update'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
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
