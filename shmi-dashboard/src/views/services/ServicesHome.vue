<template>
  <div class="container-fluid bv-example-row bv-example-row-flex-cols">
    <div class="animated fadein">
      <div class="row">
        <div class="col-sm-12 col-md-4 my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_dashboard_nklg.svg"
            card_image_alt="Card image cap"
            card_title="Dashboard"
            card_body_text="Dashboard is a graphically appealing user interface that allows you to perform maintenance activities inside your plant"
            card_button_text="Enter"
            card_button_link="/dashboard"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_timeline_9u4u.svg"
            card_image_alt="Card image cap"
            card_title="Scheduler"
            card_body_text="Scheduler allows you to schedule and manage operation tasks on the machines of your plant"
            card_button_text="Enter"
            :card_button_link="lms_scheduler"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_predictive_analytics_kf9n.svg"
            card_image_alt="Card image cap"
            card_title="Predictive model"
            card_body_text="Predictive model charts describe the degradation of the model performance over time for each learned class"
            card_button_text="Enter"
            :card_button_link="polito_charts"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_server_status_5pbv.svg"
            card_image_alt="Card image cap"
            card_title="Metadata service"
            card_body_text="Metadata Manager allows you to manage the Mimosa metadata types"
            card_button_text="Enter"
            :card_button_link="md_manager"
          ></ServiceCard
          ><!-- Indirizzo mdmanager -->
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_QA_engineers_dg5p.svg"
            card_image_alt="Card image cap"
            card_title="Gateway manager"
            card_body_text="Gateway Manager allows you to manage gateways info and linked segments"
            card_button_text="Enter"
            :card_button_link="gw_manager"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_safe_bnk7.svg"
            card_image_alt="Card image cap"
            card_title="RPCA Manager"
            card_body_text="RPCA Manager allows you to manage security related policies and authorizations of gateways inside SERENA Cloud Platform through a web interface"
            card_button_text="Enter"
            :card_button_link="rpca_manager"
          ></ServiceCard>
        </div>
      </div>
      <template v-if="enable">
        <div class="row">
          <div class="col-sm-12 col-md-4  my-3">
            <ServiceCard
              card_img_path="img/brand/hadoop.svg"
              card_image_alt="Card image cap"
              card_title="Hadoop monitor"
              card_body_text="Hadoop  monitor allows you to visualize the status of the cluster through a web interface"
              card_button_text="Enter"
              :card_button_link="hadoop"
            ></ServiceCard>
          </div>
          <div class="col-sm-12 col-md-4  my-3">
            <ServiceCard
              card_img_path="img/brand/hue-logo.svg"
              card_image_alt="Card image cap"
              card_title="Hue"
              card_body_text="Cloudera HUE allows you to efficiently visualize raw, prediction and alarm samples available in HDFS"
              card_button_text="Enter"
              :card_button_link="hue"
            ></ServiceCard>
          </div>
          <div class="col-sm-12 col-md-4  my-3">
            <ServiceCard
              card_img_path="img/brand/nifi-logo.svg"
              card_image_alt="Card image cap"
              card_title="NiFi"
              card_body_text="Apache NiFi is an easy to use, powerful, and reliable system to process and distribute data across SERENA Network"
              card_button_text="Enter"
              :card_button_link="nifi"
            ></ServiceCard>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ServiceCard from "@/containers/components/Card/ServiceCard";
import Config from "../../../config";
export default {
  name: "services-home",
  components: {
    ServiceCard,
  },
  props: {
    lms_scheduler: {
      type: String,
      default: Config.lmsScheduler,
    },
    rpca_manager: {
      type: String,
      default: Config.rpcaManager,
    },
    polito_charts: {
      type: String,
      default: Config.politoCharts,
    },
    gw_manager: {
      type: String,
      default: Config.gatewayManager,
    },
    hadoop: {
      type: String,
      default: Config.hadoopMonitor,
    },
    hue: {
      type: String,
      default: Config.hueService,
    },
    nifi: {
      type: String,
      default: Config.nifiService,
    },
    md_manager: {
      type: String,
      default: Config.metadataManager,
    }
  },
  data() {
    return {
      enable : false
      /*lms_scheduler: Config.lmsScheduler,
      rpca_manager: this.$$config.rpcaManager,
      polito_charts: Config.politoCharts,
      gw_manager: Config.gatewayManager,
      md_manager: Config.metadataManager,*/
    };
  },
  methods:{
    Enable(value){
      console.log(value);
      this.enable = value;
    }
  }
};
</script>

<style scoped>
.card-deck {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
}

.card-deck {
  margin: 0 -15px;
  justify-content: space-between;
}

/* azzero i margini in modo che le card occupino tutta al alarghezza del container*/
.card-deck .card {
  margin: 0 0 1rem;
}
</style>
