<template>
  <div class="app-body" style="overflow:hidden">
    <Sidebar>
      <nav class="sidebar-nav">
        <VuePerfectScrollbar
          class="scroll-area"
          :settings="psSettings"
          @ps-scroll-y="scrollHandle"
        >
          <ul class="nav">
            <SidebarNavItem>
              <SidebarNavLink
                :navLinkItem="{
                  name: 'Dashboard',
                  url: '/dashboard',
                  icon: 'cui-speedometer',
                }"
                @click="alert('cucu')"
              />
            </SidebarNavItem>
            <SidebarNavDivider classes="null" />
            <SidebarNavTitle
              name="enterprises"
              :classes="null"
              :wrapper="null"
            />
            <template
              v-for="(nav_dropdown_item,
              nav_dropdown_item_index) in nav_dropdown_items"
            >
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
                            <li
                              :key="child_2_index"
                              class="nav-item"
                              v-for="(child_2, child_2_index) in child.children"
                            >
                              <SidebarNavItem>
                                <a
                                  :class="['nav-link']"
                                  :id="child_2.id"
                                  :type="child_2.type"
                                  v-on:click.prevent="ShowChildren(child_2)"
                                >
                                  <i :class="['nav-icon', child_2.icon]"></i>
                                  {{ child_2.name }}
                                </a>
                              </SidebarNavItem>
                            </li>
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
    </Sidebar>
    <main class="main">
      <Breadcrumb class="mb-0" :list="list" />
      <div
        v-if="dashboard_card_elements.length === 0"
        style=" position:absolute; left: 50%; top:50%; text-align:center"
      >
        <b-spinner
          style="width: 10rem; height: 10rem;"
          type="grow"
          label="Scanning"
        ></b-spinner>
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
              v-if="chartData.length > 0"
              :title="chartTitle"
              :sub-title="chartId"
            >
              <template v-if="rulTrendData.length > 0">
                <b-card
                  :title="rul_trend_chart_title"
                  :sub-title="rul_trend_chart_subtitle"
                >
                  <plotly
                    :data="rulTrendData"
                    :layout="rulTrendLayout"
                    :displayModeBar="false"
                    :displaylogo="false"
                  />
                  <!--<template>
                  <LineChart
                    :height="400"
                    :width="300"
                    :label="chartLabel"
                    :data="chartData"
                    :labels="chartLabels"
                    :borderColor="chartBorder"
                  />
                </template>-->
                </b-card>
              </template>
              <template v-if="plotlyData.length > 0">
                <b-card
                  :title="meas_event_assoc_chart_title"
                  :sub-title="meas_event_assoc_chart_subtitle"
                >
                  <plotly
                    :data="plotlyData"
                    :layout="plotlyLayout"
                    :displayModeBar="false"
                    :displaylogo="false"
                  />
                </b-card>
              </template>
              <b-button
                class="mt-4 float-right"
                variant="outline-primary"
                @click="clearChart"
                >Close</b-button
              >
            </b-card>
            <b-card-group card-deck deck>
              <template v-for="(element, i) in dashboard_card_elements">
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
                  :card_visualization_link="element.visualization_link"
                  @infoClicked="CardInfoClicked"
                  @cardClicked="CardClicked"
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
import SidebarNavDivider from "@/containers/components/Sidebar/SidebarNavDivider";
import SidebarNavLink from "@/containers/components/Sidebar/SidebarNavLink";
import SidebarNavItem from "@/containers/components/Sidebar/SidebarNavItem";
import SidebarNavTitle from "@/containers/components/Sidebar/SidebarNavTitle";
import SidebarNavDropdown from "@/containers/components/Sidebar/SidebarNavDropdown";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DashboardCard from "@/containers/components/Card/DashboardCard";
import dTable from "@/containers/components/Base/DashboardTable";
//import LineChart from "@/containers/components/Chart/LineChart";
import { utilities } from "@/mixins/utilities";
import { Plotly } from "vue-plotly";

export default {
  name: "dashboard",
  mixins: [utilities],
  components: {
    Breadcrumb,
    Sidebar,
    SidebarNavDivider,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    VuePerfectScrollbar,
    DashboardCard,
    SidebarNavDropdown,
    dTable,
    //LineChart,
    Plotly,
  },
  data: function() {
    return {
      nav: sidebar_data.items,
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
      chartBG: "rgba(255,255,255,.55)",
      chartBorder: "#20a8d8",
      type_illustration: {
        enterprise: "img/illustrations/svg/noun_companies.svg",
        site: "img/illustrations/svg/noun_site.svg",
        segment: "img/illustrations/svg/noun_segment_1.svg",
        asset: "img/illustrations/svg/noun_bicycle_chain.svg",
        meas_location: "img/illustrations/svg/noun_meas_locations.svg",
      },
      visualization_links: this.$config.visualization_links,
      training_links: this.$config.training_links,
      dashboard_table_type_fields: {
        Enterprise: [
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "enterprise_id", sortable: true },
          { key: "enterprise_type", sortable: false },
          { key: "sites", sortable: false },
        ],
        Site: [
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "enterprise_id", sortable: true },
          { key: "site_id", sortable: true },
          { key: "site_type", sortable: false },
          { key: "segments", sortable: false },
        ],
        Segment: [
          { key: "@id", sortable: true },
          { key: "name", sortable: true },
          { key: "@type", sortable: true },
          { key: "segment_site", sortable: true },
          { key: "segment_id", sortable: true },
          { key: "segment_type", sortable: false },
          { key: "sg_hyp_events", sortable: false },
          { key: "assets", sortable: false },
        ],
        Asset: [
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
          { key: "meas_locations", sortable: false },
        ],
      },
      plotlyData: [],
      plotlyLayout: null,
      meas_event_assoc_chart_title: "Latest prediction measurement samples",
      meas_event_assoc_chart_subtitle: "",
      rul_trend_chart_title: "RUL trend",
      rul_trend_chart_subtitle: "",
      rulTrendData: [],
      rulTrendLayout: null,
    };
  },
  methods: {
    ChildExists(children, id) {
      for (var i = 0; i < children.length; i++) {
        if (children[i].id == id) {
          return i;
        }
      }
      return -1;
    },
    GetEnterprises() {
      this.loading = true;
      this.fetchData(this.$config.localMetadataApiUrl + "/enterprises")
        .then((result) => {
          this.loading = false;
          if (result.error == null) {
            //result.enterprises.forEach((enterprise) => {
            var enterprise = result;
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
                children: [],
              };
              this.nav_dropdown_items.push(obj);
            }
            //});
            this.ShowDashboardCards(this.nav_dropdown_items);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetSites(enterprise, index) {
      this.loading = true;
      this.fetchData(this.$config.localMetadataApiUrl + "/" + enterprise.url)
        .then((result) => {
          this.loading = false;
          if (result.error == null) {
            result.sites.forEach((site) => {
              if (this.ChildExists(enterprise.children, site["@id"]) == -1) {
                var obj = {
                  id: site["@id"],
                  name: site.name,
                  url: this.LocalNifiResourceAddressFromURL(site["@id"]),
                  type: "site",
                  icon: "fa fa-map-pin",
                  enterprise_index: index,
                  children: [],
                };
                enterprise.children.push(obj);
              }
            });
            this.ShowDashboardCards(enterprise.children);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetSegments(site, index) {
      this.loading = true;
      this.fetchData(this.$config.localMetadataApiUrl + "/" + site.url)
        .then((result) => {
          this.loading = false;
          if (result.error == null) {
            result.segments.forEach((segment) => {
              if (!segment.name.includes("SERENA")) {
                if (this.ChildExists(site.children, segment["@id"]) == -1) {
                  var obj = {
                    id: segment["@id"],
                    name: segment.name,
                    url: this.LocalNifiResourceAddressFromURL(segment["@id"]),
                    type: "segment",
                    icon: "fa fa-gears",
                    enterprise_index: site.enterprise_index,
                    site_index: index,
                    visualization_link: this.visualization_links[segment.name]
                      ? this.visualization_links[segment.name]
                      : "",
                    training_link: this.training_links[segment.name]
                      ? this.training_links[segment.name]
                      : "",
                    children: [],
                  };
                  site.children.push(obj);
                }
              }
            });
            this.ShowDashboardCards(site.children);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetAssets(segment, index) {
      this.loading = true;
      this.fetchData(this.$config.localMetadataApiUrl + "/" + segment.url)
        .then((result) => {
          this.loading = false;
          if (result.error == null) {
            result.assets.forEach((asset) => {
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
                  children: [],
                };
                segment.children.push(obj);
              }
            });
            this.ShowDashboardCards(segment.children);
          } else {
            this.makeToast("danger", "Error:" + result.error, result.message);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetMeasLocations(asset, index) {
      this.loading = true;
      this.fetchData(this.$config.localMetadataApiUrl + "/" + asset.url)
        .then((result) => {
          this.loading = false;
          if (
            this.containsKey(result, "meas_locations") &&
            result.meas_locations != null
          ) {
            result.meas_locations.forEach((meas) => {
              if (this.ChildExists(asset.children, meas["@id"]) == -1) {
                var obj = {
                  id: meas["@id"],
                  name: meas.name,
                  url: this.LocalNifiResourceAddressFromURL(meas["@id"]),
                  type: "meas_location",
                  icon: "cui-chart",
                  enterprise_index: asset.enterprise_index,
                  site_index: asset.site_index,
                  segment_index: asset.segment_index,
                  asset_index: index,
                };
                asset.children.push(obj);
              }
            });
            this.ShowDashboardCards(asset.children);
          }
        })
        .catch((e) => {
          this.makeToast("danger", "Error", e.message);
        });
    },
    GetAsHypEvents(asset, asset_index) {
      //Load events
      console.log(asset_index + " --- " + JSON.stringify(asset));
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
        case "asset":
          var asset_index = this.nav_dropdown_items[
            value.enterprise_index
          ].children[value.site_index].children[
            value.segment_index
          ].children.indexOf(value);
          var asset = this.nav_dropdown_items[value.enterprise_index].children[
            value.site_index
          ].children[value.segment_index].children[asset_index];
          this.GetMeasLocations(asset, asset_index);
          this.GetAsHypEvents(asset, asset_index);
          break;
      }
    },
    ShowDashboardCards(array) {
      var tmp = [];
      this.ClearDashboardCards();
      array.forEach((element) => {
        tmp.push({
          id: element.id,
          name: element.name,
          url: element.url,
          type: element.type,
          visualization_link: element.visualization_link,
        });
      });
      this.dashboard_card_elements = tmp;
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
    CardClicked(cardInfo) {
      return cardInfo;
    },
    CardInfoClicked(response) {
      this.ShowChart(response);
    },
    clearChart() {
      this.chartData = [];
      this.chartLabels = [];
      this.chartId = "0";
      this.ClearPlotlyChart();
    },
    ShowChart(response) {
      let ymin = 0;
      let ymax = 0;
      this.rulTrendData = [];
      this.rulTrendLayout = null;
      if (response.predictions.length > 0) {
        ymin = response.predictions[0].rul;
        ymax = response.predictions[0].rul;
        let labels = [];
        let data = [];
        let latest_gmt = "";
        for (var i = 0; i < response.predictions.length; i++) {
          labels.push(response.predictions[i].ts);
          data.push(response.predictions[i].rul);
          ymin =
            response.predictions[i].rul < ymin
              ? response.predictions[i].rul
              : ymin;
          ymax =
            response.predictions[i].rul > ymax
              ? response.predictions[i].rul
              : ymax;
          if (i == response.predictions.length - 1)
            latest_gmt = response.predictions[i].ts;
        }
        this.PlotlyMeasEventAssocChart(latest_gmt, response.meas_events_assoc);
        this.chartLabel = "RUL";
        this.chartId = response.id;
        this.chartTitle = response.title;
        this.rul_trend_chart_subtitle = response.predictions[0].ts+" - "+response.predictions[response.predictions.length - 1].ts;
        this.chartLabels = labels;
        this.chartBG = "#20a8d8";
        this.chartBorder = "rgba(255,255,255,.55)";
        this.chartData = data;

        /*************************/
        if (data.length > 0) {
          //initialize
          this.rulTrendData.push({
            x: labels,
            y: data,
            //mode: "lines+scatter",
            type: "scatter",
            name: "RUL trend",
            marker: { size: 20 },
          });
          this.rulTrendLayout = {
            autosize: true,
            legend: { orientation: "h" },
            yaxis: {
              range: [Math.floor(ymin * 0.65), Math.ceil(ymax + ymax * 0.2)],
            },
          };
        }
      }
    },
    ShowTableData() {
      var tmp = [];
      if (this.dashboard_card_elements[0].type == "asset") {
        this.dashboard_card_elements.forEach((element) => {
          this.fetchData(
            this.$config.localMetadataApiUrl +
              "/" +
              this.LocalNifiResourceAddressFromURL(element.id)
          )
            .then((result) => {
              tmp.push(this.DashboardTableElement(result));
              this.SelectTableFields(result["@type"]);
            })
            .catch((e) => {
              this.makeToast("danger", "Error", e.message);
            });
        });
      } else if (this.dashboard_card_elements[0].type == "meas_location") {
        //this.dashboard_card_elements.forEach((element) => {
        /*this.fetchData(this.LocalNifiResourceAddressFromURL(element.id))
            .then((result) => {
              tmp.push(this.DashboardTableElement(result));
              this.SelectTableFields(result["@type"]);
            })
            .catch((error) => {
              console.log(error);
            });*/
        //});
        return;
      } else {
        this.dashboard_card_elements.forEach((element) => {
          this.fetchData(
            this.$config.localMetadataApiUrl +
              "/" +
              this.LocalNifiResourceAddressFromURL(element.id)
          )
            .then((result) => {
              tmp.push(this.DashboardTableElement(result));
              this.SelectTableFields(result["@type"]);
            })
            .catch((e) => {
              this.makeToast("danger", "Error", e.message);
            });
        });
      }
      this.dashboard_table_elements = tmp;
    },
    SelectTableFields(type) {
      this.dashboard_table_fields = this.dashboard_table_type_fields[type];
    },
    DashboardTableElement(item) {
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
            status: "Active",
          };
          break;
        case "Site":
          children = [];
          for (i = 0; i < item.segments.length; i++) {
            children.push(item.segments[i].name);
          }
          tmp = {
            "@id": item["@id"],
            "@type": item["@type"],
            enterprise_id: item.enterprise_id,
            site_id: item.site_id,
            site_type: item.site_type.name,
            name: item.name,
            segments: children,
            //status: "Inactive",
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
            //status: "Pending",
          };
          break;
        case "Asset":
          children = [];
          var as_hyp_events = [];
          if (item.as_hyp_events != null)
            for (i = 0; i < item.as_hyp_events.length; i++)
              as_hyp_events.push(item.as_hyp_events[i].name);
          if (item.meas_locations != null)
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
      return evt;
    },
    ClearPlotlyChart() {
      this.chartData = [];
      this.chartLabels = [];
      this.chartId = "0";
    },
    PlotlyMeasEventAssocChart(pred_gmt, meas_events) {
      console.log(pred_gmt);
      this.plotlyData = [];
      this.plotlyLayout = null;
      this.meas_event_assoc_chart_subtitle = pred_gmt;
      let ymin = 0;
      let ymax = 0;
      if (meas_events.length > 0) {
        //initialize
        ymin = meas_events[0].meas_data_values[0];
        ymax = meas_events[0].meas_data_values[0];
        meas_events.forEach((meas_event) => {
          //console.log(meas_event);
          let _local_min = Math.min(...meas_event.meas_data_values);
          let _local_max = Math.max(...meas_event.meas_data_values);
          ymin = _local_min < ymin ? _local_min : ymin;
          ymax = _local_max > ymax ? _local_max : ymax;
          let info = {
            y: meas_event.meas_data_values,
            mode: "lines",
            type: "scatter",
            name: meas_event.gmt,
            hoverinfo: "y",
          };
          this.plotlyData.push(info);
        });
        this.plotlyData.push({
          x: [],
          y: [],
          name: "Segments data",
          xaxis: "x2",
          type: "bar",
        });
      }
      //var trace1 = {
      //  x: [0, 1, 2, 3, 4],
      //  y: [1, 5, 3, 7, 5],
      //  mode: "lines+markers",
      //  type: "scatter",
      //  name: "Linea1",
      //};
      //this.plotlyData = [trace1, trace2];
      //console.log(ymin + " --- " + ymax);
      this.plotlyLayout = {
        autosize: true,
        legend: { orientation: "h" },
        xaxis: { range: [0, 1000] },
        xaxis2: {
          title: "Segments",
          anchor: "y",
          overlaying: "x",
          side: "top",
          range: [-0.5, 11.5],
        },
        shapes: [
          // 1st highlight during Feb 4 - Feb 6
          {
            type: "rect",
            // x-reference is assigned to the x-values
            xref: "x2",
            // y-reference is assigned to the plot paper [0,1]
            yref: "y",
            x0: "-0.5",
            y0: ymin,
            x1: "0.5",
            y1: ymax,
            fillcolor: "#f48484",
            opacity: 0.6,
            line: {
              width: 1,
            },
          },

          // 2nd highlight during Feb 20 - Feb 23

          {
            type: "rect",
            xref: "x2",
            yref: "y",
            x0: "5.5",
            y0: ymin,
            x1: "6.5",
            y1: ymax,
            fillcolor: "#f48484",
            opacity: 0.4,
            line: {
              width: 1,
            },
          },
          {
            type: "rect",
            xref: "x2",
            yref: "y",
            x0: "0.5",
            y0: ymin,
            x1: "1.5",
            y1: ymax,
            fillcolor: "#f48484",
            opacity: 0.2,
            line: {
              width: 1,
            },
          },
        ],
      };
    },
  },
  created() {
    this.loading = false;
    console.log(process.env.NODE_ENV);
    this.GetEnterprises();
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        (route) => route.name || route.meta.label
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
        interceptRailY: (styles) => ({ ...styles, height: 0 }),
      };
    },
  },
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
