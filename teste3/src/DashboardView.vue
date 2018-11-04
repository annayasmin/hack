<template>
  <div id="page-statistic">
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <!-- mini statistic start -->
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="fa fa-mortar-board"
              title="543"
              sub-title="Mensagens"
              color="yellow"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="fa fa-pie-chart"
              title="15%"
              sub-title="Índice"
              color="red"
            >
            </mini-statistic>
          </v-flex>
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="fa fa-area-chart"
              title="20%"
              sub-title="Índice"
              color="light-blue"
            >
            </mini-statistic>
          </v-flex>        
          <v-flex lg3 sm6 xs12>
            <mini-statistic
              icon="fa fa-line-chart"
              title="50%"
              sub-title="Índice"
              color="purple"
            >
            </mini-statistic>
          </v-flex>
          <!-- linear statistic  end -->  
          <v-flex sm12>
            <h4>Linear Trending</h4>
          </v-flex>
          <v-flex lg4 sm12 v-for="(item,index) in trending" :key="'trending'+index">
            <linear-statistic
              :title="item.subheading"
              :sub-title="item.caption"
              :icon="item.icon.label"
              :color="item.icon.color"
              :value="item.linear.value"
            >
            </linear-statistic>
  
          </v-flex>
          <!-- circle statistic  end -->  
          <v-flex sm12>
            <h4>Circle Trending</h4>
          </v-flex>       
          <v-flex lg4 sm12 v-for="(item,index) in trending2" :key="'c-trending'+index">
            <circle-statistic
              :title="item.subheading"
              :sub-title="item.headline"
              :caption="item.caption"
              :icon="item.icon.label"
              :color="item.linear.color"
              :value="item.linear.value"
            >
            </circle-statistic>
              </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model = "s"
                  ></v-text-field>
                </v-flex>
                <p>{{s}}</p>
              <v-flex lg4 sm12 xs12>
          <v-widget title="Top Location" content-bg="white">
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', locationData],
                  // ['legend.bottom', '0'],
                  // ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],
                  ['series[0].radius', ['50%', '70%']],
                ]"
                height="400px"
                width="100%"
                >
                </e-chart>
            </div>
          </v-widget>  
        </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '../components/VWidget';
import Services from '../services';
import MiniStatistic from '../components/widgets/statistic/MiniStatistic';
import LinearStatistic from '../components/widgets/statistic/LinearStatistic';
import CircleStatistic from '../components/widgets/statistic/CircleStatistic';
import EChart from '../components/chart/echart';

export default {
  components: {
    CircleStatistic,
    MiniStatistic,
    LinearStatistic,
    EChart,
    VWidget,
  
  },
  data () {
    return {
      trending: [
        {
          subheading: 'Docentes',
          headline: '2,55',
          caption: 'increase',
          percent: 15,
          icon: {
            label: 'trending_up',
            color: 'success'
          },
          linear: {
            value: 15,
            color: 'success'
          }
        },
        {
          subheading: 'Discentes',
          headline: '6,553',
          caption: 'increase',
          percent: 10,
          icon: {
            label: 'trending_down',
            color: 'error'
          },
          linear: {
            value: 15,
            color: 'error'
          }
        },
        {
          subheading: 'Turmas',
          headline: '5,00',
          caption: 'increase',
          percent: 50,
          icon: {
            label: 'arrow_upward',
            color: 'info'
          },
          linear: {
            value: 50,
            color: 'info'
          }
        }
      ],
      trending2: [
        {
          subheading: 'Email',
          headline: '15+',
          caption: 'email opens',
          percent: 15,
          icon: {
            label: 'email',
            color: 'info'
          },
          linear: {
            value: 15,
            color: 'info'
          }
        },        
        {
          subheading: 'Tasks',
          headline: '90%',
          caption: 'tasks completed.',
          percent: 90,
          icon: {
            label: 'list',
            color: 'primary'
          },
          linear: {
            value: 90,
            color: 'success'
          }
        },        
        {
          subheading: 'Issues',
          headline: '100%',
          caption: 'issues fixed.',
          percent: 100,
          icon: {
            label: 'bug_report',
            color: 'primary'
          },
          linear: {
            value: 100,
            color: 'error'
          }
        },
      ]
    };
  },
  computed: {
    activity () {
      return Services.getActivity();
    },
    posts () {
      return Services.getPost(3);
    },
    siteTrafficData () {
      return Services.getMonthVisit;
    },
    locationData () {
      return Services.getLocation;
    }
  },
};
</script>
<style lang="stylus" scoped>

</style>
