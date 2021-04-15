const $currentPrice = document.getElementById("current-price")
const $priceValueChange = document.getElementById("price-value-change")
const $pricePercentChange = document.getElementById("price-percent-change")
const $priceGraph = document.getElementById("price-graph")
const $cryptoVolumeSelect = document.getElementById("crypto-volume")
const $currencySelector = document.getElementById("currency-selector")
const $totalValue = document.getElementById("total-value-display")
const $submitExchangeRateRequest = document.getElementById("getExchangeRate")
const $enter = document.querySelector("#modal-enter")
const $modal = document.querySelector("#modal")
const $checkbox = document.querySelector("#enter-check")
const $modalEnter = document.querySelector('#modal-enter')

$submitExchangeRateRequest.addEventListener("click",fetchCurrency)
$enter.addEventListener("click", clearModal);


const timer = 20000  //20 seconds
var cryptoIDS = "BTC"

const currencyAPI = "5b18dc0b380cd7e1066a"

const cryptoHistoricalUrl = "https://api.coindesk.com/v1/bpi/historical/close.json"
const cryptoCurrentUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json"

$checkbox.addEventListener("change", function (event) {
    $modalEnter.disabled = !event.target.checked;
})

function clearModal(){
    document.querySelector(".modal").setAttribute("style", "display: none")
}

//For later!!
//object.entries(OBJ) gets the [key:value] pairings as an array (leng = 30) of arrays (len = 2)
//object.values(OBJ) gets the values
//object.keys(OBJ) gets the key
//enter.setAttribute("style", "display:none") 
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
        const requestData = data;
        const historicalPricesValues = Object.values(requestData.bpi)
        const historicalPricesKeys = Object.keys(requestData.bpi)
        $priceValueChange.innerHTML = "$" + round(valChangeCalc(historicalPricesValues),2) + " USD"
        $pricePercentChange.innerHTML = round(percentChangeCalc(historicalPricesValues),2)*100 + "%"
        renderChart(historicalPricesValues, historicalPricesKeys);
    })
}



function fetchCurrency (){
    var currencyTo = $currencySelector.value
    var currencyUrl = `https://free.currconv.com/api/v7/convert?q=USD_${currencyTo}&compact=ultra&apiKey=${currencyAPI}`
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        responseData = data;
        var exchangeRate = responseData.USD_AUD //get exchange rate from the call
        var USDval = parseInt($currentPrice.innerHTML.split(" ")[0].split("$")[1])  //may need to change to a number
        var totVal = parseInt($cryptoVolumeSelect.value) * USDval * exchangeRate
        $totalValue.innerHTML = "$" + round(totVal,2) + " " + currencyTo //enter value here
    })
}

function renderChart(values, keys){
    const labels = keys.map( (key) => dayjs(key).format("ddd MMM YYYY") )
    makeChart(labels, values)
}

function makeChart(labels, data){  
    window.chart = new Chart(
        document.getElementById('chart'),
        {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Buttcoin historical prices (31 days)',
                    data: data,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                  }]
            },
            options: {
                maintainAspectRatio: false,
            }
        }
    );
}

//call functions and start timer
init()

