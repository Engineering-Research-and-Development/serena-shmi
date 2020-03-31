<template>
  <div class="container-fluid bv-example-row bv-example-row-flex-cols">
    <div class="animated fadein">
      <b-card-group deck>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_dashboard_nklg.svg"
          card_image_alt="Card image cap"
          card_title="Dashboard"
          card_body_text="Dashboard component."
          card_button_text="Dashboard"
          card_button_link="/dashboard"
        ></ServiceCard>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_timeline_9u4u.svg"
          card_image_alt="Card image cap"
          card_title="Scheduler"
          card_body_text="Link to LMS Scheduler Service"
          card_button_text="Scheduler"
          card_button_link="/scheduler"
        ></ServiceCard>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_server_status_5pbv.svg"
          card_image_alt="Card image cap"
          card_title="Metadata service"
          card_body_text="Link to Dell Metadata Manager component"
          card_button_text="Metadata Manager"
          card_button_link="http://localhost:4445/"
        ></ServiceCard><!-- Indirizzo mdmanager -->
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_safe_bnk7.svg"
          card_image_alt="Card image cap"
          card_title="RPCA Manager"
          card_body_text="Link to ENG RPCA Manager component"
          card_button_text="RPCA Manager"
          card_button_link="/rpca_manager"
        ></ServiceCard>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_predictive_analytics_kf9n.svg"
          card_image_alt="Card image cap"
          card_title="Predictive model"
          card_body_text="Link to Polito predictive model evaluation charts visualization component"
          card_button_text="Predictive model evaluation"
          card_button_link="/polito_charts"
        ></ServiceCard>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_QA_engineers_dg5p.svg"
          card_image_alt="Card image cap"
          card_title="Augmented maintenance"
          card_body_text="Link to Oculavis augmented maintenance component"
          card_button_text="Augmented maintenance"
          card_button_link="/augmented_maintenance"
        ></ServiceCard>
        <ServiceCard
          card_img_path="img/illustrations/svg/undraw_posting_photo.svg"
          card_image_alt="Card image cap"
          card_title="Virtual Maintenance"
          card_body_text="Link to SynArea virtual Maintenance component"
          card_button_text="Virtual Maintenance"
          card_button_link="/virtual_maintenance"
        ></ServiceCard>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import ServiceCard from '@/containers/components/Card/ServiceCard'

export default {
  name: 'services-home',
  components: {
    ServiceCard
  }
}
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