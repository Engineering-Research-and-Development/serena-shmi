<template>
  <b-card class="shadow h-100" :title="card_title">
    <img
      :v-if="card_img_path"
      class="card-img-top img-fluid w-60 px-1"
      :src="card_img_path"
      :alt="card_image_alt"
      v-on:click="ImageClicked"
    />
    <div class="card-body p-0">
      <b-card-text>{{ card_body_text }}</b-card-text>
      <template
        v-if="
          this.card_type.localeCompare(this.prediction_type) != 0 ? false : true
        "
      >
        <!--<div
          class="circle_status mr-2"
          style="display: inline-block;vertical-align:middle;"
          :style="{ background: this.label_color }"
        ></div>
        <span
          :v-if="this.prediction.id"
          class="text-muted"
          style="display:inline-block;vertical-align:middle; margin-right:10px;"
          >RUL: {{ this.prediction.rul }} days</span
        >-->
        <h4>{{ this.pred_title }}</h4>
        <div
          class="circle_status mr-2"
          style="display: inline-block;vertical-align:middle;"
          :style="{ background: this.label_color }"
        ></div>
        <span
          style="display:inline-block;vertical-align:middle; margin-right:10px;"
          >{{ this.prediction.p_label }}</span
        ><span style="font-size:50%;">{{ this.prediction.p_label_unit }}</span>
        <div :v-if="this.prediction.id" class="text-muted">
          <span>RUL: {{ this.prediction.rul }}</span
          ><span style="font-size:50%;">{{ this.prediction.rul_unit }}</span>
        </div>
      </template>
      <div class="float-right">
        <b-button
          pill
          v-if="card_button_link"
          variant="outline-dark"
          v-on:click="InfoBtnClicked"
          >{{ card_button_text }}</b-button
        >
      </div>
      <template v-if="this.card_visualization_link ? true : false">
        <div class="my-2">
          <span class="d-block">
            <a
              class="font-weight-bold"
              :href="card_visualization_link"
              target="_blank"
            >
              <i class="fa fa-cube fa-fw"></i>
              3D visualization
            </a>
          </span>
        </div>
      </template>
      <template v-if="this.card_training_link ? true : false">
        <div class="my-2">
          <span class="d-block">
            <a
              class="font-weight-bold"
              :href="card_training_link"
              target="_blank"
            >
              <i class="fa fa-cube fa-fw"></i>
              3D maintenance
            </a>
          </span>
        </div>
      </template>
    </div>
  </b-card>
</template>

<script>
import { utilities } from "@/mixins/utilities";

export default {
  name: "DashboardCard",
  mixins: [utilities],
  props: {
    card_id: {
      type: String,
      default: "",
    },
    card_element: {
      type: Object,
      default: null,
    },
    card_type: {
      type: String,
      default: "",
    },
    card_img_path: {
      type: String,
      default: "",
    },
    card_image_alt: {
      type: String,
      default: "",
    },
    card_title: {
      type: String,
      default: "",
    },
    card_body_text: {
      type: String,
      default: "",
    },
    card_button_text: {
      type: String,
      default: "",
    },
    card_button_link: {
      type: String,
      default: "",
    },
    card_visualization_link: {
      type: String,
      default: "",
    },
    card_training_lonk:{
      type: String,
      default: "",
    }
  },
  data() {
    return {
      colors: {
        neutro: "lightgray",
        good: "lightgreen",
        warning: "yellow",
        alarm: "red",
      },
      pred_tytle: "Prediction",
      prediction: {
        id: "",
        ts: "",
        label: -1,
        label_unit: "",
        rul: -1,
        rul_unit: "",
      },
      interval: null,
      prediction_type: "asset",
      polling_interval: "50000",
      label_color: "blue",
      arrayPredictions: null,
      site_id: -1,
      label_id: -1,
      rul_id: -1,
    };
  },
  methods: {
    ImageClicked() {
      var response = {
        id: this.card_id,
        type: this.card_type,
      };
      this.$emit("cardClicked", response);
    },
    InfoBtnClicked() {
      var response = {
        id: this.card_id,
        title: this.pred_tytle,
        predictions: this.arrayPredictions,
      };
      this.$emit("infoClicked", response);
    },
    InitRulStatus() {
      this.fetchData(
        //with localMetadataApiUrl
        //"/digest/" + this.SerenaResourceAddressFromURL(this.card_id)
        //with serenaDigestPredictionUrl
        this.$config.localMetadataApiUrl +
          "/meas_location/" +
          this.site_id +
          "/" +
          this.rul_id +
          "?meas_event_latest=10&meas_event_full=true"
      )
        .then((result) => {
          console.log(result);
          if (result.error == null) {
            var rulArray = result.meas_events;
            var labels_array = this.InitLabelStatus();
            for (var i = 0; i < rulArray.length; i++) {
              var prediction = {
                type: labels_array[i].meas_loc_type.name,
                id: labels_array[i]["@id"],
                p_label: labels_array[i].data_value,
                p_label_unit: labels_array[i].eng_unit_type.name,
                ts: labels_array[i].gmt_event,
                RUL: rulArray[i].data_value,
                RUL_unit: rulArray[i].eng_unit_type.name,
              };
              this.UpdateRul(prediction);
            }
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    LatestRulStatus() {
      this.fetchData(
        //with localMetadataApiUrl
        //"/digest/" + this.SerenaResourceAddressFromURL(this.card_id)
        //with serenaDigestPredictionUrl
        this.$config.localMetadataApiUrl +
          "/last_meas_event/" +
          this.site_id +
          "/" +
          this.rul_id
      )
        .then((result) => {
          console.log(result);
          if (result.error == null) {
            var rul = result;
            var label = this.LatestLabelStatus();
            var prediction = {
              id: label["@id"],
              p_label: label.data_value,
              ts: label.gmt_event,
              RUL: rul.data_value,
            };
            this.UpdateRul(prediction);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    InitLabelStatus() {
      this.fetchData(
        //with localMetadataApiUrl
        //"/digest/" + this.SerenaResourceAddressFromURL(this.card_id)
        //with serenaDigestPredictionUrl
        this.$config.localMetadataApiUrl +
          "/meas_location/" +
          this.site_id +
          "/" +
          this.label_id +
          "?meas_event_latest=10&meas_event_full=true"
      )
        .then((result) => {
          console.log(result);
          if (result.error == null) {
            return result.meas_events;
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
      return null;
    },
    LatestLabelStatus() {
      this.fetchData(
        //with localMetadataApiUrl
        //"/digest/" + this.SerenaResourceAddressFromURL(this.card_id)
        //with serenaDigestPredictionUrl
        this.$config.localMetadataApiUrl +
          "/last_meas_event/" +
          this.site_id +
          "/" +
          this.label_id
      )
        .then((result) => {
          console.log(result);
          if (result.error == null) {
            return result;
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
      return null;
    },
    UpdateRul(pred) {
      console.log(JSON.stringify(pred));
      (this.pred_title = pred.type),
        (this.label_color = this.ColorLabel(pred.p_label));
      this.prediction.id = pred.id;
      this.prediction.ts = pred.ts;
      this.prediction.label = pred.p_label;
      this.prediction.label_unit = pred.p_label_unit;
      this.prediction.rul = pred.RUL;
      this.prediction.rul_unit = pred.RUL_unit;
      this.arrayPredictions.push(this.prediction);
      //console.log(JSON.stringify(this.prediction));
    },
    GetLabelID() {
      /*console.log(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaLabelMlocCalcTypeId
      );*/
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaLabelMlocCalcTypeId
      )
        .then((result) => {
          //console.log(result);
          if (result.error == null) {
            this.label_id = this.SerenaResourceAddressFromURL(
              result.meas_locations[0]["@id"]
            ).split("/")[1];
            //console.log(this.label_id);
            this.GetRulID();
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetRulID() {
      /*console.log(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaRulMlocCalcTypeId
      );*/
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaRulMlocCalcTypeId
      )
        .then((result) => {
          if (result.error == null) {
            this.rul_id = this.SerenaResourceAddressFromURL(
              result.meas_locations[0]["@id"]
            ).split("/")[1];
            //console.log(this.rul_id);
            this.InitRulStatus(this.card_id);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    Init() {
      this.site_id = this.SerenaResourceAddressFromURL(this.card_id).split(
        "/"
      )[0];
      this.arrayPredictions = new Array();
      this.GetLabelID();
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
    },
  },
  created() {
    if (this.card_type == this.prediction_type) {
      if (this.site_id == -1 || this.label_id == -1 || this.rul_id == -1) {
        this.Init();
      } else {
        this.interval = setInterval(() => {
          if (this.card_type == this.prediction_type) {
            this.LatestRulStatus(this.card_id);
          }
        }, this.polling_interval);
      }
    }
  },
  beforeUpdate() {
    if (this.card_type == this.prediction_type) {
      if (this.site_id == -1 || this.label_id == -1 || this.rul_id == -1) {
        this.Init();
      } else {
        this.InitRulStatus(this.card_id);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
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
