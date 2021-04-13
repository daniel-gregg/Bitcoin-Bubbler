$currentPrice = document.getElementById("current-price")
$priceValueChange = document.getElementById("price-value-change")
$pricePercentChange = document.getElementById("price-percent-change")
$priceGraph = document.getElementById("price-graph")
$cryptoVolumeSelect = document.getElementById("crypto-volume")
$currencySelector = document.getElementById("currency-selector")
$totalValue = document.getElementById("total-value-display")

const timer = 20000  //20 seconds

var cryptoIDS = "BTC"

var currencyTo = "AUD"

const currencyAPI = "5b18dc0b380cd7e1066a"
const currencyUrl = `https://free.currconv.com/api/v7/convert?q=USD_${currencyTo}&compact=ultra&apiKey=${currencyAPI}`

const cryptoHistoricalUrl = "https://api.coindesk.com/v1/bpi/historical/close.json"
const cryptoCurrentUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"

//For later!!
//object.entries(OBJ) gets the [key:value] pairings as an array (leng = 30) of arrays (len = 2)
//object.values(OBJ) gets the values
//object.keys(OBJ) gets the keys

function init(){
    fetchCurrentPrice();
    fetchHistoricalPrice();
    //to do:
    // render line graph

    setInterval(fetchCurrentPrice, timer);    
}

function valChangeCalc(array){
    var valChange = array[array.length-1] - array[0]
    return valChange
}

function percentChangeCalc(array){
    var percentChange = array[array.length-1] - array[0]
    percentChange = percentChange/array[0]
    return percentChange
}

//rounding function
const round = (number, decimalPlaces) =>
    Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces) 

function renderCurrentPrice(){
    $currentPrice.innerHTML = price
    //this comes from a setInterval that calls the API every 20 seconds and sets the 'price' variable
}

function fetchCurrentPrice(){
    fetch(cryptoCurrentUrl)
    .then(response => response.json())
    .then(data => {
        $currentPrice.innerHTML = "$" + round(data.bpi.USD.rate_float,2) + " USD";
    })
}

function fetchHistoricalPrice(){
    fetch(cryptoHistoricalUrl)
    .then(response => response.json())
    .then(data => {
        requestData = data;
        historicalPrices = Object.values(requestData.bpi)
        $priceValueChange.innerHTML = "$" + round(valChangeCalc(historicalPrices),2) + " USD"
        $pricePercentChange.innerHTML = round(percentChangeCalc(historicalPrices),2)*100 + "%"
    })
}

var currencyTo = "AUD"

function fetchCurrency (){
    //var currencyTo = $currencySelector.value
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        responseData = data;
        var exchangeRate = responseData.USD_AUD //get exchange rate from the call
        var USDval = parseInt($currentPrice.innerHTML.split(" ")[0].split("$")[1])  //may need to change to a number
        var totVal = parseInt($cryptoVolumeSelect.value) * USDval * exchangeRate
        $totalValue.innerHTML = "$" + round(totVal,2) + currencyTo //enter value here
    })
}

//call functions and start timer
init()
