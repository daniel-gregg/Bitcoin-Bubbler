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

$submitExchangeRateRequest.addEventListener("submit", fetchCurrency)
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

    //save the agreement value (true) to local storage to remove future popups for same user
    var agreeCheck = true
    localStorage.setItem("agree",JSON.stringify(agreeCheck))
}

function init(){
    fetchCurrentPrice();
    fetchHistoricalPrice();
    //to do:
    // render line graph

    setInterval(fetchCurrentPrice, timer); 
    checkLocal()  //check local storage for checked box already 
}

function checkLocal(){
    if(localStorage.getItem("agree")==null){
        agreeCheck=false
    } else {
        agreeCheck = JSON.parse(localStorage.getItem("agree"))
    }
    toggleModal(agreeCheck) // toggle modal off if already checked
}

function toggleModal(bool){
    if(bool==true){
        $modal.style.display = "none"
    }
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



function fetchCurrency (event){
    event.preventDefault()
    var currencyTo = $currencySelector.value
    var currencyUrl = `https://free.currconv.com/api/v7/convert?q=USD_${currencyTo}&compact=ultra&apiKey=${currencyAPI}`
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        responseData = data;
        var exchangeRate = responseData[`USD_${currencyTo}`] //get exchange rate from the call
        var USDval = Math.round($currentPrice.innerHTML.split(" ")[0].split("$")[1]*100)/100  //may need to change to a number
        var totVal = Math.round($cryptoVolumeSelect.value*100)/100 * USDval * exchangeRate
        totVal = round(totVal,0)
        $totalValue.innerHTML = formatCurrency(totVal,currencyTo) //enter value here
    })
}

function formatCurrency(val,currencyString){
    var number = round(valChangeCalc(val),2)
    formattedNumber = Intl.NumberFormat('en-US',{style:"currency", currency: currencyString}).format(val)
    return formattedNumber
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
                    label: 'Bitcoin historical prices (31 days)',
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

