<template>
  <div class="app-body" style="overflow:hidden">
    <!--<DefaultSidebar :nav_data="nav" :dropdown_data="sidebarnav_dropdown_data" />-->
    <Sidebar>
      <nav class="sidebar-nav">
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-y="scrollHandle">
          <ul class="nav">
            <SidebarNavItem>
              <SidebarNavLink
                :navLinkItem="{name: 'Dashboard',url:'/dashboard',icon: 'cui-speedometer'}"
                @click="alert('cucu')"
              />
            </SidebarNavItem>
            <!--<SidebarNavItem>
              <SidebarNavLink
                :navLinkItem="{name: 'Dashboard',url: '/dashboard',icon: 'cui-speedometer'}"
                :badge="null"
                :variant="null"
                :attributes="null"
              />
            </SidebarNavItem>-->
            <SidebarNavDivider classes="null" />
            <SidebarNavTitle name="enterprises" :classes="null" :wrapper="null" />
            <!--
            <SidebarNavLabel
              :name="''"
              :url="''"
              :icon="''"
              :label="''"
              :classes="''"
            />-->
            <template v-for="(nav_dropdown_item,nav_dropdown_item_index) in nav_dropdown_items">
              <SidebarNavDropdown
                :key="nav_dropdown_item_index"
                :dropDownItem="nav_dropdown_item"
                @dropDownClicked="GetChildren"
                @itemClicked="ShowChildren"
              >
                <template v-for="(item, i) in nav_dropdown_item.children">
                  <template>
                    <SidebarNavDropdown
                      :key="i"
                      :dropDownItem="item"
                      @dropDownClicked="GetChildren"
                      @itemClicked="ShowChildren"
                    >
                      <template v-for="(child, child_index) in item.children">
                        <template>
                          <SidebarNavDropdown
                            :key="child_index"
                            :dropDownItem="child"
                            @dropDownClicked="GetChildren"
                            @itemClicked="ShowChildren"
                          >
                            <template v-for="(child_2, child_2_index) in child.children">
                              <template>
                                <SidebarNavDropdown
                                  :key="child_2_index"
                                  :dropDownItem="child_2"
                                  @dropDownClicked="GetChildren"
                                  @itemClicked="ShowChildren"
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
                            </template>
                          </SidebarNavDropdown>
                        </template>
                      </template>
                    </SidebarNavDropdown>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
          </ul>
        </VuePerfectScrollbar>
      </nav>
      <!--<SidebarMinimizer />-->
    </Sidebar>
    <main class="main">
      <Breadcrumb class="mb-0" :list="list" />
      <div
        v-if="dashboard_card_elements.length === 0"
        style=" position:absolute; left: 50%; top:50%; text-align:center"
      >
        <b-spinner style="width: 10rem; height: 10rem;" type="grow" label="Scanning"></b-spinner>
        <p>
          <strong>loading...</strong>
        </p>
      </div>
      <div class="tabs-container" v-else>
        <b-tabs class="my-tabs mt-2" lazy>
          <b-tab no-body class="my-tab" lazy active>
            <template v-slot:title>
              <i class="fa fa-th-large"></i> Cards
            </template>
            <b-card
              class="shadow"
              v-if="chartData.length != 0"
              :title="chartTitle"
              :sub-title="chartId"
            >
              <template>
                <LineChart
                  :height="400"
                  :width="300"
                  :label="chartLabel"
                  :data="chartData"
                  :labels="chartLabels"
                />
              </template>
              <b-button class="mt-4 float-right" variant="outline-primary" @click="clearChart">Close</b-button>
            </b-card>
            <b-card-group card-deck deck>
              <template v-for="(element,i) in dashboard_card_elements">
                <DashboardCard
                  :key="i"
                  :card_id="element.id"
                  :card_type="element.type"
                  :card_img_path="type_illustration[element.type]"
                  :card_image_alt="element.name"
                  :card_title="element.name"
                  card_body_text
                  :card_button_link="element.url"
                  card_button_text="info"
                  @infoClicked="CardInfoClicked"
                ></DashboardCard>
              </template>
            </b-card-group>
          </b-tab>
          <b-tab no-body class="my-tab" lazy>
            <template v-slot:title>
              <i class="fa fa-table"></i> Table
            </template>
            <div>
              <d-table
                :table-data="dashboard_table_elements"
                :fields="dashboard_table_fields"
                striped
                borderless
                hover
                caption="<i class='fa fa-align-justify'></i> Striped Table"
                :per-page="12"
                headVariant="dark"
                @row-clicked="GetRowInfo"
              ></d-table>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </main>
  </div>
</template>

<script>
import sidebar_data from "@/sidebar_data";
import Breadcrumb from "@/containers/components/Breadcrumb/Breadcrumb";
import Sidebar from "@/containers/components/Sidebar/Sidebar";
//import SidebarMinimizer from '@/containers/components/Sidebar/SidebarMinimizer'
import SidebarNavDivider from "@/containers/components/Sidebar/SidebarNavDivider";
import SidebarNavLink from "@/containers/components/Sidebar/SidebarNavLink";
import SidebarNavItem from "@/containers/components/Sidebar/SidebarNavItem";
import SidebarNavTitle from "@/containers/components/Sidebar/SidebarNavTitle";
//import SidebarNavLabel from '@/containers/components/Sidebar/SidebarNavLabel'
//import SidebarNavDropDownGroup from '@/containers/components/Sidebar/SidebarNavDropDownGroup'
import SidebarNavDropdown from "@/containers/components/Sidebar/SidebarNavDropdown";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DashboardCard from "@/containers/components/Card/DashboardCard";
import dTable from "@/containers/components/Base/DashboardTable";
import LineChart from "@/containers/components/Chart/LineChart";

export default {
  name: "dashboard",
  components: {
    Breadcrumb,
    Sidebar,
    //SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    //SidebarNavLabel,
    VuePerfectScrollbar,
    //SidebarNavDropDownGroup,
    DashboardCard,
    SidebarNavDropdown,
    dTable,
    LineChart
  },
  data: function() {
    return {
      nav: sidebar_data.items,
      //enterprises_url: process.env.VUE_APP_SERENA_API_URL + 'enterprises',
      //enterprises_url: this.$config.localMetadataApiUrl + '/enterprises',
      nav_dropdown_items: [],
      loading: false,
      dashboard_card_elements: [],
      dashboard_table_elements: [],
      dashboard_table_fields: [],
      chartTitle: "RUL value",
      chartId: "0",
      chartLabel: "",
      chartData: [],
      chartLabels: [],
      type_illustration: {
        enterprise: "img/illustrations/svg/noun_companies.svg",
        site: "img/illustrations/svg/noun_site.svg",
        segment: "img/illustrations/svg/noun_segment_1.svg",
        asset: "img/illustrations/svg/noun_bicycle_chain.svg"
      },
      dashboard_table_type_fields: {
        Enterprise: [
          { key: "status", sortable: false },
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "enterprise_id", sortable: true },
          { key: "enterprise_type", sortable: false },
          { key: "sites", sortable: false }
        ],
        Site: [
          { key: "status", sortable: false },
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "enterprise_id", sortable: true },
          { key: "site_id", sortable: true },
          { key: "site_type", sortable: false },
          { key: "segments", sortable: false }
        ],
        Segment: [
          { key: "status", sortable: false },
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "segment_site", sortable: true },
          { key: "segment_id", sortable: true },
          { key: "segment_type", sortable: false },
          { key: "sg_hyp_events", sortable: false },
          { key: "assets", sortable: false }
        ],
        Asset: [
          { key: "status", sortable: false },
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "asset_org_site", sortable: true },
          { key: "segment_site", sortable: true },
          { key: "segment_id", sortable: true },
          { key: "asset_id", sortable: true },
          { key: "asset_type", sortable: false },
          { key: "serial_number", sortable: true },
          { key: "long_description", sortable: false },
          { key: "as_hyp_events", sortable: false },
          { key: "meas_locations", sortable: false }
        ]
      }
    };
  },
  methods: {
    makeToast(variant = null, title, body) {
      this.$bvToast.toast(body, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    fetchData: function(resource) {
      this.loading = true;
      let fetch_url = this.$config.localMetadataApiUrl + resource;
      //console.log(fetch_url);
      return new Promise((resolve, reject) => {
        this.$http
          .get(fetch_url)
          .then(response => {
            // JSON responses are automatically parsed.
            //console.log(JSON.stringify(response.data));
            //this.enterprises = response.data.enterprises;
            this.loading = false;
            resolve(response.data);
          })
          .catch(e => {
            this.loading = false;
            //console.log(JSON.stringify(e));
            reject(this.makeToast("danger", "Error", e.message));
          });
      });
    },
    ChildExists(children, id) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].id == id) {
          return i;
        }
      }
      return -1;
    },
    GetEnterprises() {
      this.fetchData("/enterprises").then(result => {
        result.enterprises.forEach(enterprise => {
          if (
            enterprise.name != "MIMOSA" ||
            enterprise["@id"] != "serena:enterprise/0"
          ) {
            var obj = {
              id: enterprise["@id"],
              name: enterprise.name,
              url: this.LocalNifiResourceAddressFromURL(enterprise["@id"]),
              type: "enterprise",
              icon: "fa fa-industry",
              children: []
            };
            this.nav_dropdown_items.push(obj);
          }
        });
        this.ShowDashboardCards(this.nav_dropdown_items);
      });
    },
    GetSites(enterprise, index) {
      this.fetchData(enterprise.url).then(result => {
        result.sites.forEach(site => {
          if (this.ChildExists(enterprise.children, site["@id"]) == -1) {
            var obj = {
              id: site["@id"],
              name: site.name,
              url: this.LocalNifiResourceAddressFromURL(site["@id"]),
              type: "site",
              icon: "fa fa-map-pin",
              enterprise_index: index,
              children: []
            };
            enterprise.children.push(obj);
          }
        });
        this.ShowDashboardCards(enterprise.children);
      });
    },
    GetSegments(site, index) {
      this.fetchData(site.url).then(result => {
        result.segments.forEach(segment => {
          if (this.ChildExists(site.children, segment["@id"]) == -1) {
            var obj = {
              id: segment["@id"],
              name: segment.name,
              url: this.LocalNifiResourceAddressFromURL(segment["@id"]),
              type: "segment",
              icon: "fa fa-gears",
              enterprise_index: site.enterprise_index,
              site_index: index,
              children: []
            };
            site.children.push(obj);
          }
        });
        this.ShowDashboardCards(site.children);
      });
    },
    GetAssets(segment, index) {
      this.fetchData(segment.url).then(result => {
        result.assets.forEach(asset => {
          if (this.ChildExists(segment.children, asset["@id"]) == -1) {
            var obj = {
              id: asset["@id"],
              name: asset.name,
              url: this.LocalNifiResourceAddressFromURL(asset["@id"]),
              type: "asset",
              icon: "fa fa-gear",
              enterprise_index: segment.enterprise_index,
              site_index: segment.site_index,
              segment_index: index,
              children: []
            };
            segment.children.push(obj);
          }
        });
        this.ShowDashboardCards(segment.children);
      });
    },
    GetChildren(value) {
      switch (value.type) {
        case "enterprise":
          var ent_index = this.nav_dropdown_items.indexOf(value);
          var enterprise = this.nav_dropdown_items[ent_index];
          this.GetSites(enterprise, ent_index);
          break;
        case "site":
          var site_index = this.nav_dropdown_items[
            value.enterprise_index
          ].children.indexOf(value);
          var site = this.nav_dropdown_items[value.enterprise_index].children[
            site_index
          ];
          this.GetSegments(site, site_index);
          break;
        case "segment":
          var segment_index = this.nav_dropdown_items[
            value.enterprise_index
          ].children[value.site_index].children.indexOf(value);
          var segment = this.nav_dropdown_items[value.enterprise_index]
            .children[value.site_index].children[segment_index];
          this.GetAssets(segment, segment_index);
          break;
        //TODO
        case "asset":
          break;
      }
    },
    ShowDashboardCards(array) {
      var tmp = [];
      array.forEach(element => {
        tmp.push({
          id: element.id,
          name: element.name,
          url: element.url,
          type: element.type
        });
      });
      this.dashboard_card_elements = tmp;
      //console.log(JSON.stringify(this.dashboard_card_elements));
      this.ShowTableData();
    },
    ClearDashboardCards() {
      this.dashboard_card_elements = [];
    },
    ShowChildren(value) {
      if (value.children.length == 0) {
        this.GetChildren(value);
        this.ClearDashboardCards();
      } else {
        this.ShowDashboardCards(value.children);
      }
    },
    CardInfoClicked(response) {
      //console.log(JSON.stringify(response));
      this.ShowChart(response);
    },
    clearChart() {
      this.chartData = [];
      this.chartLabels = [];
      this.chartId = "0";
    },
    ShowChart(response) {
      var labels = [];
      var data = [];
      for (var i = 0; i < response.predictions.length; i++) {
        labels.push(response.predictions[i].ts);
        data.push(response.predictions[i].rul);
      }
      this.chartLabel = "RUL";
      this.chartId = response.id;
      this.chartTitle = response.title + " - RUL trend";
      this.chartLabels = labels;
      //console.log(this.chartLabels);
      this.chartData = data;
      //console.log(this.chartData);
    },

    //modal runtime creation example
    showMsgOk(info) {
      console.log(info);
      const h = this.$createElement;
      // Using HTML string
      const titleVNode = h("div", {
        domProps: { innerHTML: "Title from <i>HTML<i> string" },
        class: ["bg-dark,text-light"]
      });
      // More complex structure
      const messageVNode = h("div", { class: ["container", "bg-dark"] }, [
        h("p", { class: ["text-center", "text-primary"] }, [
          " Paragraph text: ",
          h("strong", {}, "Strong text"),
          " and normal text "
        ]),
        h("p", { class: ["text-center"] }, [
          h("b-spinner", {
            class: ["bg-primary"],
            style: [{ color: "#FFAABB" }]
          })
        ]),
        h("b-img", {
          props: {
            src: "https://picsum.photos/id/20/250/250",
            thumbnail: true,
            center: true,
            fluid: true,
            rounded: "circle"
          }
        })
      ]);
      const footerVNode = h("footer", {}, [
        "Footer text",
        h("p", {}, "this is a footer, yeeeee")
      ]);
      // We must pass the generated VNodes as arrays
      this.$bvModal.msgBoxOk([messageVNode, footerVNode], {
        title: [titleVNode],
        buttonSize: "lg",
        centered: true,
        size: "lg"
      });
    },
    ShowTableData() {
      var tmp = [];
      this.dashboard_card_elements.forEach(element => {
        this.fetchData(this.LocalNifiResourceAddressFromURL(element.id))
          .then(result => {
            tmp.push(this.DashboardTableElement(result));
            this.SelectTableFields(result["@type"]);
          })
          .catch(error => {
            console.log(error);
          });
      });
      this.dashboard_table_elements = tmp;
    },
    SelectTableFields(type) {
      this.dashboard_table_fields = this.dashboard_table_type_fields[type];
    },
    DashboardTableElement(item) {
      //console.log(JSON.stringify(item));
      var tmp = "";
      var children = [];
      var i = 0;
      switch (item["@type"]) {
        case "Enterprise":
          children = [];
          for (i = 0; i < item.sites.length; i++)
            children.push(item.sites[i].name);
          tmp = {
            "@id": item["@id"],
            "@type": item["@type"],
            enterprise_id: item.enterprise_id,
            enterprise_type: item.enterprise_type.name,
            name: item.name,
            sites: children,
            status: "Active"
          };
          break;
        case "Site":
          children = [];
          for (i = 0; i < item.segments.length; i++)
            children.push(item.segments[i].name);
          tmp = {
            "@id": item["@id"],
            "@type": item["@type"],
            enterprise_id: item.enterprise_id,
            site_id: item.site_id,
            site_type: item.site_type.name,
            name: item.name,
            segments: children,
            status: "Inactive"
          };
          break;
        case "Segment":
          children = [];
          var sg_hyp_events = [];
          for (i = 0; i < item.sg_hyp_events.length; i++)
            sg_hyp_events.push(item.sg_hyp_events[i].name);
          for (i = 0; i < item.assets.length; i++)
            children.push(item.assets[i].name);
          tmp = {
            "@id": item["@id"],
            "@type": item["@type"],
            segment_site: item.segment_site,
            segment_id: item.segment_id,
            segment_type: item.segment_type.name,
            name: item.name,
            sg_hyp_events: sg_hyp_events,
            assets: children,
            status: "Pending"
          };
          break;
        case "Asset":
          children = [];
          var as_hyp_events = [];
          for (i = 0; i < item.as_hyp_events.length; i++)
            as_hyp_events.push(item.as_hyp_events[i].name);
          for (i = 0; i < item.meas_locations.length; i++)
            children.push(item.meas_locations[i].name);
          tmp = {
            "@id": item["@id"],
            "@type": item["@type"],
            asset_org_site: item.asset_org_site,
            segment_site: item.segment_site,
            segment_id: item.segment_id,
            asset_id: item.asset_id,
            asset_type: item.asset_type.name,
            serial_number: item.serial_number,
            long_description: item.long_description,
            name: item.name,
            as_hyp_events: as_hyp_events,
            meas_locations: children,
            status: "Banned"
          };
          break;
      }
      return tmp;
    },
    GetRowInfo(value) {
      alert("Fetched info:\n" + JSON.stringify(value));
    },
    /*SearchInList(filter, listId) {
      var li = $(listId + " li");
      for (i = 0; i < li.length; i++) {
        var textValue = li[i]
          .getElementsByTagName("span")[0]
          .innerText.toUpperCase();
        //console.log(textValue);
        if (textValue.indexOf(filter.toUpperCase()) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    },*/
    scrollHandle(evt) {
      //console.log(evt)
      return evt;
    }
  },
  created() {
    this.loading = false;

    //this.fetchData('/enterprises');
    this.GetEnterprises();
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    },
    psSettings: () => {
      // ToDo: find better rtl fix
      return {
        maxScrollbarLength: 200,
        minScrollbarLength: 40,
        suppressScrollX:
          getComputedStyle(document.querySelector("html")).direction !== "rtl",
        wheelPropagation: false,
        interceptRailY: styles => ({ ...styles, height: 0 })
      };
    }
  }
};
</script>

<style scoped lang="css">
.main {
  color: #2f353a;
}

.scroll-area {
  position: absolute;
  height: 100%;
  margin: auto;
}

.tabs-container {
  margin: 0 0.5rem;
  height: 100%;
}

.my-tab {
  margin: 1rem;
  margin-top: 0;
}

.my-tabs .active {
  outline: none;
  border: none;
  background: none;
}

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
  border: none;
}
</style>
