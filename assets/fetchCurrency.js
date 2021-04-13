var responseData = ""
var currencyTo = "AUD"

function fetchCurrency (){
   // var currencyTo = $currencySelector.value
    fetch(currencyUrl)
    .then(response => response.json())
    .then(data => {
        responseData = data;
        var exchangeRate = responseData.USD_AUD //get exchange rate from the call
        var USDval = parseInt($currentPrice.innerHTML.split(" ")[0].split("$")[1])  //may need to change to a number
        var totVal = parseInt($cryptoVolumeSelect.value) * USDval * exchangeRate
        $totalValue.innerHTML = "$" + round(totVal,2) + currencyTo //enter value here */
    })
}
