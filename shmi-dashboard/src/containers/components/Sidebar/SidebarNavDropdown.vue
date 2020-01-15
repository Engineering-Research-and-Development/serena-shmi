<template>
  <router-link tag="li" class="nav-item nav-dropdown" :to="dropDownItem.url" disabled>
    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
      <span @click="spanClick">
        <i :class="classIcon"></i>
        <span>{{dropDownItem.name}}</span>
        <p class="text-muted ml-4 mt-0 mb-0">{{dropDownItem.type}}</p>
      </span>
    </div>
    <ul class="nav-dropdown-items">
      <slot></slot>
    </ul>
  </router-link>
</template>

<script>
export default {
  props: {
    dropDownItem: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    classIcon() {
      return [
        'nav-icon',
        this.dropDownItem.icon
      ]
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      //console.log(e.target);
      this.$emit('dropDownClicked', this.dropDownItem);
      e.target.parentElement.classList.toggle('open');
    },
    spanClick(e) {
      e.preventDefault();
      //console.log(e.target);
      this.$emit('itemClicked', this.dropDownItem);
    }
  }
}
</script>

<style scoped lang="css">
.nav-link {
  cursor: pointer;
}
</style>
