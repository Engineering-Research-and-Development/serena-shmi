<template>
  <SidebarNavDropdown :dropDownItem="local_nav_dropdown_item" @dropDownClicked="DropDownClicked">
    <template v-for="(item, i) in local_nav_dropdown_item.children">
      <template v-if="item.children.length > 0">
        <SidebarNavDropdown :key="i" :dropDownItem="item" @dropDownClicked="DropDownClicked">
          <template v-for="(child, child_index) in item.children">
            <template v-if="child.children.length > 0">
              <SidebarNavDropdown
                :key="child_index"
                :dropDownItem="child"
                @dropDownClicked="DropDownClicked"
              >
                <template v-for="(child_2, child_2_index) in child.children">
                  <template v-if="child_2.children.length > 0">
                    <SidebarNavDropdown
                      :key="child_2_index"
                      :dropDownItem="child_2"
                      @dropDownClicked="DropDownClicked"
                    >
                      <li
                        :key="child_3_index"
                        class="nav-item"
                        v-for="(child_3, child_3_index) in child_2.children"
                      >
                        <SidebarNavLink
                          :navLinkItem="child_3"
                          :badge="child_3.badge"
                          :variant="child_3.variant"
                          :attributes="child_3.attributes"
                        />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <!--<template v-else>
                    <SidebarNavItem :key="child_2_index" :classes="item.class">
                      <SidebarNavLink
                        :navLinkItem="child_2"
                        :badge="child_2.badge"
                        :variant="child_2.variant"
                        :attributes="child_2.attributes"
                      />
                    </SidebarNavItem>
                  </template>-->
                </template>
              </SidebarNavDropdown>
            </template>
            <!--<template v-else>
              <SidebarNavItem :key="child_index" :classes="item.class">
                <SidebarNavLink :navLinkItem="child" />
              </SidebarNavItem>
            </template>-->
          </template>
        </SidebarNavDropdown>
      </template>
      <!--<template v-else>
        <SidebarNavItem :key="i" :classes="local_nav_dropdown_item.class">
          <SidebarNavLink :navLinkItem="local_nav_dropdown_item" />
        </SidebarNavItem>
      </template>-->
    </template>
  </SidebarNavDropdown>
</template>

<script>
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
//import SidebarNavItem from './SidebarNavItem'

export default {
  name: "SidebarNavDropDownGroup",
  components: {
    SidebarNavDropdown,
    //SidebarNavItem,
    SidebarNavLink
  },
  data() {
    return {
      local_nav_drop_down_item: this.nav_dropdown_item
    }
  },
  methods: {
    DropDownClicked(value) {
      console.log("DDG->" + JSON.stringify(value));
      this.$emit('dropDownGroupElementClicked', value);
    }
  },
  props: {
    nav_dropdown_item: {
      type: Object,
      default: null
    }
  }
}
</script>