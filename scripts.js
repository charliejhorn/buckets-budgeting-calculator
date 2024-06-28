document.addEventListener('DOMContentLoaded', (event) => {
    let amountInput = document.getElementById('amount-input');
    amountInput.focus();

    let currentAmount = 0;

    let percentages = {
        expenses: 60,
        fire: 20,
        smile: 10,
        splurge: 10
    };

    let sliderValues = getSliderValues(percentages);

    console.log("initial percentages: ", percentages);
    console.log("initial sliderValues: ", sliderValues);

    // event listener for the input field for every keyup event
    amountInput.addEventListener('keyup', () => {
        setTimeout(() => {
            currentAmount = parseFloat(amountInput.value);
            calculateResults(currentAmount, percentages);
            console.log(currentAmount)
        }, 10);
    });

    // slider
    var slider = document.getElementById('percentages-slider');

    noUiSlider.create(slider, {
        start: sliderValues, // Starting points of the handles
        connect: false, // Display a colored bar between the handles
        step: 5, // Increment of the handles
        range: {
            'min': 0,
            'max': 100
        },
        tooltips: true, // Display the value of the handle when moving
        format: wNumb({
            decimals: 0,
            thousand: '.',
            postfix: '%'
        }),
        margin: 5,
    });

    // event listener for the slider
    slider.noUiSlider.on('slide', function (values, handle) {
        console.log(values[handle]); // Log the value of the handle being moved
        // slice the last character of the value off, which is the percentage sign, then return an integer
        values = values.map(value => parseInt(value.slice(0, -1)));
        percentages = getPercentages(values);

        console.log("percentages: ", percentages);
        console.log("values: ", values);
        calculateResults(currentAmount, percentages);
        displayResults(percentages);
    });
});

function calculateResults(amount, percentages) {
    let results = {
        expenses: 0,
        fire: 0,
        smile: 0,
        splurge: 0
    };

    results.expenses = amount * percentages.expenses / 100;
    results.fire = amount * percentages.fire / 100;
    results.smile = amount * percentages.smile / 100;
    results.splurge = amount* percentages.splurge / 100;

    displayResults(results)
}

function displayResults(results) {
    let expensesP = document.getElementById('expenses-result');
    let fireP = document.getElementById('fire-result');
    let smileP = document.getElementById('smile-result');
    let splurgeP = document.getElementById('splurge-result');

    // set each of the elements to the results in the format of $0.00
    expensesP.textContent = '$' + results.expenses.toFixed(2);
    fireP.textContent = '$' + results.fire.toFixed(2);
    smileP.textContent = '$' + results.smile.toFixed(2);
    splurgeP.textContent = '$' + results.splurge.toFixed(2);
}

function getSliderValues(percentages) {
    let values = []
    values[0] = percentages.expenses;
    values[1] = values[0] + percentages.fire;
    values[2] = values[1] + percentages.smile;
    values[3] = values[2] + percentages.splurge;
    console.log("getSliderValues: ", values);
    return values;
}

function getPercentages(values) {
    console.log("getPercentages values input: ", values)
    let percentages = {
        expenses: values[0],
        fire: values[1] - values[0],
        smile: values[2] - values[1],
        splurge: values[3] - values[2]
    };
    console.log("getPercentages: ", percentages);
    return percentages;
}