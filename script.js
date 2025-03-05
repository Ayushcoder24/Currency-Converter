const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convert");
const resultDiv = document.getElementById("result");
const swapBtn = document.querySelector(".swap");
const select = document.querySelector("select");
const fromflag = document.getElementById("fromFlag");
const toflag = document.getElementById("toFlag");

function updateFlags() {
    const fromCountry = fromCurrency.options[fromCurrency.selectedIndex].getAttribute("data-country");
    const toCountry = toCurrency.options[toCurrency.selectedIndex].getAttribute("data-country");
    fromflag.src = `https://flagsapi.com/${fromCountry}/flat/64.png`;
    toflag.src = `https://flagsapi.com/${toCountry}/flat/64.png`
}

fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);

swapBtn.addEventListener("click", () => {
    let tempCurrency = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;
    updateFlags();
});

convertBtn.addEventListener("click", async () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (amount <= 0) {
        resultDiv.innerHTML = "Enter a valid amount";
        return;
    }
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        
        resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
});
