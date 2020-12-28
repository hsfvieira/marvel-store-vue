<template>
  <p>{{ comic.title }}</p>
  <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" />
  <h3>Data de Publicação</h3>
  <p>{{ dataPublicado }}</p>
  <h3>Criadores</h3>
  <ul>
    <li v-for="creator in comic.creators.items" :key="creator.resourceURI">
      {{ valueUpper(creator.role) }} - {{ creator.name }}
    </li>
  </ul>
  <h3>Preço</h3>
  <p>{{ priceFormated }}</p>
</template>

<script>
import { getDataComic } from '../lib/comic'
import getDataCurrency from '../lib/currency'

export default {
  data() {
    return {
      comic: {
        thumbnail: {},
        dates: [],
        creators: {},
        prices: []
      },
      currency: 0
    }
  },
  async mounted() {
    this.currency = await getDataCurrency('BRL')
    this.comic = (await getDataComic(this.$route.params.id)).data.results[0]
  },
  computed: {
    dataPublicado() {
      if(!this.comic.dates.length) {
        return '00/00/0000'
      }
      const data = this.comic.dates.filter(date => {
        return date.type == 'onsaleDate'
      })
      const dataObj = new Date(data[0].date)
      return `${dataObj.getDate()}/${dataObj.getMonth() + 1}/${dataObj.getFullYear()}`
    },
    priceFormated() {
      if(!this.comic.prices.length) {
        return `R$ 0,00`
      }
      const price = (this.comic.prices[0].price * this.currency).toFixed(2)
      return `R$ ${price.replace(/\./, ',')}`
    },
  },
  methods: {
    valueUpper(value) {
      return value.toUpperCase()
    }
  }
}
</script>