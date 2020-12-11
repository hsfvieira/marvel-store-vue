<template>
  <input name="buscar" placeholder="Buscar Quadrinho" v-model="comicTitle" />
  <div class="store"> 
    <Comic v-for="comic in comics" :key="comic.id" :title="comic.title" :image="comic.thumbnail" :price="comic.prices[0].price"></Comic>
  </div>
  <button @click="previousPage()">Voltar</button>
  <button @click="nextPage()">Próxima</button>
</template>

<script>
import getData from './lib/api'
import Comic from './components/Comic'

export default {
  components: {
    Comic
  },
  data() {
    return {
      comics: [],
      comicTitle: '',
      offset: 0
    }
  },
  async mounted() {
    const { data: { results: comics } } = await getData(this.comicTitle, this.offset)
    this.comics = comics
  },
  watch: {
    async comicTitle() {
      const { data: { results: comics } } = await getData(this.comicTitle, this.offset)
      this.comics = comics
    }
  },
  methods: {
    async nextPage() {
      this.offset += 20
      const { data: { results: comics } } = await getData(this.comicTitle, this.offset)
      this.comics = comics
    },
    async previousPage() {
      this.offset = this.offset - 20 <= 0 ? 0 : this.offset - 20
      const { data: { results: comics } } = await getData(this.comicTitle, this.offset)
      this.comics = comics
    }
  }
}

</script>

<style scoped>
.store {
  display: flex;
  flex-wrap: wrap;
}
</style>