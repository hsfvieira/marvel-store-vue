<template>
    <div class="store"> 
      <Comic v-for="comic in comics" :key="comic.id" :title="comic.title" :image="comic.thumbnail" :price="comic.prices[0].price"></Comic>
    </div>
  
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
      comics: []
    }
  },
  async mounted() {
    const { data: { results: comics } } = await getData()
    this.comics = comics
  }
}

</script>

<style scoped>
.store {
  display: flex;
  flex-wrap: wrap;
}
</style>