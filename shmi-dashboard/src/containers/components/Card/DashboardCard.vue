<template>
  <!--  <b-card class="shadow h-100 w-100">
      <img
        :v-if="card_img_path"
        class="card-img-top img-fluid"
        :src="card_img_path"
        :alt="card_image_alt"
      />
      <div class="card-body">
        <h5 :v-if="card_title" class="card-title">{{card_title}}</h5>
        <p :v-if="card_body_text" class="card-text">{{card_body_text}}</p>
        <p :v-if="card_text_muted" class="card-text">
          <small class="text-muted">{{card_text_muted}}</small>
        </p>
        <div class="float-right">
          <a
            v-if="card_button_link"
            :href="card_button_link"
            class="btn btn-outline-primary"
          >{{card_button_text}}</a>
        </div>
      </div>
  </b-card>-->
  <b-card class="shadow h-100" sm="12" md="6" lg="4" xl="3" :title="card_title">
    <img
      :v-if="card_img_path"
      class="card-img-top img-fluid w-100 px-1"
      :src="card_img_path"
      :alt="card_image_alt"
    />
    <div class="card-body">
      <b-card-text>{{card_body_text}}</b-card-text>
      <template
        v-if="(this.card_type.localeCompare('enterprise') == 0 || this.card_type.localeCompare('site') == 0)? false:true"
      >
        <span
          :v-if="card_text_muted"
          class="text-muted"
          style="display:inline-block;vertical-align:middle; margin-right:10px;"
        >{{card_text_muted}}</span>
        <div
          class="circle_status"
          style="display: inline-block;vertical-align:middle;"
          v-bind:style="{ background: status_color}"
        ></div>
      </template>
      <div class="float-right">
        <b-button
          pill
          v-if="card_button_link"
          variant="outline-dark"
          v-on:click="InfoBtnClicked"
        >{{card_button_text}}</b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'DashboardCard',
  props: {
    card_id: {
      type: String,
      default: ''
    },
    card_element: {
      type: Object,
      default: null
    },
    card_type: {
      type: String,
      default: ''
    },
    card_img_path: {
      type: String,
      default: ''
    },
    card_image_alt: {
      type: String,
      default: ''
    },
    card_title: {
      type: String,
      default: ''
    },
    card_body_text: {
      type: String,
      default: ''
    },
    card_text_muted: {
      type: String,
      default: ''
    },
    card_button_text: {
      type: String,
      default: ''
    },
    card_button_link: {
      type: String,
      default: ''
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      status_color: "lightgray"
    }
  },
  methods: {
    InfoBtnClicked() {
      this.$emit('infoClicked', this.card_id);
    }
  }
}
</script>


<style scoped>
.circle_status {
  padding: 10px 11px;
  background: gray;
  height: 2px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  width: 2px;
  /* Usage:
    <div class="circle_green" v-bind:style="{ background: status_color}"></div>
  */
}
</style>