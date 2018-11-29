<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title">-->
      <!--</el-input>-->
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
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>-->
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

      <el-table-column :label="$t('table.platform')" width="100px" align="center">
        <template slot-scope="scope">
          <router-link :to="'/components/back-to-top/'+scope.row.id" class="link-type">
            <span class="link-type" >{{ scope.row.platform }}</span>
          </router-link>
          <!--<el-tag>{{scope.row.type | typeFilter}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.runenv')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.runenv }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
      <!--<template slot-scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.version')" width="90px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.iphoneurl')" width="130px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.iphoneurl }}</span>
          <!--<svg-icon v-for="n in +scope.row.importance" icon-class="star" class="meta-item__icon" :key="n"></svg-icon>-->
        </template>
      </el-table-column>
      <!--<el-table-column align="center" :label="$t('table.readings')" width="95">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.pageviews" class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
      <!--<span v-else>0</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.notiphoneurl')" class-name="status-col" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.notiphoneurl }}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-button type="primary" size="mini"  @click="handleUpdate(scope.row)">{{$t('table.pass')}}</el-button>-->
          <el-button size="mini" type="success" @click="handleModifyStatus(scope.row)">{{ $t('table.change') }}
          </el-button>
          <!--&lt;!&ndash;v-if="scope.row.status!='published'"&ndash;&gt;-->
          <el-button v-if="scope.row.status!='draft'" size="mini" @click="handleModifyStatus(scope.row,'draft')">{{ $t('table.remove') }}
          </el-button>
        <!--<el-button  size="mini" type="danger" @click="handleStopStatus(scope.row)">{{ scope.row.stop }}-->
        <!--</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { getversion } from '@/api/version'
export default {
  name: 'Versionlist',
  data() {
    return {
      list: null,
      listLoading: false,
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 15
      },
      total: 0
    }
  },
  created() {
    this.getversionlist()
  },
  methods: {
    getversionlist() {
      getversion(this.listQuery).then(response => {
        console.log(response.data)
        if (response.data.statuscode === 0) {
          this.list = response.data.versionlist
          this.total = response.data.versionlist.length
          // this.$message({
          //   message: '',
          //   type: 'error'
          // })
          // return
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus() {
      console.log(1111)
    }
  }
}
</script>

<style scoped>

</style>
