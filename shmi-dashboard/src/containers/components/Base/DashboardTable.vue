<template>
  <div class="my-4">
    <!--<div slot="header" v-html="caption"></div>-->
    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :no-border-collapse="noCollapse"
      :items="items"
      :fields="captions"
      :head-variant="headVariant"
      :table-variant="tableVariant"
      :current-page="currentPage"
      responsive
      sort-icon-left
      @row-clicked="rowClicked"
    >
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>
    <nav>
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        prev-text="Prev"
        next-text="Next"
        hide-goto-end-buttons
      />
    </nav>
  </div>
</template>

<script>


export default {
  name: 'd-table',
  inheritAttrs: false,
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    footClone: {
      type: Boolean,
      default: false
    },
    headVariant: {
      type: String,
      default: ''
    },
    tableVariant: {
      type: String,
      default: ''
    },
    noCollapse: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 1
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    }
  },
  data: () => {
    return {
      currentPage: 1,
    }
  },
  computed: {
    items: function () {
      const items = this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function () { return this.fields }
  },
  methods: {
    getBadge(status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount: function () {
      return this.items.length
    },
    rowClicked(item) {
      this.$emit('row-clicked', JSON.stringify(item));
    }
  }
}
</script>

<style scoped>
span,
div,
th,
td {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
