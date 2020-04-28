<template>
  <div class="app-body">
    <div class="container-fluid w-100 mx-4">
      <div class="card border-0 shadow my-4">
        <img src="img/logo-1400.jpg" width="80%" alt="Serena Project Logo" />
      </div>
      <ServicesHome ref="servicesHome"></ServicesHome>
      <b-row class="mt-4 ml-2">
        <a
          href="https://serena-project.eu/"
          exact
          class="nav-link"
          active-class="active"
          target="_blank"
          >SERENA portal</a
        >
        <a
          href="http://vana.mech.upatras.gr/redmine/projects/serena/wiki/Wiki"
          exact
          class="nav-link"
          active-class="active"
          target="_blank"
          >SERENA wiki</a
        >
        <Button
          class="btn btn-link"
          @click="ToggleAdminTools()"
          >Admin tools</Button
        >
        <!--<router-link to="/user/login" exact class="nav-link" active-class="active">Login</router-link>
        <router-link to="/user/register" exact class="nav-link" active-class="active">Register</router-link>-->
      </b-row>
    </div>
  </div>
</template>

<script>
//import Cards from './base/Cards'
import ServicesHome from "./services/ServicesHome";

export default {
  name: "services",
  components: {
    //Cards
    ServicesHome,
  },
  data: function() {
    return {
      enable : false
    };
  },
  methods: {
    ToggleAdminTools(){
      console.log(this.enable);
      this.enable = !this.enable;
      this.$refs.servicesHome.Enable(this.enable);
      return;
    }
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        (route) => route.name || route.meta.label
      );
    }
  },
};
</script>

<style></style>
