$currentPrice = document.getElementById("current-price")
$priceValueChange = document.getElementById("price-value-change")
$pricePercentChange = document.getElementById("price-percent-change")
$priceGraph = document.getElementById("price-graph")
$cryptoVolumeSelect = document.getElementById("crypto-volume")
$currencySelector = document.getElementById("currency-selector")

const timer = 20000  //20 seconds

var currentPriceFetch = ""
var historicalPrices = ""
var conversionFactor = 0
var cryptoIDS = "BTC"
var requestData = ""

var currencyTo = "AUD"
var currencyFrom = "USD"

const currencyAPI = "5b18dc0b380cd7e1066a"
const currencyUrl = `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=${currencyAPI}`

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

    setInterval(function(){ 
        fetchCurrentPrice(); 
    }, timer);    
}

/* setInterval(function(){ 
    fetchCurrentPrice();

}, timer); */

function renderCurrentPrice(){
    $currentPrice.innerHTML = price
    //this comes from a setInterval that calls the API every 20 seconds and sets the 'price' variable
}

function renderPriceChange(){
    var historical = fetchHistoricalPrice()
    var historicalValues = object.values(historical.bpi)
    var historicalKeys = object.keys(historical.bpi)

    //call valChangeCalc function and render to dom element
    $priceValueChange.innerHTML = valChangeCalc(historicalValues)
    $pricePercentChange.innerHTML = percentChangeCalc(historicalValues)
}

function fetchCurrentPrice(){
    fetch(cryptoCurrentUrl)
    .then(response => response.json())
    .then(data => {
        $currentPrice.innerHTML = data.bpi.USD.rate_float;
    })
}

function fetchHistoricalPrice(){
    fetch(cryptoHistoricalUrl)
    .then(response => response.json())
    .then(data => {
        requestData = data;
        historicalPrices = Object.values(requestData.bpi)
        $priceValueChange.innerHTML = valChangeCalc(historicalPrices[0])
        $pricePercentChange.innerHTML = percentChangeCalc(historicalPrices)
    })
}

function fetchCurrency (){
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        conversionFactor = data;
    })
}


//call functions and start timer
init()
