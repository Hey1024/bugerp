<template>
  <div>
    <el-table
      v-loading="listLoading"
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
          <span>{{ scope.row.exectime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.classify')" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classify }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column min-width="150px" align="center" :label="$t('table.title')">-->
      <!--<template slot-scope="scope">-->
      <!--<router-link class="link-type" :to="'/components/back-to-top/'+scope.row.id">-->
      <!--<span class="link-type" >{{scope.row.title}}</span>-->
      <!--</router-link>-->
      <!--&lt;!&ndash;<el-tag>{{scope.row.type | typeFilter}}</el-tag>&ndash;&gt;-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="$t('table.opration')" width="400" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" v-if='showReviewer' align="center" :label="$t('table.reviewer')">-->
      <!--<template slot-scope="scope">-->
      <!--<span style='color:red;'>{{scope.row.reviewer}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

    </el-table>
  </div>
</template>

<script>
import { getLog } from '@/api/log'
export default {
  name: 'Oprationlog',
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.getlog()
  },
  methods: {
    getlog() {
      this.listLoading = true
      getLog().then(resp => {
        if (resp.data.statuscode === 0) {
          this.list = resp.data.loglist
        }
      })
      this.listLoading = false
    }
  }
}
</script>

<style scoped>

</style>
