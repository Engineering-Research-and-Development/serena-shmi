<template>
  <nav class="sidebar-nav">
    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-y="scrollHandle">
      <ul class="nav">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle
              :key="index"
              :name="item.name"
              :classes="item.class"
              :wrapper="item.wrapper"
            />
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :key="index" :classes="item.class" />
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel
              :key="index"
              :name="item.name"
              :url="item.url"
              :icon="item.icon"
              :label="item.label"
              :classes="item.class"
            />
          </template>
          <template v-else-if="item.dropdown">
            <div :key="index" v-if="premise ===null">...</div>
            <!--  DropDown Group -->
            <template v-else>
              <SidebarNavDropDownGroup :key="index" v-bind:enterprise="premise"></SidebarNavDropDownGroup>
            </template>
            <!--  DropDown Group -->
          </template>
          <template v-else>
            <SidebarNavItem :key="index" :classes="item.class">
              <SidebarNavLink
                :name="item.name"
                :url="item.url"
                :icon="item.icon"
                :badge="item.badge"
                :variant="item.variant"
                :attributes="item.attributes"
              />
            </SidebarNavItem>
          </template>
        </template>
      </ul>
      <slot></slot>
    </VuePerfectScrollbar>
  </nav>
</template>

<script>
import premise_data from '@/premise_data'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavItem from './SidebarNavItem'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavLabel from './SidebarNavLabel'
import SidebarNavDropDownGroup from './SidebarNavDropDownGroup'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'SidebarNav',
  components: {
    SidebarNavDivider,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLabel,
    VuePerfectScrollbar,
    SidebarNavDropDownGroup
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    },
    dropdown_data: {
      type: Array,
      default: () => []
    }
  },
  created() {
    const baseUrl = 'https://jsonplaceholder.typicode.com/todos/1';
    this.fetchData(baseUrl);
  },
  data() {
    return {
      premise: null
    }
  },
  computed: {
    psSettings: () => {
      // ToDo: find better rtl fix
      return {
        maxScrollbarLength: 200,
        minScrollbarLength: 40,
        suppressScrollX: getComputedStyle(document.querySelector('html')).direction !== 'rtl',
        wheelPropagation: false,
        interceptRailY: styles => ({ ...styles, height: 0 })
      }
    }
  },
  methods: {
    scrollHandle(evt) {
      console.log(evt)
    },
    fetchData(baseUrl) {
      this.$http.get(baseUrl)
        .then(response => {
          // JSON responses are automatically parsed.
          //this.posts = response.data
          console.log(JSON.stringify(response.data));
          this.premise = premise_data;
        })
        .catch(e => {
          console.log(e);
        })

      // async / await version (created() becomes async created())
      //
      // try {
      //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
      //   this.posts = response.data
      // } catch (e) {
      //   this.errors.push(e)
      // }
    }
  }
}
</script>

<style scoped lang="css">
.scroll-area {
  position: absolute;
  height: 100%;
  margin: auto;
}
</style>
