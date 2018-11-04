<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <div>
          <v-toolbar flat color="white">
            <v-spacer></v-spacer>

            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
            
          </v-toolbar>

        <v-layout row>
        <v-flex xs4 order-xs1>
          <v-card tile flat color="red lighten-1">
            <mini-statistic
              icon="train"
              title="231"
              sub-title="Transporte Público"
              color="blue lighten"
            >
            </mini-statistic>  
          </v-card>
        </v-flex>
        <v-flex xs4 order-xs2>
          <v-card tile flat color="red lighten-2">
            <mini-statistic
              icon="healing"
              title="25"
              sub-title="Saúde"
              color="blue lighten"
            >
            </mini-statistic>  
          </v-card>
        </v-flex>
        <v-flex xs4 order-xs3>
          <v-card tile flat color="red">
            <mini-statistic
              icon="book"
              title="513"
              sub-title="Educação"
              color="blue lighten"
            >
            </mini-statistic>  
          </v-card>
        </v-flex>
        <v-flex xs4 order-xs3>
          <v-card tile flat color="red">
            <mini-statistic
              icon="security"
              title="96"
              sub-title="Segurança"
              color="blue lighten"
            >
            </mini-statistic>  
          </v-card>
        </v-flex>
      </v-layout>

          <v-data-table
            hide-actions
            v-model="selected"
            :headers="headers"
            :items="User"
            item-key="titulo"
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{props.item.content}}</td>
<!--                 <td width="100px">{{props.item[0].title}}</td>
                <td width="100px">{{props.item[0].body}}</td> -->
              </tr>
            </template>
            <template slot="no-data">
              Nenhum dado a ser exibido
            </template>
          </v-data-table>
        </div>  
      </div>
    </v-app>
  </div>
</template>

<script>

  import VWidget from '../components/VWidget';
  import Services from '../services';
  import MiniStatistic from '../components/widgets/statistic/MiniStatistic';
  import LinearStatistic from '../components/widgets/statistic/LinearStatistic';
  import CircleStatistic from '../components/widgets/statistic/CircleStatistic';
  import EChart from '../components/chart/echart';
  import ApiConnection from '../services/api'

  export default {
    components: {
      // CircleStatistic,
      MiniStatistic,
      // LinearStatistic,
      // EChart,
      // VWidget,
    },
    data () {
      return {
        User: [],
        var_teste:'',
        aux: [],
        page_title: '',
        btn_search: false,
        checkedItems: [],
        itemsToDelete: [],
        all_selected: false,
        pagination: {
          sortBy: 'titulo'
        },
        search: '',
        selected: [],
        new_author: false,
        novaOrdem: '',
        novoNome: '',
        novaCategoria: '',
        number_of_fields: 0,
        deleteSeveralItemsDialog: false,
        dialog: false,
        dialogView: false,
        headers: [],
        items: [
          { text: 'conteúdo', value: 'conteudo'},
        ],
        artigos: [],  
        editedIndex: -1,
        visualizedIndex: -1,
        editedItem: {},
        defaultItem: {},
        visualizedItem: {},
        item: '',
        loading: true
      }
    },
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
        },

        // saude(){
        //   return null
        // },

        // educacao(){
        //   return null
        // },

        // transporte(){
        //   return null
        // },

        // seguranca(){
        //   return null
        // },

        btnDeleteSeveralItems () {
          if (this.selected.length > 0) {
            return true
          } else {
            return false
          }
        }
      },

      mounted(){
        ApiConnection.ApiGet('http://ec2-34-238-118-3.compute-1.amazonaws.com:3005/message').then(resposta => {
          var tempUser = []
          this.item = resposta.data.message
          console.log(this.item)

          // console.log(tempUser)
          for(var i = 0; i < this.item.length; i++){
            tempUser.push({
              content : this.item[i].content
            });
          }
           this.User = tempUser
        });
        this.loading = false
       
      },

      watch: {
        dialog (val) {
          val || this.close()
        }
      },

      created () {
        this.initialize()
        this.addFirstField()
      },

      methods: {

        initialize () {
          this.artigos = this.artigo
        },

        toggleAll () {
          if (this.selected.length) this.selected = []
          else this.selected = this.artigos.slice()
        },

        // header-methods
        changeSort (column) {
          if (this.pagination.sortBy === column) {
            this.pagination.descending = !this.pagination.descending
          } else {
            this.pagination.sortBy = column
            this.pagination.descending = false
          }
        },

        // crud-table-methods
        addField () {
          this.novaOrdem = '';
          this.novoNome = '';
          this.novaCategoria = '';
          this.new_author = true;
          this.number_of_fields += 1
        },

        newAuthor () {
          if (typeof this.editedItem.autores == "undefined" || !(this.editedItem.autores instanceof Array)){
            this.editedItem.autores = [];
          }
          this.number_of_fields = 0
          console.log(this.number_of_fields)
          this.editedItem.autores.push({ ordem: this.novaOrdem, nome: this.novoNome, categoria: this.novaCategoria });
            for (var i = 0; i < this.editedItem.autores.length; i++) {
            console.log(this.editedItem.autores[i].nome)
          }
        },

        addFirstField () {
          if (this.number_of_fields == 0 && this.formTitle === 'Novo Item') {
            this.addField()
          }
        },

        cancelAuthor () {
          this.number_of_fields = 0
        },

        visualizeItem (item) {
          this.visualizedIndex = this.artigos.indexOf(item)
          this.visualizedItem = Object.assign({}, item)
          this.dialogView = true
        },

        editItem (item) {
          this.editedIndex = this.artigos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        deleteOneItem (item) {
          const index = this.artigos.indexOf(item)
          confirm('Tem certeza que deseja deletar esse item?') && this.artigos.splice(index, 1)
        },

        deleteSeveralItems (selected) {
          for (var i = 0; i <= this.selected.length; i++) {
            const index = this.artigos.indexOf(this.selected[i])
            this.artigos.splice(index, 1)
          }
          this.selected = []
          this.deleteSeveralItemsDialog = false;
        },

        openDialogDeleteSeveralItems () {
          this.deleteSeveralItemsDialog = true;
        },

        close () {
          // #Dialog de edição e criação
          this.dialog = false
          // #Dialog de edição e criação
          this.dialogView = false
          // #Dialog para deletar itens selecionados
          this.deleteSeveralItemsDialog = false
          setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          }, 300)
        },

        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.artigos[this.editedIndex], this.editedItem)
          } else {
            this.artigos.push(this.editedItem)
          }
          this.close()
        },
      }
    }

</script>

<style>

  .title {
    font-size:30px;
    color: rgb(0, 94, 182);
  }

  p {
    font-size: 20px;
    color: rgb(0, 94, 182);
    }

   .hover:hover {
    background-color: rgb(238, 238, 238);
  }
  .autores {
    border-bottom: 1px solid rgb(224, 224, 224);
  }

  .autores td{
    padding: 5px;
  }

  .addAutores td {
    padding: 5px;
  }

  table, th, td tr {
    border-collapse: collapse;
    padding: 5px;
    text-align: left;
  }

  .actions {
    max-width: 1px;
  }

</style>