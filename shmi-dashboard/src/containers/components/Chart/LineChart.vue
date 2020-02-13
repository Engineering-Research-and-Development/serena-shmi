<script>
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";

export default {
  extends: Line,
  props: {
    height: {
      type: Number,
      default: 200
    },
    width: {
      type: Number,
      default: 200
    },
    label: {
      type: String,
      default: "default chart"
    },
    bordercolor: {
      type: String,
      default: "rgba(255,255,255,.55)"
    },
    data: {
      type: Array,
      default: null
    },
    labels: {
      type: Array,
      default: null
    }
  },
  methods: {
    RenderLineChart() {
      var brandPrimary = getStyle("--primary") || "#20a8d8";
      var dataset = [
        {
          label: this.label,
          backgroundColor: brandPrimary,
          borderColor: this.bordercolor,
          data: this.chartData
        }
      ];

      this.renderChart(
        {
          labels: this.labels,
          datasets: dataset
        },
        {
          tooltips: {
            enabled: false,
            custom: CustomTooltips
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  color: "transparent",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  fontSize: 2,
                  fontColor: "transparent"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  display: true,
                  min: Math.min.apply(Math, dataset[0].data) - 5,
                  max: Math.max.apply(Math, dataset[0].data) + 5
                }
              }
            ]
          },
          elements: {
            line: {
              borderWidth: 1
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4
            }
          }
        }
      );
    }
  },
  watch: {
    data: function() {
      if (this.$data._chart) this.$data._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.RenderLineChart();
    }
  },
  computed: {
    chartData: function() {
      return this.data;
    }
  },
  mounted() {
    this.RenderLineChart();
  },
  updated() {
    this._chart.update();
  }
};
</script>
