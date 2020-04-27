<template>
  <div class="container-fluid bv-example-row bv-example-row-flex-cols">
    <div class="animated fadein">
      <div class="row">
        <div class="col-sm-12 col-md-4 my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_dashboard_nklg.svg"
            card_image_alt="Card image cap"
            card_title="Dashboard"
            card_body_text="Dashboard component."
            card_button_text="Enter"
            card_button_link="/dashboard"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_timeline_9u4u.svg"
            card_image_alt="Card image cap"
            card_title="Scheduler"
            card_body_text="Link to Scheduler Service"
            card_button_text="Enter"
            :card_button_link="lms_scheduler"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_server_status_5pbv.svg"
            card_image_alt="Card image cap"
            card_title="Metadata service"
            card_body_text="Link to Metadata Manager"
            card_button_text="Enter"
            :card_button_link="md_manager"
          ></ServiceCard
          ><!-- Indirizzo mdmanager -->
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_safe_bnk7.svg"
            card_image_alt="Card image cap"
            card_title="RPCA Manager"
            card_body_text="Link to RPCA Manager"
            card_button_text="Enter"
            :card_button_link="rpca_manager"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_predictive_analytics_kf9n.svg"
            card_image_alt="Card image cap"
            card_title="Predictive model"
            card_body_text="Link to predictive model charts"
            card_button_text="Enter"
            :card_button_link="polito_charts"
          ></ServiceCard>
        </div>
        <div class="col-sm-12 col-md-4  my-3">
          <ServiceCard
            card_img_path="img/illustrations/svg/undraw_QA_engineers_dg5p.svg"
            card_image_alt="Card image cap"
            card_title="Gateway manager"
            card_body_text="Link to gateway manager"
            card_button_text="Enter"
            :card_button_link="gw_manager"
          ></ServiceCard>
        </div>
      </div>
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
    md_manager: {
      type: String,
      default: Config.metadataManager,
    },
  },
  data() {
    return {
      /*lms_scheduler: Config.lmsScheduler,
      rpca_manager: this.$$config.rpcaManager,
      polito_charts: Config.politoCharts,
      gw_manager: Config.gatewayManager,
      md_manager: Config.metadataManager,*/
    };
  },
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
