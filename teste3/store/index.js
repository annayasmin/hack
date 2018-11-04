import Vue from 'vue'
import Vuex from 'vuex'

// import programa from './programa'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({

    state: {
      programa: {
        ies_programa: 'valor inicial',
        quadrienio: '',
        lista_de_anos: [{
        ano1: 2013,
        ano2: 2014,
        ano3: 2015,
        ano4: 2016,
        ano5: 2017,
        }],
        qtd_anos: '',
        categorias: [],
        dados: '',
      },
     },

  mutations: {
    'PREENCHE_IES_PROGRAMA' (state, payload){
      state.programa = payload
    },

    'CARREGA_DADOS' (state, dados) {
      state.dados = dados
    },
  },

    actions: {},

    // mutations: {},

    getters: {}
  })
}

