document.addEventListener('DOMContentLoaded', function () {
    const rates = {
        dolar: {
            bolivares: 32.5,
            euro: 0.91
        },
        bolivares: {
            dolar: 1 / 32.5,
            euro: (1 / 32.5) * 0.91
        },
        euro: {
            dolar: 1.1,
            bolivares: 1.1 * 32.5
        }
    };

    const input = document.querySelector('#num input');
    const output = document.querySelector('#result input');
    const fromCurrency = document.getElementById('coin_converter');
    const toCurrency = document.getElementById('coin_result');

    input.addEventListener('input', convertCurrency);
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);

    function convertCurrency() {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = parseFloat(input.value);

        if (isNaN(amount)) {
            output.value = '';
            return;
        }

        if (from === to) {
            output.value = amount;
            return;
        }

        const conversionRate = rates[from][to];
        const convertedAmount = amount * conversionRate;
        output.value = convertedAmount.toFixed(2);
    }
});
