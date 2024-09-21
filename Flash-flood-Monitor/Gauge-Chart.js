document.addEventListener('DOMContentLoaded', function () {
    function getUnitForCanvas(canvasId) {
        switch (canvasId) {
            case 'Water-Level-Gauge-Chart':
                return 'm'; // meters for Water Level
            case 'Water-Flow-Gauge-Chart':
                return 'm/s'; // meters/second for Water Flow
            case 'Rain-Gauge-Gauge-Chart':
                return 'mm'; // millimeters for Rain Gauge
            case 'Temperature-Gauge-Chart':
                return '°C'; // Celsius for Temperature
            case 'Humidity-Gauge-Chart':
                return '%'; // Percentage for Humidity
            default:
                return '';
        }
    }

    function getMaxValueForCanvas(canvasId) {
        switch (canvasId) {
            case 'Water-Level-Gauge-Chart':
                return 16; // Maximum 16 meters for Water Level
            case 'Water-Flow-Gauge-Chart':
                return 7; // Maximum 7 m/s for Water Flow
            case 'Rain-Gauge-Gauge-Chart':
                return 30; // Maximum 30 mm for Rain Gauge
            default:
                return 100; // Default maximum for other gauges
        }
    }

    function drawGauge(canvasId, value) {
        const canvas = document.getElementById(canvasId);
        const container = canvas.parentElement;

        // Set canvas width and height based on the container size
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 3;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the outer circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.lineWidth = 40;
        ctx.strokeStyle = '#EFC3CA';
        ctx.stroke();

        // Determine the color based on the value
        // Determine the color based on the value
        let fillColor;
        if (value < 0.5 * getMaxValueForCanvas(canvasId)) {
            fillColor = '#32cd32'; // Green for values below 50%
        } else if (value < 0.9 * getMaxValueForCanvas(canvasId)) {
            fillColor = '#ffd700'; // Yellow for values below 90%
        } else {
            fillColor = '#ff4500'; // Red for values 90% and above
        }

        // Draw the filled arc
        const maxValue = getMaxValueForCanvas(canvasId);
        const endAngle = 0.75 * Math.PI + (value / maxValue) * 1.5 * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0.75 * Math.PI, endAngle);
        ctx.lineWidth = 40;
        ctx.strokeStyle = fillColor;
        ctx.stroke();

        // Draw the needle
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(endAngle);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(radius - 30, 0);
        ctx.lineTo(0, 10);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.restore();

        // Draw the center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Get the unit for the canvasId
        const unit = getUnitForCanvas(canvasId);

        // Draw text value (adjusted to be just under the needle)
        ctx.font = '20px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText(value + unit, centerX, centerY + radius / 2);

        // Draw text labels
        ctx.font = '12px Helvetica';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.fillText('Today', centerX, centerY + radius / 1.5);

        // Draw tick marks and labels
        const numTicks = 10;
        const tickInterval = maxValue / numTicks; // Calculate the interval for each tick

        for (let i = 0; i <= numTicks; i++) {
            const tickValue = (i * tickInterval).toFixed(1); // Calculate the tick value
            const tickAngle = 0.75 * Math.PI + (tickValue / maxValue) * 1.5 * Math.PI; // Adjust angle based on max value
            const tickX = centerX + (radius - 10) * Math.cos(tickAngle);
            const tickY = centerY + (radius - 10) * Math.sin(tickAngle);
            ctx.beginPath();
            ctx.moveTo(tickX, tickY);
            ctx.lineTo(
                centerX + (radius - 20) * Math.cos(tickAngle),
                centerY + (radius - 20) * Math.sin(tickAngle)
            );
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fff';
            ctx.stroke();

            const labelX = centerX + (radius + 5) * Math.cos(tickAngle);
            const labelY = centerY + (radius + 5) * Math.sin(tickAngle);
            ctx.font = '12.5px Helvetica';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(tickValue, labelX, labelY + 3); // Add unit next to the tick value
        }
    }

    // Function to update gauge value based on random data
    function updateGaugeValue(canvasId) {
        let randomValue;
        switch (canvasId) {
            case 'Water-Level-Gauge-Chart':
                randomValue = Math.floor(Math.random() * 17); // Random value between 0 and 16
                break;
            case 'Water-Flow-Gauge-Chart':
                randomValue = Math.floor(Math.random() * 8); // Random value between 0 and 7
                break;
            case 'Rain-Gauge-Gauge-Chart':
                randomValue = Math.floor(Math.random() * 31); // Random value between 0 and 30
                break;
            default:
                randomValue = Math.floor(Math.random() * 101); // Random value between 0 and 100 for other gauges
                break;
        }
        drawGauge(canvasId, randomValue); // Update the gauge chart with the random value
    }

    // Update each gauge every second
    setInterval(() => updateGaugeValue('Water-Level-Gauge-Chart'), 1000);
    setInterval(() => updateGaugeValue('Water-Flow-Gauge-Chart'), 1000);
    setInterval(() => updateGaugeValue('Rain-Gauge-Gauge-Chart'), 1000);
    setInterval(() => updateGaugeValue('Temperature-Gauge-Chart'), 1000);
    setInterval(() => updateGaugeValue('Humidity-Gauge-Chart'), 1000);
});
