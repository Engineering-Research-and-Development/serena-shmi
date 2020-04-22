<template>
  <TheFooter>
    <div class="ml-auto">
      <span v-if="text!=''" class="mr-1">{{ text }}</span>
      <img v-if="logo!=''" :src="logo" style="height: 30px" alt="SynArea Logo" />
    </div>
  </TheFooter>
</template>
<script>
import { Footer as TheFooter } from '@coreui/vue'
export default {
  name: 'DefaultFooter',
  components: {
    TheFooter
  },
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    logo: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
