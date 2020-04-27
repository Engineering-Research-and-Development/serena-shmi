<template>
  <AppHeader fixed class="border-0">
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="/">
      <img
        class="navbar-brand-full"
        src="img/brand/serena-logo-complete.svg"
        height="30"
        alt="Serena Project Logo"
      />
      <img
        class="navbar-brand-minimized"
        src="img/brand/serena-logo.svg"
        height="30"
        alt="Serena Project Minimized Logo"
      />
    </b-link>
    <SidebarToggler
      v-if="$route.name=='Dashboard'"
      class="d-md-down-none"
      display="lg"
      :defaultOpen="true"
    />
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" to="#">{{title}}</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <!--<DefaultHeaderDropdownAccnt />-->
    </b-navbar-nav>
  </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler } from '@coreui/vue'
//import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'

export default {
  name: 'DefaultHeader',
  components: {
    AppHeader,
    //DefaultHeaderDropdownAccnt,
    SidebarToggler
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }

  }
}
</script>
