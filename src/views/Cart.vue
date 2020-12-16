<template>
    <div class="cart">
        <ol>
            <li v-for="comic in comicsInCart" :key="comic.id">
                
                <img :src="comic.thumbnail.path + '/portrait_incredible.' + comic.thumbnail.extension" />
                <div>
                    <p>{{ comic.title }}</p>
                    <p>Quantidade: {{ comic.quantity }}</p>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'


export default {
    setup() {

        const comicsInCart = ref([])

        onMounted(() => {
            comicsInCart.value = JSON.parse(localStorage.cart)
        })

        return { comicsInCart }
    }
}
</script>

<style scoped>
.cart ol {
    margin: 0;
    padding: 0;
}

.cart ol li {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 10px;
}

.cart ol li img {
    width: 100px;
}

.cart ol li * {
    margin-left: 10px;
}


</style>