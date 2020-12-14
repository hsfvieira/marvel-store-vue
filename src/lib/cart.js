export function verifyCartExists() {
    !localStorage.cart ? localStorage.cart = JSON.stringify([]) : null
}

export function cleanCart() {
    localStorage.cart = JSON.stringify([])
}