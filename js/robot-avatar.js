// Robot Frog Avatar
document.addEventListener('DOMContentLoaded', function() {
    // Create robot frog avatar element
    const robot = document.createElement('div');
    robot.id = 'robot-avatar';
    robot.innerHTML = `
        <div class="robot-head">
            <div class="robot-eyes">
                <div class="robot-eye left"></div>
                <div class="robot-eye right"></div>
            </div>
            <div class="robot-mouth"></div>
            <div class="robot-detail detail-1"></div>
            <div class="robot-detail detail-2"></div>
        </div>
        <div class="robot-body">
            <div class="robot-detail detail-1"></div>
            <div class="robot-detail detail-2"></div>
        </div>
    `;
    document.body.appendChild(robot);

    // Eye movement parameters
    const maxEyeMove = 3; // Maximum pixels the eyes can move
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    // Update eye position on mouse move
    document.addEventListener('mousemove', function(e) {
        // Get robot's position
        const robotRect = robot.getBoundingClientRect();
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 2;
        
        // Calculate angle between robot and cursor
        const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
        
        // Calculate eye movement with limited range
        const eyeX = Math.cos(angle) * maxEyeMove;
        const eyeY = Math.sin(angle) * maxEyeMove;
        
        // Apply smooth eye movement
        const eyes = robot.querySelectorAll('.robot-eye::after');
        eyes.forEach(eye => {
            eye.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
        });

        // Store mouse position for smooth movement
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    // Occasional random head turns
    function randomHeadTurn() {
        const head = robot.querySelector('.robot-head');
        const randomDelay = Math.random() * 5000 + 3000; // Random delay between 3-8 seconds
        
        setTimeout(() => {
            // Add class to trigger turn animation
            head.style.transform = `rotate(${Math.random() < 0.5 ? '-' : ''}${Math.random() * 10 + 5}deg)`;
            
            // Reset head position after turn
            setTimeout(() => {
                head.style.transform = 'rotate(0deg)';
                // Schedule next turn
                randomHeadTurn();
            }, 500);
        }, randomDelay);
    }

    // Start random head turns
    randomHeadTurn();
}); 