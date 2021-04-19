<h1> Bitcoin-Bubbler </h1>

<h3>Description</h3>
As our first project we are creating a crypto-currency app, which dynamically generates prices for primarily bitcoin, but with future implementation, all sorts of other cryptos. The app takes current prices and trends and displays them for users, aswell as allow users to log their current currencies and amounts to show what the value is of their crypto-wallet. The app also takes the value of bitcoin and the value of the users wallet and display them in whichever currency that would like it displayed.

<h3> User Story</h3>

- I want to view crypto currencies trends 
- SO That I can see whether to buy or sell cryto-currencies

- I want to see the value of my chosen coin in my preffered currency
- so that I can see how many I can purchase

- I want to see how much my total currencies I own are worth
- SO that I can see the total wealth I have accumulated 

<h3>APIs Used</h3>

 <b>- CoinDesk</b>
 CoinDesk provides a simple API to make Bitcoin Price Index data, and it is free to use. This bitcoins exchanges are only included in the US dollar, EUR, and GBP calculation in Json value. BPI from this API is updated per minute, therefore we are able to pull current value and past 60 days value from it.
 
 <b>- Currencyconverter API</b>
 Free Currencyconverter API is also a free API provided for developers to convert currency as they needed. It let us pull 100 requests per hour, and currency values are updated every 60 minutes. In this project we have fetch value for AUD, CAD, COP, CYN, GBP, JYP, NZP, USD, VND, and ZAR.


<h3>Fetch</h3>

In this project, we fetch Json data from CoinDesk for the current price, then last month price, comparing them and show what is the monthly change in percentage. We then fetch the past 31 days value to put into the line chart to show the trend. At the end we allow user to enter the numbers of the coin they want to check, use that data to do calculation with the currency exchange value we fetched, and calculate amount of it's worth to the user.


<h3>Usage</h3>

To use the app, simply input into the "amount of coins" box the amount of bitcoins you currently own, and then which currency you would like the value displayed in and then the app will calculate the value using the most recent pricing of both bitcoin and the currency being converted. On first visit to the site, a modal shall prompt the user with a checkbox and sumbit button, breifing the user on the pyramid scheme inwhich bitcoin operates. Then the user will see a graph plotting the recent monthly trend of bitcoin prices, giving the user an insight into whether the currency is rising or falling, which will help them if they're thinking of investing or cashing out. A usd price of bitcoin is also shown, with a monthly change and monthly change %, for the most simplistic show of change.



<b>Credits</b>
- Peter Bruckner
- Daniel Gregg 
- Georgia Hunt
- Steven Ng

<b>Links:</b>

