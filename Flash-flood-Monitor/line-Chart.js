document.addEventListener('DOMContentLoaded', function () {
    // Function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generalized function to create and update line charts with point styling
    function createLineChart(canvasId, currentLabel, predictedLabel, currentColor, predictedColor, currentDataGenerator, predictedDataGenerator) {
        const lineChartCanvas = document.getElementById(canvasId);
        const lineCtx = lineChartCanvas.getContext('2d');

        const data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: currentLabel,
                    data: currentDataGenerator(),
                    borderColor: currentColor,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: currentColor,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    borderWidth: 2
                },
                {
                    label: predictedLabel,
                    data: predictedDataGenerator(),
                    borderColor: predictedColor,
                    backgroundColor: 'transparent',
                    pointBackgroundColor: predictedColor,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    borderWidth: 2
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#000',
                    borderWidth: 1
                },
                legend: {
                    labels: {
                        color: '#000'
                    }
                }
            },
            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: currentLabel.includes('Water Level') ? 15 : 6.5, // Adjusted max based on chart type
                    ticks: {
                        color: '#000'
                    },
                    grid: {
                        color: '#000'
                    }
                },
                x: {
                    ticks: {
                        color: '#000'
                    },
                    grid: {
                        color: '#000'
                    }
                }
            }
        };

        new Chart(lineCtx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    // Function to generate current water level data
    function generateCurrentWaterLevelData() {
        return Array.from({ length: 12 }, () => getRandomInt(1, 15)); // Random current data
    }

    // Function to generate predicted water level data
    function generatePredictedWaterLevelData() {
        return Array.from({ length: 12 }, () => getRandomInt(1, 15)); // Random predicted data
    }

    // Initialize the water level chart with both current and predicted data
    createLineChart(
        'line-Chart-WaterLevel',
        'Current Water Level',
        'Predicted Water Level',
        'green',
        'blue',
        generateCurrentWaterLevelData,
        generatePredictedWaterLevelData
    );

    // Function to generate current water flow data
    function generateCurrentWaterFlowData() {
        return Array.from({ length: 12 }, () => getRandomInt(0, 6)); // Random current data for flow
    }

    // Function to generate predicted water flow data
    function generatePredictedWaterFlowData() {
        return Array.from({ length: 12 }, () => getRandomInt(0, 6)); // Random predicted data for flow
    }

    // Initialize the water flow chart
    createLineChart(
        'line-Chart-WaterFlow',
        'Current Water Flow',
        'Predicted Water Flow',
        'green',
        'blue',
        generateCurrentWaterFlowData,
        generatePredictedWaterFlowData
    );
});
