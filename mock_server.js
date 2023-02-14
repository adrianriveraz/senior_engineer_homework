// Importing the http module
const http = require("http")

// Creating server
const server = http.createServer((req, res) => {
    // Sending the response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-RapidAPI-Key', '*');
    res.setHeader('X-RapidAPI-Host', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

    res.end(JSON.stringify({
        "amount": "1.0000",
        "base_currency_code": "BRL",
        "base_currency_name": "Australian Dollar",
        "rates": {
          "BRL": {
            "currency_name": "Australian Dollar",
            "rate": "2.2453",
            "rate_for_amount": "1.0000"
          }
        },
        "status": "success",
        "updated_date": "2019-07-05"
      }));
    res.end();
})

// Server listening to port 4000
server.listen((4000), () => {
    console.log("Mock RapidAPI Currency Server is Running");
})