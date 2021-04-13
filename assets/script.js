$cryptoSelect = document.getElementById("crypto-selector").value
$priceOverlay = document.getElementById("price").innerHTML
$cryptoVolumeSelect = document.getElementById("crypto-volume").value
$currencySelector = document.getElementById("currency-selector").value

var currentPriceFetch = ""
var historicalPriceFetch = ""
var conversionFactor = 0
var cryptoIDS = "BTC"

var currencyTo = "AUD"
var currencyFrom = "USD"

const currencyAPI = "5b18dc0b380cd7e1066a"
const currencyUrl = `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=${currencyAPI}`

const cryptoHistoricalUrl = "https://api.coindesk.com/v1/bpi/historical/close.json"
const cryptoCurrentUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"


fetchCurrentPrice = function(){
    fetch(cryptoCurrentUrl)
    .then(response => response.json())
    .then(data => {
        currentPriceFetch = data;
    })
}

fetchHistoricalPrice = function(){
    fetch(cryptoHistoricalUrl)
    .then(response => response.json())
    .then(data => {
        historicalPriceFetch = data;
    })
}

fetchCurrency = function(){
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        conversionFactor = data;
    })
}
