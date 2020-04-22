<template>
  <Sidebar fixed>
    <!--<SidebarHeader />-->
    <!--<SidebarForm />-->
    <SidebarNav :navItems="nav_data.items" :dropdown_data="dropdown_data" />
    <!--<SidebarFooter />-->
    <SidebarMinimizer />
  </Sidebar>
</template>

<script>
//import sidebar_data from '@/sidebar_data'
import Sidebar from './components/Sidebar/Sidebar'
import SidebarNav from './components/Sidebar/SidebarNav'
//import SidebarHeader from './components/Sidebar/SidebarHeader'
//import SidebarForm from './components/Sidebar/SidebarForm'
//import SidebarFooter from './components/Sidebar/SidebarFooter'
import SidebarMinimizer from './components/Sidebar/SidebarMinimizer'



export default {
  name: 'DefaultSidebar',
  components: {
    Sidebar,
    //SidebarHeader,
    //SidebarForm,
    //SidebarFooter,
    SidebarMinimizer,
    SidebarNav
  },
  data() {
    return {
      //nav: sidebar_data.items
    }
  },
  props: {
    nav_data: {},
    dropdown_data: []
  }
}
</script>
