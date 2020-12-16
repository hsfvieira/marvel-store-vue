<template>
<div class="comic">
    <img :src="data.thumbnail.path + '/portrait_incredible.' + data.thumbnail.extension" />
    <div>
        <div>
            <h2 :title="data.title">{{ titleSlice }}</h2>
            <p>{{ priceFormated }}</p>
        </div>
        <button @click="addToCart(data)">Comprar</button>
    </div>
</div>
</template>

<script>
import { computed } from 'vue'
import { addToCart } from '../lib/cart'

export default {
    props: {
        data: Object,
		currencyValue: Number
    },
    setup(props) {
        const priceFormated = computed(() => {
			const price = (props.data.prices[0].price * props.currencyValue).toFixed(2)
            return `R$ ${price.replace(/\./, ',')}`
        })

        const titleSlice = computed(() => {
            return props.data.title.replace(/^(.{40})(.+)/, '$1...')
        })

        return { priceFormated, titleSlice, addToCart }
    }
}
</script>

<style scoped>
.comic {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin: 10px;
    padding: 10px;
    font-family: sans-serif;
    border: 1px solid black;
    border-radius: 5px;
    transition: opacity 0.2s;
}

.comic:hover {
    opacity: 0.8;
}

.comic * {
    width: 100px;
}

.comic > div {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}

.comic > div > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.comic div h2 {
    font-size: 14px;
}

.comic div h2, .comic div p {
    margin: 0;
    cursor: default;
}

.comic div p {
    font-size: 10px;
}

.comic div button {
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

.comic div button:hover {
    background-color: #94becc;
    border-bottom: 2px solid #4cabca;
}
</style>
