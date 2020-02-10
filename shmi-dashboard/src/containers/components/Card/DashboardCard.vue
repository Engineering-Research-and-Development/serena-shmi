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
      <template v-if="(this.card_type.localeCompare('segment') != 0 )? false:true">
        <div
          class="circle_status mr-2"
          style="display: inline-block;vertical-align:middle;"
          :style="{ 'background': this.label_color}"
        ></div>
        <span
          :v-if="this.prediction.id"
          class="text-muted"
          style="display:inline-block;vertical-align:middle; margin-right:10px;"
        >RUL: {{this.prediction.rul}}</span>
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
    card_button_text: {
      type: String,
      default: ''
    },
    card_button_link: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colors: {
        neutro: 'lightgray',
        good: 'lightgreen',
        warning: 'yellow',
        alarm: 'red'
      },
      prediction: {
        id: '',
        ts: '',
        label: -1,
        rul: -1
      },
      interval: null,
      prediction_type: "segment",
      polling_interval: "10000",
      label_color: 'blue',
    }
  },
  methods: {
    fetchData: function (resource) {
      this.loading = true;
      let fetch_url = this.$config.localMetadataApiUrl + resource;
      //console.log(fetch_url);
      return new Promise((resolve, reject) => {
        this.$http.get(fetch_url)
          .then(response => {
            // JSON responses are automatically parsed.
            //console.log(JSON.stringify(response.data));
            //this.enterprises = response.data.enterprises;
            resolve(response.data);
          })
          .catch(e => {
            //console.log(JSON.stringify(e));
            reject(this.makeToast('danger', 'Error', e.message));
          });
      });
    },
    InfoBtnClicked() {
      this.$emit('infoClicked', this.card_id);
    },
    RulStatus() {
      this.fetchData('/digest/' + this.SerenaResourceAddressFromURL(this.card_id)).then((result) => {
        this.UpdateRul(result.prediction[0]);
      });
    },
    UpdateRul(pred) {
      //console.log(JSON.stringify(pred));
      this.label_color = this.ColorLabel(pred.p_label);
      this.prediction.id = pred['@id'];
      this.prediction.ts = pred.TS;
      this.prediction.label = pred.p_label;
      this.prediction.rul = pred.RUL;
      //console.log(JSON.stringify(this.prediction));
    },
    ColorLabel(label) {
      switch (label) {
        case 0:
        case 4:
          return this.colors.alarm;
        case 1:
        case 3:
          return this.colors.warning;
        case 2:
          return this.colors.good;
        default:
          return this.colors.neutro;
      }
    }
  },
  Mounted() {
    console.log(this.card_type);
    if (this.card_type == this.prediction_type) {
      this.RulStatus();
      this.interval = setInterval(() => {
        this.RulStatus();
      }, this.polling_interval);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>


<style scoped>
.circle_status {
  padding: 10px 11px;
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