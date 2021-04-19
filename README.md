# Bitcoin-Bubbler

<b>Description</b>
As our first project we are creating a crypto-currency app, which will dynamically generate prices for primarily bitcoin but also all sorts of other cryptos. The app will take current prices and trends and display them for users, aswell as allow users to log their current currencies and amounts to show what the value is of their crypto-wallet. The app will also take the value of the current crypto and the value of the users wallet and display them in whichever currency that would like it displayed.

<b> User Story</b>

- I want to view crypto currencies trends 
- SO That I can see whether to buy or sell cryto-currencies

- I want to see the value of my chosen coin in my preffered currency
- so that I can see how many I can purchase

- I want to see how much my total currencies I own are worth
- SO that I can see the total wealth I have accumulated 

<b>APIs Used</b>
 - CoinDesk
    CoinDesk provides a simple API to make Bitcoin Price Index data, and it is free to use. This bitcoins exchanges are only included in the US dollar, EUR, and GBP calculation in Json value. BPI from this API is updated per minute, therefore we are able to pull current value and past 60 days value from it.
 - Currconv
    Free Forex API is also a free API provided for developers to convert currency as they needed. It let us pull 100 requests per hour, and currency values are updated every 60 minutes. In this project we have fetch value for AUD, CAD, COP, CYN, GBP, JYP, NZP, USD, VND, and ZAR.

<b>Fetch</b>
In this project, we fetch Json data from CoinDesk for the current price, then last month price, comparing them and show what is the monthly change in percentage. We then fetch the past 31 days value to put into the line chart to show the trend. At the end we allow user to enter the numbers of the coin they want to check, use that data to do calculation with the currency exchange value we fetched, and calculate amount of it's worth to the user.