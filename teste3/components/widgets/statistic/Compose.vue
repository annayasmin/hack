<template>
  <v-card>
    <v-toolbar color="primary" dark>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('close')"icon>
        <v-icon color="white">close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid class="pa-0 mt-2">
      <v-layout wrap>
        <v-flex xs12>
          <v-card>
            <template>
              <v-data-table
                :items="projects"
                hide-actions
                class="elevation-0"
              >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.parametro_pdf_1}}</td>
              </template>
              </v-data-table>
            </template>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { Projects } from '../../../services/project';
export default {

  data () {
    return {
    };
},
  computed: {
    projects () {
      return Projects;
    }
  }
}

</script>
