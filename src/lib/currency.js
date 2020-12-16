function filterCurrencyTarget(data, target) {
	return data.rates[target]
}

export default async function getData(target) {
	const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD')
	const data = await response.json()
	return filterCurrencyTarget(data, target)
}
