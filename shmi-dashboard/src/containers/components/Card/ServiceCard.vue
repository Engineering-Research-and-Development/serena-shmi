<template>
  <b-card class="shadow border-0 h-100">
    <img
      :v-if="card_img_path"
      class="card-img-top img-fluid w-100 px-2"
      :src="card_img_path"
      :alt="card_image_alt"
    />
    <div class="card-body">
      <h5 :v-if="card_title" class="card-title">{{card_title}}</h5>
      <p :v-if="card_body_text" class="card-text">{{card_body_text}}</p>
      <p :v-if="card_text_muted" class="card-text">
        <small class="text-muted">{{card_text_muted}}</small>
      </p>
      <div class="mt-auto">
        <a
          v-if="card_button_link"
          :href="card_button_link"
          target="_blank"
          class="btn btn-outline-primary"
        >{{card_button_text}}</a>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    card_img_path: {
      type: String,
      default: ' '
    },
    card_image_alt: {
      type: String,
      default: ''
    },
    card_title: {
      type: String,
      default: ' '
    },
    card_body_text: {
      type: String,
      default: ' '
    },
    card_text_muted: {
      type: String,
      default: ' '
    },
    card_button_text: {
      type: String,
      default: ''
    },
    card_button_link: {
      type: String,
      default: ''
    }
  }
}
</script>