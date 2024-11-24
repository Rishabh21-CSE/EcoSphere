let wasteGoal = 0;
let totalWaste = 0;
let carbonFootprints = [];
let carbonLabels = [];

const transportEmissions = {
    car: 0.25,    // kg CO2 per km
    bus: 0.05,    // kg CO2 per km
    bicycle: 0.01, // kg CO2 per km
    walking: 0.00  // kg CO2 per km
};

function setGoal() {
    const goalInput = document.getElementById('goalInput');
    wasteGoal = parseFloat(goalInput.value);
    goalInput.value = '';
    updateGoalStatus();
}

function trackWaste() {
    const wasteInput = document.getElementById('wasteInput');
    const wasteAmount = parseFloat(wasteInput.value);
    
    if (!isNaN(wasteAmount)) {
        totalWaste += wasteAmount;
        wasteInput.value = '';
        updateCurrentWaste();
    }
}

function updateGoalStatus() {
    const goalStatus = document.getElementById('goalStatus');
    goalStatus.innerText = `Your waste reduction goal: ${wasteGoal} kg`;
}

function updateCurrentWaste() {
    const currentWaste = document.getElementById('currentWaste');
    currentWaste.innerText = `Total waste tracked: ${totalWaste} kg`;

    if (totalWaste > wasteGoal) {
        alert("You've exceeded your waste reduction goal! Keep it up!");
    }
}

function trackCarbon() {
    const distanceInput = document.getElementById('distanceInput');
    const transportType = document.getElementById('transportType').value;
    
    const distance = parseFloat(distanceInput.value);
    
    if (!isNaN(distance) && distance > 0) {
        const emissions = distance * transportEmissions[transportType];
        carbonFootprints.push(emissions);
        carbonLabels.push(`Trip ${carbonLabels.length + 1}`);
        distanceInput.value = '';
        updateCarbonChart();
    }
}

function showTotalCarbon() {
    const totalCarbon = carbonFootprints.reduce((a, b) => a + b, 0).toFixed(2);
    document.getElementById('totalCarbonOutput').innerText = `${totalCarbon} kg CO2`;
    document.getElementById('carbonModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('carbonModal').style.display = 'none';
}

const ctx = document.getElementById('carbonChart').getContext('2d');
let carbonChart = new Chart(ctx, {
    type: 'bar', // 2D bar graph
    data: {
        labels: carbonLabels,
        datasets: [{
            label: 'Carbon Footprint (kg)',
            data: carbonFootprints,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Carbon Footprint (kg)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Trips'
                }
            }
        }
    }
});

function updateCarbonChart() {
    carbonChart.update();
}
