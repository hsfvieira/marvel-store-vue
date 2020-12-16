<template>
  <input placeholder="Buscar Quadrinho" v-model.trim="comicTitle" />
  <router-link to="/cart">
    <button>Ir ao carrinho</button>
  </router-link>
  <div class="store"> 
    <Comic :currencyValue="currency" v-for="comic in comics" :key="comic.id" :data="comic" ></Comic>
  </div>
  <button @click="previousPage()">Voltar</button>
  <button @click="nextPage()">Próxima</button>
</template>

<script>
import getData from '../lib/api'
import getDataCurrency from '../lib/currency'
import Comic from '../components/Comic'
import { onMounted, ref, watch } from 'vue'

export default {

  components: {
    Comic
  },

  setup() {
    
    const comicTitle = ref('')
    const comics = ref([])
    const total = ref(0)
    const offset = ref(0)
	const currency = ref(0)

    /*hooks*/
    onMounted(async () => {
      currency.value = await getDataCurrency('BRL') 
      const { data: { results: newComics, total: newTotal } } = await getData(comicTitle.value, offset.value)
      comics.value = newComics
      total.value = newTotal
    })

    /*methods*/
    async function nextPage() {
      if(offset.value + 20 >= total.value) {
        return null
      }

      offset.value += 20
      const { data: { results: newComics, total: newTotal } } = await getData(comicTitle.value, offset.value)
      comics.value = newComics
      total.value = newTotal
    }

    async function previousPage() {
      offset.value = offset.value - 20 <= 0 ? 0 : offset.value - 20
      const { data: { results: newComics, total: newTotal } } = await getData(comicTitle.value, offset.value)
      comics.value = newComics
      total.value = newTotal
    }

    /*watches*/
    watch([comicTitle], async () => {
      offset.value = 0
      const { data: { results: newComics, total: newTotal } } = await getData(comicTitle.value, offset.value)
      comics.value = newComics
      total.value = newTotal
    })

    return { nextPage, previousPage, comicTitle, comics, total, offset, currency }
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
