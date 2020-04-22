<template>
  <div class="app footer-fixed">
    <DefaultHeader :title="name" />
    <router-view></router-view>
    <Footer>
      <div class="ml-auto d-md-down-none">
        <span class="mr-2">{{footer_text}}</span>
        <img :src="eng_footer_logo_path" class="mr-2" style="height: 25px" alt="Engeneering Logo" />
        <img :src="syn_footer_logo_path" class="mr-2" style="height: 20px" alt="SynArea Logo" />
      </div>
      <div class="ml-auto d-lg-none">
        <span class="mr-2">{{footer_text}}</span>
        <img
          :src="eng_footer_minimized_logo_path"
          class="mr-2"
          style="height: 25px"
          alt="Engeneering Logo"
        />
        <img
          :src="syn_footer_minimized_logo_path"
          class="mr-2"
          style="height: 20px"
          alt="SynArea Logo"
        />
      </div>
    </Footer>
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader'
//import DefaultFooter from './DefaultFooter'
import Footer from '@/containers/components/Footer/Footer'

export default {
  name: 'DefaultContainer',
  components: {
    //DefaultFooter,
    DefaultHeader,
    Footer
  },
  data() {
    return {
      footer_text: 'Powered by',
      syn_footer_logo_path: 'img/brand/synarea-logo.svg',
      syn_footer_minimized_logo_path: 'img/brand/synarea-logo-min.svg',
      eng_footer_logo_path: 'img/brand/eng-logo.svg',
      eng_footer_minimized_logo_path: 'img/brand/eng-logo-min.svg'
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    }
  },
}
</script>
