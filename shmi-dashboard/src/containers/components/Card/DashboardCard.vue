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
        v-if="this.prediction_enabled && this.card_type == this.prediction_type"
      >
        <h4>{{ this.pred_title }}</h4>
        <div
          class="circle_status mr-2"
          style="display: inline-block;vertical-align:middle;"
          :style="{ background: this.label_color }"
        ></div>
        <span style="display:inline-block;vertical-align:middle;">{{
          this.prediction.p_label
        }}</span
        ><span style="font-size:75%;">{{ this.prediction.p_label_unit }}</span>
        <div :v-if="this.prediction.id" class="text-muted">
          <span>RUL: {{ this.prediction.rul }}</span
          ><span style="font-size:75%; margin-left:5px;">{{
            this.prediction.rul_unit
          }}</span>
        </div>
        <div class="float-right">
          <b-button
            pill
            v-if="prediction_enabled"
            variant="outline-dark"
            v-on:click="InfoBtnClicked"
            >{{ card_button_text }}</b-button
          >
        </div>
      </template>
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
    card_training_link: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      prediction_type: "asset",
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
      prediction_enabled: false,
      interval: null,
      init_interval: null,
      polling_interval: "60000",
      label_color: "blue",
      pred_title: "Prediction",
      //pred_title: this.card_title,
      arrayPredictions: null,
      site_id: -1,
      label_id: -1,
      rul_id: -1,
      has_label: false,
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
        title: this.pred_title,
        predictions: this.arrayPredictions,
      };
      this.$emit("infoClicked", response);
    },
    InitRulStatus(n) {
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_location/" +
          this.site_id +
          "/" +
          this.rul_id +
          "?meas_event_latest=" +
          n +
          "&meas_event_full=true"
      )
        .then((result) => {
          if (result.error == null) {
            if (
              result.asset["@id"] == this.card_id &&
              result.meas_events != null
            ) {
              this.prediction_enabled = true;
              if (this.has_label) {
                this.InitLabelStatus(n, result.meas_events);
              } else {
                for (var i = 0; i < result.meas_events.length; i++) {
                  var prediction = {
                    type: result.meas_events[i].meas_loc_type.name
                      ? result.meas_events[i].meas_loc_type.name
                      : "undefined",
                    id: result.meas_events[i]["@id"],
                    p_label: -1,
                    p_label_unit: "",
                    ts: result.meas_events[i].gmt_event,
                    RUL: this.containsKey(result.meas_events[i], "data_value")
                      ? result.meas_events[i].data_value
                      : "unavailable",
                    RUL_unit: result.eng_unit_type.name
                      ? result.eng_unit_type.name
                      : "",
                  };
                  if (prediction.p_label != -1 || prediction.RUL != -1) {
                    this.UpdateRul(prediction);
                  }
                }
              }
            }
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    InitLabelStatus(n, rulArray) {
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_location/" +
          this.site_id +
          "/" +
          this.label_id +
          "?meas_event_latest=10&meas_event_full=true"
      )
        .then((result) => {
          if (result.error == null) {
            if (result.meas_events != null) {
              for (var i = 0; i < rulArray.length; i++) {
                if (i < result.meas_events.length) {
                  var prediction = {
                    type: result.meas_events[i].meas_loc_type.name
                      ? result.meas_events[i].meas_loc_type.name
                      : "undefined",
                    id: rulArray[i]["@id"],
                    p_label: result.meas_events[i].data_value
                      ? result.meas_events[i].data_value
                      : -1,
                    p_label_unit: result.meas_events[i].eng_unit_type.name
                      ? result.meas_events[i].eng_unit_type.name
                      : "",
                    ts: result.meas_events[i].gmt_event,
                    RUL: this.containsKey(rulArray[i], "data_value")
                      ? rulArray[i].data_value
                      : "unavailable",
                    RUL_unit: rulArray[i].eng_unit_type.name
                      ? rulArray[i].eng_unit_type.name
                      : "",
                  };
                  if (prediction.RUL != -1) this.UpdateRul(prediction);
                }
              }
            }
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
      this.pred_title = pred.type;
      this.label_color = this.ColorLabel(pred.p_label);
      this.prediction.id = pred.id;
      this.prediction.ts = pred.ts;
      this.prediction.label = pred.p_label;
      this.prediction.label_unit = pred.p_label_unit;
      this.prediction.rul = pred.RUL;
      this.prediction.rul_unit = pred.RUL_unit;
      this.arrayPredictions.push(this.prediction);
    },
    GetLabelID() {
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaLabelMlocCalcTypeId
      )
        .then((result) => {
          if (result.error == null) {
            if (result.meas_locations != null) {
              if (result.meas_locations.length > 0) {
                this.has_label = true;
                this.label_id = this.SerenaResourceAddressFromURL(
                  result.meas_locations[0]["@id"]
                ).split("/")[1];
              } else {
                this.has_label = false;
              }
              this.GetRulID();
            }
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetRulID() {
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaRulMlocCalcTypeId
      )
        .then((result) => {
          if (result.error == null) {
            if (result.meas_locations != null) {
              if (result.meas_locations.length > 0) {
                this.rul_id = this.SerenaResourceAddressFromURL(
                  result.meas_locations[0]["@id"]
                ).split("/")[1];
                this.InitRulStatus(10);
                this.interval = setInterval(() => {
                  if (
                    this.card_type == this.prediction_type &&
                    this.prediction_enabled
                  ) {
                    this.InitRulStatus(1);
                  } else {
                    clearInterval(this.interval);
                  }
                }, this.polling_interval);
              } else {
                this.prediction_enabled = false;
              }
            } else {
              this.prediction_enabled = false;
            }
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
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
    setTimeout(() => {
      if (this.card_type == this.prediction_type) {
        this.site_id = this.SerenaResourceAddressFromURL(this.card_id).split(
          "/"
        )[0];
        this.arrayPredictions = new Array();
        if (
          this.card_type == this.prediction_type &&
          (this.label_id == -1 || this.rul_id == -1)
        ) {
          this.GetLabelID();
        }
      } else {
        this.prediction_enabled = false;
      }
    }, 1000);
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
}
</style>
