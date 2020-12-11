<template>
<div class="comic">
    <img :src="image.path + '/portrait_incredible.' + image.extension" />
    <div>
        <div>
            <h2 :title="title">{{ titleSlice }}</h2>
            <p>{{ priceFormated }}</p>
        </div>
        <button>Comprar</button>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        image: Object,
        price: Number
    },
    computed: {
        priceFormated() {
            const priceString = this.price.toFixed(2).toString()
            return `R$ ${priceString.replace(/\./, ',')}`
        },
        titleSlice() {
            return this.title.replace(/^(.{40})(.+)/, '$1...')
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
    justify-content: space-around;
}

.comic > div > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
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