function verifyCartExists() {
    !localStorage.cart ? localStorage.cart = JSON.stringify([]) : null
}

export function cleanCart() {
    localStorage.cart = JSON.stringify([])
}

export function addToCart(comic) {
    verifyCartExists()

    const cartList = JSON.parse(localStorage.cart)

    const comicFiltered = cartList.filter(comicInCart => {
        return comicInCart.id == comic.id
    })

    if(comicFiltered.length) {
        localStorage.cart = JSON.stringify(
            cartList.map(comicInCart => {
                if(comicInCart.id == comic.id) {
                    comicInCart.quantity += 1
                }
                return comicInCart
            })
        )
        return true
    } else {
        comic.quantity = 1
        cartList.push(comic)
        localStorage.cart = JSON.stringify(cartList)
        return true
    }

}