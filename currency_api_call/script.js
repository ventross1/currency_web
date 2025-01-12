let selectedCurrency = "eur";
const currencySelector = document.getElementById("currency-selector");
const currencyContainer = document.getElementById("currencyContainer");

async function fetchCurrencies() {
  const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrency}.json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();

    const currencies = data[selectedCurrency];

    currencyContainer.innerHTML = "";

    for (const [currency, price] of Object.entries(currencies)) {
      const currencyDiv = document.createElement("div");
      currencyDiv.classList.add("currency");

      currencyDiv.innerHTML = `
        <h4>${currency.toUpperCase()}</h4>
        <p>Price: ${price.toFixed(3)}</p>
      `;

      currencyContainer.appendChild(currencyDiv);
    }
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

currencySelector.addEventListener("change", (event) => {
  selectedCurrency = event.target.value;
  fetchCurrencies();
});

setInterval(() => {
  fetchCurrencies();
  console.log("currencies updated");
}, 30000);

fetchCurrencies();
