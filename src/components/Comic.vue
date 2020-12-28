<template>
<div class="comic">
    <img :src="data.thumbnail.path + '/portrait_incredible.' + data.thumbnail.extension" />
    <div>
        <div>
            <router-link :to="'/comic/' + data.id"><h2 :title="data.title">{{ titleSlice }}</h2></router-link>
            <p>{{ priceFormated }}</p>
        </div>
        <button @click="addToCart(data)">Comprar</button>
    </div>
</div>
</template>

<script>
import { addToCart } from '../lib/cart'

export default {
    props: {
        data: Object,
		currencyValue: Number
    },
    data() {
        return {
            addToCart
        }
    },
    computed: {
        priceFormated() {
            const price = (this.data.prices[0].price * this.currencyValue).toFixed(2)
            return `R$ ${price.replace(/\./, ',')}`
        },
        titleSlice() {
            return this.data.title.replace(/^(.{40})(.+)/, '$1...')
        }
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

.comic div a {
    text-decoration: none;
    color: black;
}

.comic div a h2 {
    font-size: 14px;
}

.comic div a h2, .comic div p {
    margin: 0;
}

.comic div p {
    font-size: 10px;
    cursor: default;
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
