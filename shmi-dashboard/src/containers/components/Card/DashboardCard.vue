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
        <span
          style="display: inline-block;vertical-align:middle;"
          class="text-muted"
          >LABEL: {{ this.prediction.label }}</span
        ><span
          class="text-muted"
          style="font-size:75%; margin-left:5px;display: inline-block;vertical-align:middle;"
          >{{ this.prediction.label_unit }}</span
        >
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
      polling_interval: "900000",
      label_color: "blue",
      pred_title: "Prediction",
      //pred_title: this.card_title,
      arrayPredictions: [],
      arrayMeasEventAssoc: [],
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
        meas_events_assoc: this.arrayMeasEventAssoc,
      };
      this.$emit("infoClicked", response);
    },
    InitRulStatus(n) {
      console.log(this.card_id + " ---->  InitRulStatus(" + n + ")");
      //console.log(
      //  this.$config.localMetadataApiUrl +
      //    "/meas_location/" +
      //    this.site_id +
      //    "/" +
      //    this.rul_id +
      //    "?meas_event_latest=" +
      //    n +
      //    "&meas_event_full=true"
      //);
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
            console.log(result);
            if (
              result.asset["@id"] == this.card_id &&
              result.meas_events != null
            ) {
              this.prediction_enabled = true;

              /************************/
              this.TEST(
                result.meas_events[0]["@id"],
                result.meas_events[0].meas_event_assoc
              );
              /************************/
              if (this.has_label) {
                this.InitLabelStatus(n, result.meas_events);
              } else {
                alert("For this asset only RUL value is available");
                result.meas_events.forEach((rul_event) => {
                  var prediction = {
                    type: rul_event.meas_loc_type.name
                      ? rul_event.meas_loc_type.name
                      : "undefined",
                    id: rul_event["@id"],
                    p_label: -1,
                    p_label_unit: "",
                    ts: rul_event.gmt_event,
                    RUL: this.containsKey(rul_event, "data_value")
                      ? rul_event.data_value
                      : "unavailable",
                    RUL_unit: rul_event.eng_unit_type.name
                      ? rul_event.eng_unit_type.name
                      : "",
                  };
                  if (prediction.RUL != "unavailable")
                    this.UpdateRul(prediction);
                });
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
          "?meas_event_latest=" +
          n +
          "&meas_event_full=true"
      )
        .then((result) => {
          if (result.error == null) {
            if (result.meas_events != null) {
              rulArray.forEach((rul_event, i) => {
                if (i < result.meas_events.length) {
                  var prediction = {
                    type: result.meas_events[i].meas_loc_type.name
                      ? result.meas_events[i].meas_loc_type.name
                      : "undefined",
                    id: rul_event["@id"],
                    p_label: result.meas_events[i].data_value
                      ? result.meas_events[i].data_value
                      : -1,
                    p_label_unit: result.meas_events[i].eng_unit_type.name
                      ? result.meas_events[i].eng_unit_type.name
                      : "",
                    ts: result.meas_events[i].gmt_event,
                    RUL: this.containsKey(rul_event, "data_value")
                      ? rul_event.data_value
                      : "unavailable",
                    RUL_unit: rul_event.eng_unit_type.name
                      ? rul_event.eng_unit_type.name
                      : "",
                  };
                  if (prediction.RUL != "unavailable")
                    this.UpdateRul(prediction);
                }
              });
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
    GetRulAndLabelID() {
      let label_local_id, rul_local_id;
      //console.log(
      //  this.$config.localMetadataApiUrl +
      //    "/meas_locations?meas_loc_site=" +
      //    this.site_id +
      //    "&mloc_calc_type=" +
      //    this.$config.serenaLabelMlocCalcTypeId
      //);
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/meas_locations?meas_loc_site=" +
          this.site_id +
          "&mloc_calc_type=" +
          this.$config.serenaLabelMlocCalcTypeId
      )
        .then((result) => {
          if (result.error == null) {
            if (
              result.meas_locations != null &&
              result.meas_locations.length > 0
            ) {
              label_local_id = result.meas_locations[0]["@id"];
              this.label_id = this.SerenaResourceAddressFromURL(
                label_local_id
              ).split("/")[1];
              this.fetchData(
                this.$config.localMetadataApiUrl +
                  "/meas_locations?meas_loc_site=" +
                  this.site_id +
                  "&mloc_calc_type=" +
                  this.$config.serenaRulMlocCalcTypeId
              )
                .then((result) => {
                  if (result.error == null) {
                    if (
                      result.meas_locations != null &&
                      result.meas_locations.length > 0
                    ) {
                      rul_local_id = result.meas_locations[0]["@id"];
                      this.rul_id = this.SerenaResourceAddressFromURL(
                        rul_local_id
                      ).split("/")[1];
                      this.CheckPredictionAndRul(label_local_id, rul_local_id);
                    } else {
                      this.prediction_enabled = false;
                    }
                  } else {
                    this.makeToast(
                      "danger",
                      "Error:" + result.error,
                      result.message
                    );
                  }
                })
                .catch((e) => {
                  this.makeToast("danger", "Error", e.message);
                });
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
    CheckPredictionAndRul(labelID, rulID) {
      let label_verified = false;
      let rul_verified = false;
      //console.log(
      //  this.$config.localMetadataApiUrl +
      //    "/asset/" +
      //    this.SerenaResourceAddressFromURL(this.card_id)
      //);
      this.fetchData(
        this.$config.localMetadataApiUrl +
          "/asset/" +
          this.SerenaResourceAddressFromURL(this.card_id)
      )
        .then((result) => {
          if (result.error == null) {
            if (
              result.meas_locations != null &&
              result.meas_locations.length > 0
            ) {
              result.meas_locations.forEach((element) => {
                if (element["@id"] == labelID) label_verified = true;
                if (element["@id"] == rulID) rul_verified = true;
              });
              if (rul_verified) {
                if (label_verified) {
                  this.has_label = true;
                }
                this.prediction_enabled = true;
              } else {
                this.prediction_enabled = false;
                this.has_label = false;
              }
              if (this.prediction_enabled) {
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
              }
            } else {
              this.prediction_enabled = false;
              this.has_label = false;
            }
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    UpdateRul(pred) {
      if (this.prediction.ts != pred.ts) {
        let local_prediction = {
          id: null,
          ts: null,
          label: -1,
          label_unit: null,
          rul: -1,
          rul_unit: null,
        };
        this.pred_title = pred.type;
        this.label_color = this.ColorLabel(pred.p_label);
        local_prediction.id = pred.id;
        local_prediction.ts = pred.ts;
        local_prediction.label = pred.p_label;
        local_prediction.label_unit = pred.p_label_unit;
        local_prediction.rul = pred.RUL;
        local_prediction.rul_unit = pred.RUL_unit;
        this.arrayPredictions.push(local_prediction);
        this.arrayPredictions.sort(this.sortByProperty("ts"));
        this.prediction = this.arrayPredictions.slice(-1)[0];
      }
    },
    ColorLabel(label) {
      if (this.site_id == "0000012C0000012D") {
        console.log(label);
        if (label <= 25) {
          return this.colors.good;
        } else if (label > 25 && label <= 50) {
          return this.colors.warning;
        } else if (label > 50 && label <= 75) {
          return "orange";
        } else if (label > 75 && label <= 100) {
          return this.colors.alarm;
        }
      } else if (this.site_id == "0000006400000065") {
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
    InitFunction: function() {
      if (this.card_type == this.prediction_type) {
        this.site_id = this.SerenaResourceAddressFromURL(this.card_id).split(
          "/"
        )[0];
        this.arrayPredictions = [];
        if (
          this.card_type == this.prediction_type &&
          (this.label_id == -1 || this.rul_id == -1)
        ) {
          this.GetRulAndLabelID();
        }
      } else {
        this.prediction_enabled = false;
      }
    },
    TEST: function(meas_event_id, array_meas_event_assoc) {
      this.arrayMeasEventAssoc = [];
      array_meas_event_assoc.forEach((e, i) => {
        if (
          i == 0 ||
          i == array_meas_event_assoc.length - 1 ||
          i == Math.floor(array_meas_event_assoc.length / 2)
        ) {
          let assoc_url =
            this.SerenaResourceAddressFromURL(e["@id"]).split("/")[3] +
            "/" +
            this.SerenaResourceAddressFromURL(e["@id"]).split("/")[4] +
            "/" +
            "?meas_event_date=" +
            this.SerenaResourceAddressFromURL(e["@id"]).split("/")[5];
          this.fetchData(
            "https://shmi.serenademo.eu/nifi/meas_event/" + assoc_url
          )
            .then((result) => {
              console.log(result);
              if (result.error == null) {
                let local_meas_object = {
                  gmt: result[0].gmt_stored,
                  collect_duration: result[0].collect_duration,
                  duration_eu_type: result[0].dur_eu_type.name,
                  meas_location_type: result[0].meas_loc_type.name,
                  meas_location_eng_unit: result[0].eng_unit_type.name,
                  meas_data_values: result[0].data_value,
                };
                console.log(local_meas_object);
                this.arrayMeasEventAssoc.push(local_meas_object);
              }
            })
            .catch((e) => {
              this.makeToast("danger", "Error", e.message);
            });
        }
      });
    },
  },

  updated: function() {
    this.$nextTick(function() {
      if (this.rul_id == -1) {
        // Code that will run only after the
        // entire view has been re-rendered
        //console.log("++++++++++++++++++++" + this.card_id);
        this.InitFunction();
      }
    });
  },
  created() {
    this.InitFunction();
    //setTimeout(() => { console.log("BOOM")}, 2000);
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

/*****************************/ /** WORKFLOW: 1)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_locations?meas_loc_site=0000012C0000012D&mloc_calc_type=0000000000000000/6/10
2)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_locations?meas_loc_site=0000012C0000012D&mloc_calc_type=0000000000000000/6/11
3)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_location/0000012C0000012D/318?meas_event_latest=10&meas_event_full=true
4)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_location/0000012C0000012D/317?meas_event_latest=10&meas_event_full=true
5)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_location/0000012C0000012D/318?meas_event_latest=1&meas_event_full=true
6)
https://shmi.serenademo.eu/api/metadata/api/1.0/meas_location/0000012C0000012D/317?meas_event_latest=10&meas_event_full=true
*/ /*****************************/
