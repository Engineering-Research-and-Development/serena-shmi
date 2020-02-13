<template>
  <div class="app-body">
    <div class="container-fluid w-100 mx-4">
      <div class="card border-0 shadow my-4">
        <img src="img/logo-1400.jpg" width="80%" alt="Serena Project Logo" />
      </div>
      <ServicesHome></ServicesHome>
      <b-row class="mt-4">
        <a
          href="http://vana.mech.upatras.gr/redmine/projects/serena/wiki/Wiki"
          exact
          class="nav-link"
          active-class="active"
        >SERENA wiki</a>
        <router-link to="/user/login" exact class="nav-link" active-class="active">Login</router-link>
        <router-link to="/user/register" exact class="nav-link" active-class="active">Register</router-link>
      </b-row>
    </div>
  </div>
</template>

<script>
//import Cards from './base/Cards'
import ServicesHome from './services/ServicesHome'

export default {
  name: 'services',
  components: {
    //Cards
    ServicesHome
  },
  data: function () {

    return {
    }
  },
  methods: {

  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    }
  }
}
</script>

<style>
</style>
