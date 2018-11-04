<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
    <v-toolbar  color="primary darken-1" dark></v-toolbar>

      <v-list>
        <v-list-group
          prepend-icon="fa fa-pie-chart"
          value="true"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Open City</v-list-tile-title>
          </v-list-tile>
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <v-list-tile slot="activator">
              <v-list-tile-title>Setores em Funcionamento</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              v-for="(bibliografica, i) in bibliograficas"
              :key="i"
              @click=""
              :to="bibliografica[1]"
            >
              <v-list-tile-title v-text="bibliografica[0]"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
            <v-list-tile>
              <v-list-tile-action>
                  <v-icon>public</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>APIs do Governo</v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-action>
                  <v-icon>public</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>Insights</v-list-tile-title>
            </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped" dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Meta from 'mixins/meta'
  import VWidget from '../components/VWidget';
  import Services from '../services';
  import MiniStatistic from '../components/widgets/statistic/MiniStatistic';
  import LinearStatistic from '../components/widgets/statistic/LinearStatistic';
  import CircleStatistic from '../components/widgets/statistic/CircleStatistic';

  export default {
    mixins: [Meta],

    data () {
      return {

        pags_sucupira: [
          ['Sucupira', '/'],
        ],

        bibliograficas: [
          ['Setores Públicos', '/artigoEmJornalOuRevista'],
        ],
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Open City'
      }
    }
  }
</script>
