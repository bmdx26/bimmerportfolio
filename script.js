const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Resize the canvas to cover the entire screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCenteredText(); // Draw the centered text when resizing
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize variables for drawing
let hue = 0;
let lastX = null;
let lastY = null;
let totalLength = 0;

function draw(e) {
    if (lastX === null || lastY === null) {
        lastX = e.clientX;
        lastY = e.clientY;
    }

    const currentX = e.clientX;
    const currentY = e.clientY;
    const distance = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
    totalLength += distance;

    hue += 1;
    if (hue >= 360) {
        hue = 0;
    }

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    lastX = currentX;
    lastY = currentY;

    // Update the length display
    document.getElementById('length-display').textContent = `Length: ${Math.round(totalLength)} Cookie Units`;
}

// Function to draw centered text
function drawCenteredText() {
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText("BOUMI-FOLIO (BHOUMIK'S PORTFOLIO)", canvas.width / 2, canvas.height / 2);
}

// Function to apply the fading effect at a slower speed
function fadeEffect() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)'; // Reduced transparency for slower fading
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the centered text initially
drawCenteredText();

// Event listener for mouse movement
canvas.addEventListener('mousemove', draw);

// Apply the fading effect continuously
function animate() {
    fadeEffect();
    drawCenteredText(); // Redraw the centered text to ensure it doesn't fade
    requestAnimationFrame(animate);
}

animate();
