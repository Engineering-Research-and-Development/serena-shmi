<template>
  <a
    :class="classList"
    v-bind="attributes"
    tabindex="-1"
    v-on:click.stop.prevent
    v-if="isDisabled"
    :id="navLinkItem.id"
    :type="navLinkItem.type"
  >
    <i :class="classIcon"></i>
    {{navLinkItem.name}}
    <b-badge v-if="badge && badge.text" :variant="badge.variant">{{badge.text}}</b-badge>
  </a>
  <a
    :href="navLinkItem.url"
    :class="classList"
    v-bind="attributes"
    v-else-if="isExternalLink"
    :id="navLinkItem.id"
    :type="navLinkItem.type"
  >
    <i :class="classIcon"></i>
    {{navLinkItem.name}}
    <b-badge v-if="badge && badge.text" :variant="badge.variant">{{badge.text}}</b-badge>
  </a>
  <router-link
    :to="navLinkItem.url"
    :class="classList"
    v-bind="attributes"
    v-else
    :id="navLinkItem.id"
    :type="navLinkItem.type"
  >
    <i :class="classIcon"></i>
    {{navLinkItem.name}}
    <b-badge v-if="badge && badge.text" :variant="badge.variant">{{badge.text}}</b-badge>
  </router-link>
</template>

<script>
export default {
  name: 'sidebar-nav-link',
  props: {
    navLinkItem: {
      type: Object,
      default: () => { }
    },
    badge: {
      type: Object,
      default: () => { }
    },
    variant: {
      type: String,
      default: ''
    },
    classes: {
      type: [String, Array, Object],
      default: ''
    },
    attributes: {
      type: Object,
      default: () => { return Object.create(null) }
    }
  },
  computed: {
    classList() {
      return [
        'nav-link',
        this.linkVariant,
        ...this.disabledClasses,
        ...this.attrClasses,
        ...this.itemClasses
      ]
    },
    classIcon() {
      return [
        'nav-icon',
        this.navLinkItem.icon
      ]
    },
    linkVariant() {
      return this.variant ? `nav-link-${this.variant}` : ''
    },
    itemClasses() {
      return this.getClassArray(this.classes)
    },
    attrClasses() {
      return this.getClassArray(this.attributes.class)
    },
    disabledClasses() {
      return this.isDisabled ? 'disabled'.split(' ') : []
    },
    isDisabled() {
      return Boolean(this.attributes.disabled)
    },
    isExternalLink() {
      return Boolean(this.navLinkItem.url.substring(0, 4) === 'http')
    }
  },
  methods: {
    getClassArray(classes) {
      return !classes ? [] : typeof classes === 'string' || classes instanceof String ? classes.split(' ') : Array.isArray(classes) ? classes : Object.keys(classes).filter(i => classes[i])
    }
  }
}
</script>
