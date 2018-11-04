<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-4"
                fab
                small
                flat
                @click.native="close"
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-actions>
            <v-card-text>
              <v-container >
                <v-layout>
                  <v-flex >
                    <h3>{{selectedItem.parametro_pdf_1}}</h3>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <div class="text-xs-center">
          <v-progress-linear
            :indeterminate="true"
            v-if="loading"
            color="primary"
          ></v-progress-linear>
        </div>
        <div v-if="!loading">
          <v-card flat>
            <v-card-title>
              <h3>Programa: {{this.$store.state.programa.ies_programa}}</h3>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          </v-card>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="DadosCapes"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td style="width:80px">{{props.item.id}}</td>
              <td>
                <span style="padding-bottom:100px">{{props.item.consulta}}
                </span>
              </td>
              <td style="width:200px">
                <span style="padding-bottom:100px">{{props.item.conceito}}: {{props.item.porcentagem}}%</span>
                <v-progress-linear :value="props.item.porcentagem"
                  height="10"
                  :color="props.item.color">
                </v-progress-linear>
              </td>
              <td style="width:30px">
                <v-btn
                  flat
                  icon
                  small
                  color="primary"
                  @click="selectItem(props.item)">
                    <v-icon>info</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
  import ApiConnection from '../services/api'

  export default {
    data () {
      return {
        DadosCapes: [],
        loading: true,
        indicadores: [],
        ValorDiscenteTesesEDissertacoes: [],
        ConceptDiscenteTesesEDissertacoes: [],
        ValorDocente: [],
        ConceptDocente: [],
        ValorProducao:[],
        ConceptProducao: [],
        api: null,
        info: null,
        teste_requisicao: false,
        search: '',
        dialog: false,
        headers: [
          { text: 'Número', value: 'numero' },
          { text: 'Consulta', value: 'consulta' },
          { text: 'Resultado', value: 'resultado' },
          { text: '', value: 'informacao' },
        ],
        desserts: [],
        selectedIndex: -1,
        selectedItem: {},
    }},

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {
      selectItem (item) {
        this.selectedIndex = this.desserts.indexOf(item)
        this.selectedItem = Object.assign({}, item)
        this.dialog = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.selectedItem = Object.assign({})
          this.selectedIndex = -1
        }, 300)
      },
    },
    computed: {
      quadrienio () {
        return DadosCapes;
      },
      requisicao () {
        return requisicao;
      },
    },
   mounted(){
    ApiConnection.ApiGet().then(resposta => {
      this.indicadores = resposta.data[0]
      this.ValorDiscenteTesesEDissertacoes = resposta.data[0]
      this.ConceptDiscenteTesesEDissertacoes = resposta.data[1]
      this.ValorDocente = resposta.data[2]
      this.ConceptDocente = resposta.data[3]
      this.ValorProducao = resposta.data[4]
      this.ConceptProducao = resposta.data[5]
      console.log(this.indicadores)
      this.loading = false
      this.DadosCapes = [
      {
        id: '2.1.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Titulação e atuação do corpo docente do programa',
        porcentagem: this.ValorDocente.titulacao_e_atuacao_do_corpo_docente_do_programa,
        conceito: this.ConceptDocente.titulacao_e_atuacao_do_corpo_docente_do_programa,
        parametro_pdf_1: 'x ≥ 95%: MB; 90 ≤ x < 95%: B; 85% ≤ x < 90%: R; 80% ≤ x < 85%: F; x < 80%: D',
        parametro_pdf_2: '',
      },
      {
        id: '2.1.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Intercâmbio ou renovação do corpo docente',
        porcentagem: this.ValorDocente.intercambio_ou_renovacao_do_corpo_docente,
        conceito: this.ConceptDocente.intercambio_ou_renovacao_do_corpo_docente,
        parametro_pdf_1:'Tem intercâmbio: MB; Tem algum intercâmbio: B; Não tem intercâmbio: R' ,
        parametro_pdf_2: '',
      },
      {
        id: '-',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Exogenia',
        porcentagem: this.ValorDocente.exogenia,
        conceito: this.ConceptDocente.exogenia,
        parametro_pdf_1:'Avaliou-se a composição do corpo docente relativa à proposta do programa no que tange à sua formação. O perfil dos docentes deve mostrar uma diversificação de formação, visando transmitir experiências oriundas de diferentes instituições.' ,
        parametro_pdf_2: '',
      },
      {
        id: '2.2.2.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'No. Total de DP dividido pelo no. total de docentes (permanentes + colaboradores)',
        porcentagem: this.ValorDocente.total_de_docentes_permanentes_dividido_pelo_total_de_docentes,
        conceito: this.ConceptDocente.total_de_docentes_permanentes_dividido_pelo_total_de_docentes,
        parametro_pdf_1:'Avaliou-se a composição do corpo docente relativa à proposta do programa no que tange à sua formação. O perfil dos docentes deve mostrar uma diversificação de formação, visando transmitir experiências oriundas de diferentes instituições.' ,
        parametro_pdf_2: '',
      },
      {
        id: '2.2.2.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Dimensão do corpo discente  em relação à dimensão do grupo de DP',
        porcentagem: this.ValorDocente.dimensao_do_corpo_discente_em_relacao_a_dimensao_do_grupo_de_dp,
        conceito: this.ConceptDocente.dimensao_do_corpo_discente_em_relacao_a_dimensao_do_grupo_de_dp,
        parametro_pdf_1:'70% ≤ x ≤ 100%: MB, 60% ≤ x < 70%: B, 50% ≤ x < 60%: R, 40% ≤ x < 50%: F, x < 40%: D' ,
        parametro_pdf_2: '',
      },
      {
        id: '2.3',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Horas-aula ministradas no quadriênio (graduação e pós graduação) em média anual pelos DPs do programa',
        porcentagem: this.ValorDocente.horas_aula_ministradas_no_quadrienio_em_media_anual_pelos_dps_do_programa,
        conceito: this.ConceptDocente.horas_aula_ministradas_no_quadrienio_em_media_anual_pelos_dps_do_programa,
        consulta: 'Dimensão do corpo discente  em relação à dimensão do grupo de DP',
        parametro_pdf_1: '',
        parametro_pdf_2: '',
      },
      {
        id: '2.4.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Percentagem de DPs que ministram aulas na graduação',
        porcentagem: this.ValorDocente.percentagem_de_dps_que_ministram_aulas_na_graduacao,
        conceito: this.ConceptDocente.percentagem_de_dps_que_ministram_aulas_na_graduacao,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '2.4.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Docentes',
        consulta: 'Outras Atividades (Orientação e Iniciação Científica na Graduação e Programa de Estágio de Docência)',
        porcentagem: this.ValorDocente.outras_atividades,
        conceito: this.ConceptDocente.outras_atividades,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.1.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Número médio de orientações concluídas por docente permanente no quadriênio',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.numero_medio_de_orientacoes_concluidas_por_docente_permanente_no_quadrienio,
        conceito: this.ConceptDiscenteTesesEDissertacoes.numero_medio_de_orientacoes_concluidas_por_docente_permanente_no_quadrienio,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.1.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Titulados/dimensão do corpo discente (matriculados no início do ano) 2017, <Doutorado>',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.doutores_titulados_divididos_pela_dimensao_do_corpo_discente[0],
        conceito: this.ConceptDiscenteTesesEDissertacoes.doutores_titulados_divididos_pela_dimensao_do_corpo_discente,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.1.3',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Titulados/dimensão do corpo discente (matriculados no início do ano) 2017, <Mestrado>',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.mestres_titulados_divididos_pela_dimensao_do_corpo_discente,
        conceito: this.ConceptDiscenteTesesEDissertacoes.mestres_titulados_divididos_pela_dimensao_do_corpo_discente,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '-',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Proporção Mestres / Doutores Titulados  (indicador fora do caderno CAPES)',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.proporcao_mestres_por_doutores_titulados,
        conceito: this.ConceptDiscenteTesesEDissertacoes.proporcao_mestres_por_doutores_titulados,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.1.4',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Discentes Titulados por Docentes Permanentes (multiplicar por 2 titulados no doutorado)',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.discentes_titulados_por_docentes_permanentes,
        conceito: this.ConceptDiscenteTesesEDissertacoes.discentes_titulados_por_docentes_permanentes,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.2.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Teses e Dissertações defendidas pelos 25% de DP que mais orientaram',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.teses_e_dissertacoes_defendidas_pelos_25_porcento_de_DP_que_mais_orientaram,
        conceito: this.ConceptDiscenteTesesEDissertacoes.teses_e_dissertacoes_defendidas_pelos_25_porcento_de_DP_que_mais_orientaram,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.3.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Discentes Autores',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.discentes_autores,
        conceito: this.ConceptDiscenteTesesEDissertacoes.discentes_autores,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.3.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Qualificação das Bancas: Percentagem de Doutores',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.qualificacao_das_bancas,
        conceito: this.ConceptDiscenteTesesEDissertacoes.qualificacao_das_bancas,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.3.3',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Exogenia nas bancas (Mestrado)',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.exogenia_nas_bancas_mestrado,
        conceito: this.ConceptDiscenteTesesEDissertacoes.exogenia_nas_bancas_mestrado,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.3.3',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Exogenia nas bancas (Doutorado)',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.exogenia_nas_bancas_doutorado,
        conceito: this.ConceptDiscenteTesesEDissertacoes.exogenia_nas_bancas_doutorado,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.3.4',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Prêmios de dissertações e teses concedidos no quadriênio',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.premios_de_dissertacoes_e_teses_concedidos_no_quadrienio,
        conceito: this.ConceptDiscenteTesesEDissertacoes.premios_de_dissertacoes_e_teses_concedidos_no_quadrienio,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.4.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Tempo Médio de Titulação no Mestrado',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.tempo_medio_de_titulacao_no_mestrado,
        conceito: this.ConceptDiscenteTesesEDissertacoes.tempo_medio_de_titulacao_no_mestrado,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '3.4.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Discentes',
        consulta: 'Tempo Médio de Titulação no Doutorado',
        porcentagem: this.ValorDiscenteTesesEDissertacoes.tempo_medio_de_titulacao_no_doutorado,
        conceito: this.ConceptDiscenteTesesEDissertacoes.tempo_medio_de_titulacao_no_doutorado,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '4.1',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Produção Intelectual',
        consulta: 'Produção Intelectual',
        porcentagem: this.ValorProducao.publicacoes_por_docente_permantente,
        conceito: this.ConceptProducao.publicacoes_por_docente_permantente,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '4.2',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Produção Intelectual',
        consulta: 'Medida de concentração da produção',
        porcentagem: this.ValorProducao.distribuicao_de_publicacoes_por_docente_permanente,
        conceito: this.ConceptProducao.distribuicao_de_publicacoes_por_docente_permanente,
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
      },
      {
        id: '4.3',
        ano: '2014 - 2017',
        ies_programa: '',
        categoria: 'Produção Intelectual',
        consulta: 'Registrar se há informação sobre produção técnica no quadriênio',
        porcentagem: 'this.ValorProducao.outras_producoes_relevantes',
        conceito: 'this.ConceptProducao.outras_producoes_relevantes',
        parametro_pdf_1:'' ,
        parametro_pdf_2: '',
        },
      ]
    })
  },
}
</script>