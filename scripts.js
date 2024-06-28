document.addEventListener('DOMContentLoaded', (event) => {
    let amountInput = document.getElementById('amount-input');
    amountInput.focus();

    let calculatingBool = false;

    let currentAmount = 0;

    let results = {
        expenses: 0,
        fire: 0,
        smile: 0,
        splurge: 0
    }

    let percentages = {
        expenses: 60,
        fire: 20,
        smile: 10,
        splurge: 10
    };

    let elements = {
        expensesP: document.getElementById('expenses-result'),
        fireP: document.getElementById('fire-result'),
        smileP: document.getElementById('smile-result'),
        splurgeP: document.getElementById('splurge-result')
    }

    let sliderValues = getSliderValues(percentages);

    console.log("initial percentages: ", percentages);
    console.log("initial sliderValues: ", sliderValues);

    // event listener for the input field for every keyup event
    amountInput.addEventListener('keyup', () => {
        if (calculatingBool) {
            return;
        }
        calculatingBool = true;
        setTimeout(() => {
            currentAmount = parseFloat(amountInput.value);
            results = calculateResults(currentAmount, percentages);
            displayResults(elements, results);
            console.log(currentAmount)
            calculatingBool = false;
        }, 500);
    });

    // slider
    var slider = document.getElementById('percentages-slider');

    noUiSlider.create(slider, {
        start: sliderValues, // Starting points of the handles
        connect: false, // Display a colored bar between the handles
        step: 2.5, // Increment of the handles
        range: {
            'min': 0,
            'max': 100
        },
        tooltips: true, // Display the value of the handle when moving
        format: wNumb({
            suffix: '%',
            decimals: 1,
            thousand: ','
        }),
        margin: 5,
    });

    // event listener for the slider
    slider.noUiSlider.on('slide', function (values, handle) {
        console.log(values[handle]); // Log the value of the handle being moved
        // slice the last character of the value off, which is the percentage sign, then return an integer
        values = values.map(value => parseFloat(value.slice(0, -1)));
        percentages = getPercentages(values);

        console.log("percentages: ", percentages);
        console.log("values: ", values);
        results = calculateResults(currentAmount, percentages);
        displayResults(elements, results);
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

    console.log("calculateResults: ", results);

    return results;
}

function displayResults(elements, results) {
    // set each of the elements to the results in the format of $0.00
    elements.expensesP.textContent = '$' + results.expenses.toFixed(2);
    elements.fireP.textContent = '$' + results.fire.toFixed(2);
    elements.smileP.textContent = '$' + results.smile.toFixed(2);
    elements.splurgeP.textContent = '$' + results.splurge.toFixed(2);

    console.log("displayed results")
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