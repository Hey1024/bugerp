<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.status" :placeholder="$t('table.status')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="(item, index) in statuslist" :key="index" :label="item.value" :value="item.label"/>
      </el-select>
      <el-select v-model="listQuery.level" :placeholder="$t('table.level')" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in levels" :key="item" :label="item" :value="item"/>
      </el-select>
      <el-select v-model="listQuery.project" :placeholder="$t('table.project')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in projectnames" :key="item" :label="item" :value="item"/>
      </el-select>
      <!--<el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">-->
      <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <!--<el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">{{$t('table.export')}}</el-button>-->
      <!--<el-checkbox class="filter-item" style='margin-left:15px;' @change='tableKey=tableKey+1' v-model="showReviewer">{{$t('table.reviewer')}}</el-checkbox>-->
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
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
      <el-table-column :label="$t('table.level')" width="80px" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.importance')" width="80px" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.importance }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.env')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.env }}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.env}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.handle')" align="center" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.handle }}</span>
          <!--<span v-if="scope.row.handle" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
          <!--<span v-else>0</span>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-select-->
          <!--v-model="changestatus"-->
          <!--multiple-->
          <!--filterable-->
          <!--allow-create-->
          <!--default-first-option-->
          <!--placeholder="修改状态">-->
          <!--<el-option-->
          <!--v-for="item,index in statuslist"-->
          <!--:key="index"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-select v-model="scope.row.status" style="width: 200px" class="filter-item" placeholder="修改状态" @change="changestatus(scope.row)">
            <el-option v-for="(item, index) in statuslist" :key="index" :label="item.value" :value="item.label"/>
          </el-select>
          <!--<el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">{{$t('table.pass')}}</el-button>-->
          <!--<el-button  size="mini" type="success" :disabled="scope.row.disable" @click="handleModifyStatus(scope.row)">{{ scope.row.action }}-->
          <!--</el-button>-->
          <!--v-if="scope.row.status!='published'"-->
          <!--<el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{$t('table.draft')}}-->
          <!--</el-button>-->
          <!--<el-button  size="mini" type="danger" @click="handleStopStatus(scope.row)">{{ scope.row.stop }}-->
          <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="listQuery.page"
        :pager-count="11"
        :page-sizes="[15]"
        :page-size="listQuery.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>

    <!--<el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">-->
    <!--<el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.type')" prop="type">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-select class="filter-item" v-model="temp.type" placeholder="Please select">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.date')" prop="timestamp">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date">&ndash;&gt;-->
    <!--&lt;!&ndash;</el-date-picker>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.title')" prop="title">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-input v-model="temp.title"></el-input>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--<el-form-item :label="$t('table.status')">-->
    <!--<el-select class="filter-item" v-model="temp.status" placeholder="Please select">-->
    <!--<el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--&lt;!&ndash;<el-form-item :label="$t('table.importance')">&ndash;&gt;-->
    <!--&lt;!&ndash;<el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max='5'></el-rate>&ndash;&gt;-->
    <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
    <!--<el-form-item style="margin-bottom: 40px;" label="任务给：">-->
    <!--<el-select-->
    <!--v-model="temp.selectusers"-->
    <!--multiple-->
    <!--filterable-->
    <!--allow-create-->
    <!--default-first-option-->
    <!--placeholder="请选择指定的用户">-->
    <!--<el-option-->
    <!--v-for="item in users"-->
    <!--:key="item.value"-->
    <!--:label="item.label"-->
    <!--:value="item.value">-->
    <!--</el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="$t('table.reason')">-->
    <!--<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="Please input" v-model="temp.remark">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>-->
    <!--&lt;!&ndash;<el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>&ndash;&gt;-->
    <!--<el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->

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
import { getstatuslist, searchbugs, changeStatus } from '@/api/bugs'
import { getproject, getTotal } from '@/api/createarticle'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'

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
  name: 'Allbugs',
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
      importanceOptions: [],
      listQuery: {
        page: 1,
        limit: 15,
        level: undefined,
        project: undefined,
        title: undefined,
        status: undefined
      },
      // importanceOptions: [1, 2, 3, 4, 5],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      // statusOptions: ['待领取', '待测试'],
      showReviewer: false,
      temp: {
        id: undefined,
        // importance: 1,
        remark: '',
        // timestamp: new Date(),
        // title: '',
        // type: '',
        status: '待领取',
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
      projectnames: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      statuslist: [],
      levels: ['高', '中', '低']
    }
  },
  activated() {
    this.getList()
    this.getpname()
  },
  created() {
    this.getList()
    this.getstatus()
    this.getpname()
    // this.gettaskstatus()
  },
  methods: {
    getpname() {
      getproject().then(response => {
        this.projectnames = response.data
        // const arr = response.data
        // for (let i = 0; i < arr.length; i++) {
        //   const aa = {}
        //   aa.value = arr[i]
        //   aa.label = arr[i]
        //   if (arr[i] === 'all') {
        //     continue
        //   }
        //   this.projectnames.push(aa)
        // }
      })
    },
    changestatus(row) {
      const param = {
        id: row.id,
        status: row.status
      }
      changeStatus(param).then(response => {
        if (response.data === 'ok') {
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
    getstatus() {
      getstatuslist().then(response => {
        const tmp = response.data
        const sl = response.data.length
        for (let i = 0; i < sl; i++) {
          const aa = {}
          aa.value = tmp[i]
          aa.label = tmp[i]
          this.statuslist.push(aa)
        }
      })
    },
    getList() {
      this.listLoading = true
      getTotal(this.listQuery).then(response => {
        this.total = response.data
      })
      searchbugs(this.listQuery).then(response => {
        if (response.data === '') {
          this.$notify({
            title: '成功',
            message: '没有数据',
            type: 'notice'
          })
          this.list = null
          this.listLoading = false
          return
        }
        if (response.data === 'fail') {
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'error'
          })
          this.listLoading = false
          return
        }
        this.list = response.data
        // this.getList()
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
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
