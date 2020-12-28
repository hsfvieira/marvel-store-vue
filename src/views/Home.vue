<template>
  <input placeholder="Buscar Quadrinho" v-model.trim="comicTitle" />
  <router-link to="/cart">
    <button>Ir ao carrinho</button>
  </router-link>
  <div class="store"> 
    <comic :currencyValue="currency" v-for="comic in comics" :key="comic.id" :data="comic" ></comic>
  </div>
  <button @click="previousPage()">Voltar</button>
  <button @click="nextPage()">Próxima</button>
</template>

<script>
import getData from '../lib/comic'
import getDataCurrency from '../lib/currency'
import Comic from '../components/Comic'

export default {

  components: {
    Comic
  },
  data() {
    return {
      comicTitle: '',
      comics: [],
      total: 0,
      offset: 0,
      currency: 0
    }
  },
  async mounted() {
    this.currency = await getDataCurrency('BRL') 
    const { data: { results: newComics, total: newTotal } } = await getData(this.comicTitle, this.offset)
    this.comics = newComics
    this.total = newTotal
  },
  methods: {
    async nextPage() {
      if(this.offset + 20 >= this.total) {
        return null
      }

      this.offset += 20
      const { data: { results: newComics, total: newTotal } } = await getData(this.comicTitle, this.offset)
      this.comics = newComics
      this.total = newTotal
    },
    async previousPage() {
      this.offset = this.offset - 20 <= 0 ? 0 : this.offset - 20
      const { data: { results: newComics, total: newTotal } } = await getData(this.comicTitle, this.offset)
      this.comics = newComics
      this.total = newTotal
    }
  },
  watch: {
    async comicTitle() {
      this.offset = 0
      const { data: { results: newComics, total: newTotal } } = await getData(this.comicTitle, this.offset)
      this.comics = newComics
      this.total = newTotal
    }
  }

}

</script>

<style scoped>
.store {
  display: flex;
  flex-wrap: wrap;
}

button {
    color: white;
    font-weight: bold;
    padding: 5px;
    border: none;
    border-bottom: 2px solid #217692;
    border-radius: 2px;
    background-color: #4cabca;
    cursor: pointer;
    transition: background-color 0.2s, border-bottom 0.2s;
}

button:hover {
    background-color: #94becc;
    border-bottom: 2px solid #4cabca;
}

</style>
