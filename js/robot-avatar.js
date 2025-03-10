// Robot Avatar that follows cursor
document.addEventListener('DOMContentLoaded', function() {
    // Create robot avatar element
    const robot = document.createElement('div');
    robot.id = 'robot-avatar';
    robot.innerHTML = `
        <div class="robot-head">
            <div class="robot-eyes">
                <div class="robot-eye left"></div>
                <div class="robot-eye right"></div>
            </div>
            <div class="robot-antenna"></div>
        </div>
        <div class="robot-body">
            <div class="robot-arms">
                <div class="robot-arm left"></div>
                <div class="robot-arm right"></div>
            </div>
        </div>
    `;
    document.body.appendChild(robot);

    // Set initial position (off-screen)
    let robotX = -100;
    let robotY = -100;
    
    // Target position (where the robot should move to)
    let targetX = -100;
    let targetY = -100;
    
    // Speed of the robot (lower = slower)
    const speed = 0.1;
    
    // Offset from cursor
    const offsetX = 30;
    const offsetY = 30;
    
    // Update target position on mouse move
    document.addEventListener('mousemove', function(e) {
        targetX = e.clientX + offsetX;
        targetY = e.clientY + offsetY;
        
        // Make robot eyes look at cursor
        const robotRect = robot.getBoundingClientRect();
        const robotCenterX = robotRect.left + robotRect.width / 2;
        const robotCenterY = robotRect.top + robotRect.height / 2;
        
        // Calculate angle between robot and cursor
        const angle = Math.atan2(e.clientY - robotCenterY, e.clientX - robotCenterX);
        
        // Move robot eyes based on cursor position
        const eyes = robot.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            const eyeX = Math.cos(angle) * 2;
            const eyeY = Math.sin(angle) * 2;
            eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
        });
    });
    
    // Animation loop for smooth following
    function animateRobot() {
        // Calculate distance to target
        const dx = targetX - robotX;
        const dy = targetY - robotY;
        
        // Move robot towards target with easing
        robotX += dx * speed;
        robotY += dy * speed;
        
        // Apply position
        robot.style.left = `${robotX}px`;
        robot.style.top = `${robotY}px`;
        
        // Continue animation
        requestAnimationFrame(animateRobot);
    }
    
    // Start animation
    animateRobot();
    
    // Hide robot when cursor leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            robot.style.opacity = '0';
        }
    });
    
    // Show robot when cursor enters the window
    document.addEventListener('mouseover', function() {
        robot.style.opacity = '1';
    });
}); 