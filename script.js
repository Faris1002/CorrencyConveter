let fromCurrency = document.getElementById('fromCurrency');
let toCurrency = document.getElementById('toCurrency');
let fromAmount = document.getElementById('fromAmount');
let toAmount = document.getElementById('toAmount');
let rateInfo = document.getElementById('rateInfo');

let currencyList = ['USD', 'EUR', 'INR', 'GBP', 'AUD', 'CAD', 'JPY', 'CHF'];

currencyList.forEach(currency => {
  let option1 = document.createElement('option');
  option1.value = option1.text = currency;
  fromCurrency.appendChild(option1);

  let option2 = document.createElement('option');
  option2.value = option2.text = currency;
  toCurrency.appendChild(option2);
});

fromCurrency.value = 'AUD';
toCurrency.value = 'CAD';

function getExchangeRate() {
  let from = fromCurrency.value;
  let to = toCurrency.value;
  let option={
    method:"GET"
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/`+from,option)
    .then(res => res.json())
    .then(data => {
      let rate = data.rates[to];
      let converted = (fromAmount.value * rate).toFixed(2);
      toAmount.value = converted;
      rateInfo.textContent = `1 ${from} = ${rate} ${to}`;
    })
    .catch(() => {
      rateInfo.textContent = "Error fetching rates.";
    });
}
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);
fromAmount.addEventListener("input", getExchangeRate);

getExchangeRate();
