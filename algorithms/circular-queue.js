/**
 * Circular Queue Data Structure Implementation
 * A queue implementation where the last position connects to the first,
 * making efficient use of memory by reusing empty spaces.
 */

const CircularQueue = {
    // Algorithm metadata
    meta: {
        name: 'Circular Queue',
        emoji: '🔄',
        category: 'data-structure',
        difficulty: 'intermediate',
        timeComplexity: {
            best: 'O(1)',
            average: 'O(1)',
            worst: 'O(1)'
        },
        spaceComplexity: 'O(n)',
        description: 'Queue implementation where the last position connects to the first',
        features: ['🔄 Circular', '💾 Memory Efficient', '⚡ Fast'],
        badge: '🔄 CIRCULAR',
        cardClass: 'card-circular'
    },

    // Initialize the circular queue visualization
    init: function() {
        const container = document.getElementById('visualization-container');
        let circularQueue = [];
        let front = -1;
        let rear = -1;
        let maxSize = 6;
        
        container.innerHTML = `
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                    <button id="start-btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: #ff6b35; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">🔄 Demo Circular Queue</button>
                    <button id="reset-btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Clear</button>
                    <button id="random-btn" style="padding: 0.5rem 1rem; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">🎲 Random</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff6b35;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #333;">🔄 Circular FIFO - Memory Efficient</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">Last position connects to first! No memory waste when elements are dequeued.</p>
                </div>
                <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center;">
                    <input type="number" id="circular-queue-input" placeholder="Enter value" min="1" max="999" style="padding: 0.5rem; border: 2px solid #ff6b35; border-radius: 4px; width: 120px; text-align: center; font-weight: 600;">
                    <button onclick="enqueueToCircularQueue()" style="padding: 0.5rem 1rem; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">➡️ Enqueue</button>
                    <button onclick="dequeueFromCircularQueue()" style="padding: 0.5rem 1rem; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer;">⬅️ Dequeue</button>
                    <button onclick="frontCircularQueue()" style="padding: 0.5rem 1rem; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">👁️ Front</button>
                </div>
                <div id="circular-queue-info" style="margin-bottom: 1rem; padding: 0.5rem; background: #e3f2fd; border-radius: 6px; text-align: center; font-weight: 600; color: #1976d2;">
                    Circular queue is empty. Watch how it reuses space efficiently!
                </div>
                <div style="margin-bottom: 1rem; display: flex; gap: 1rem; justify-content: center;">
                    <div style="background: #fff3e0; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Size</div>
                        <div id="circular-queue-size" style="font-weight: 600; color: #ff9800;">0</div>
                    </div>
                    <div style="background: #e8f5e8; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Front</div>
                        <div id="circular-queue-front-idx" style="font-weight: 600; color: #4caf50;">-1</div>
                    </div>
                    <div style="background: #ffebee; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Rear</div>
                        <div id="circular-queue-rear-idx" style="font-weight: 600; color: #f44336;">-1</div>
                    </div>
                    <div style="background: #f3e5f5; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Capacity</div>
                        <div style="font-weight: 600; color: #9c27b0;">${maxSize}</div>
                    </div>
                </div>
                <div style="background: #f5f5f5; border-radius: 8px; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 1rem; font-weight: 600; color: #666;">
                        🔄 Circular Queue (connects back to start)
                    </div>
                    <div id="circular-queue-container" style="display: flex; justify-content: center; align-items: center; position: relative; width: 300px; height: 300px; margin: 0 auto;">
                    </div>
                </div>
            </div>
        `;
        
        // Initialize circular queue visualization
        updateCircularQueueVisualization();
        
        // Make functions global
        window.enqueueToCircularQueue = function() {
            const input = document.getElementById('circular-queue-input');
            const value = parseInt(input.value);
            
            if (value && value >= 1 && value <= 999) {
                if (isCircularQueueFull()) {
                    document.getElementById('circular-queue-info').textContent = 'Queue is full! Cannot enqueue more elements.';
                    if (audioSystem) audioSystem.play('error');
                    return;
                }
                
                if (front === -1) {
                    front = 0;
                    rear = 0;
                } else {
                    rear = (rear + 1) % maxSize;
                }
                
                circularQueue[rear] = value;
                input.value = '';
                updateCircularQueueVisualization();
                animateCircularEnqueue();
                
                document.getElementById('circular-queue-info').textContent = `Enqueued: ${value} at position ${rear}`;
                
                if (audioSystem) audioSystem.play('success');
            } else if (audioSystem) {
                audioSystem.play('error');
            }
        };
        
        window.dequeueFromCircularQueue = function() {
            if (isCircularQueueEmpty()) {
                document.getElementById('circular-queue-info').textContent = 'Cannot dequeue from empty circular queue!';
                if (audioSystem) audioSystem.play('error');
                return;
            }
            
            const dequeuedValue = circularQueue[front];
            circularQueue[front] = undefined;
            
            if (front === rear) {
                // Queue becomes empty
                front = -1;
                rear = -1;
            } else {
                front = (front + 1) % maxSize;
            }
            
            updateCircularQueueVisualization();
            animateCircularDequeue();
            
            document.getElementById('circular-queue-info').textContent = `Dequeued: ${dequeuedValue} (space can be reused!)`;
            
            if (audioSystem) audioSystem.play('step');
        };
        
        window.frontCircularQueue = function() {
            if (isCircularQueueEmpty()) {
                document.getElementById('circular-queue-info').textContent = 'Cannot peek empty circular queue!';
                if (audioSystem) audioSystem.play('error');
                return;
            }
            
            const frontValue = circularQueue[front];
            document.getElementById('circular-queue-info').textContent = `Front element: ${frontValue} at position ${front}`;
            
            // Highlight front element
            const frontElement = document.querySelector(`[data-index="${front}"]`);
            if (frontElement) {
                frontElement.style.background = '#ffeb3b';
                frontElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    frontElement.style.background = 'linear-gradient(45deg, #ff6b35, #ff8a50)';
                    frontElement.style.transform = 'scale(1)';
                }, 1000);
            }
            
            if (audioSystem) audioSystem.play('click');
        };
        
        function isCircularQueueEmpty() {
            return front === -1;
        }
        
        function isCircularQueueFull() {
            return !isCircularQueueEmpty() && (rear + 1) % maxSize === front;
        }
        
        function getCircularQueueSize() {
            if (isCircularQueueEmpty()) return 0;
            if (rear >= front) return rear - front + 1;
            return maxSize - front + rear + 1;
        }
        
        function updateCircularQueueVisualization() {
            const container = document.getElementById('circular-queue-container');
            container.innerHTML = '';
            
            const centerX = 150;
            const centerY = 150;
            const radius = 100;
            
            // Create circular positions
            for (let i = 0; i < maxSize; i++) {
                const angle = (i * 2 * Math.PI) / maxSize - Math.PI / 2; // Start from top
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                
                const element = document.createElement('div');
                element.className = 'circular-queue-element';
                element.setAttribute('data-index', i);
                element.style.cssText = `
                    position: absolute;
                    left: ${x - 30}px;
                    top: ${y - 30}px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    border: 3px solid #ddd;
                    background: #f9f9f9;
                    color: #666;
                `;
                
                // Style based on queue state
                if (circularQueue[i] !== undefined) {
                    element.textContent = circularQueue[i];
                    element.style.background = 'linear-gradient(45deg, #ff6b35, #ff8a50)';
                    element.style.color = 'white';
                    element.style.border = '3px solid #e55a2b';
                } else {
                    element.textContent = i;
                    element.style.background = '#f9f9f9';
                    element.style.color = '#ccc';
                }
                
                // Highlight front and rear
                if (i === front && !isCircularQueueEmpty()) {
                    element.style.border = '4px solid #4caf50';
                    element.style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
                }
                if (i === rear && !isCircularQueueEmpty()) {
                    element.style.border = '4px solid #f44336';
                    element.style.boxShadow = '0 0 15px rgba(244, 67, 54, 0.5)';
                }
                
                container.appendChild(element);
            }
            
            // Add arrows to show circular connection
            const arrow = document.createElement('div');
            arrow.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2rem;
                color: #ff6b35;
                animation: spin 3s linear infinite;
            `;
            arrow.innerHTML = '🔄';
            container.appendChild(arrow);
            
            // Update info
            document.getElementById('circular-queue-size').textContent = getCircularQueueSize();
            document.getElementById('circular-queue-front-idx').textContent = front;
            document.getElementById('circular-queue-rear-idx').textContent = rear;
            
            if (isCircularQueueEmpty()) {
                document.getElementById('circular-queue-info').textContent = 'Circular queue is empty. Watch how it reuses space efficiently!';
            }
        }
        
        function animateCircularEnqueue() {
            const rearElement = document.querySelector(`[data-index="${rear}"]`);
            if (rearElement) {
                rearElement.style.transform = 'scale(0.5)';
                rearElement.style.opacity = '0';
                setTimeout(() => {
                    rearElement.style.transform = 'scale(1)';
                    rearElement.style.opacity = '1';
                }, 100);
            }
        }
        
        function animateCircularDequeue() {
            // Animation handled by the update
        }
        
        // Demo button
        document.getElementById('start-btn').onclick = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            // Reset queue
            circularQueue = [];
            front = -1;
            rear = -1;
            updateCircularQueueVisualization();
            
            const demoValues = [10, 20, 30, 40, 50, 60];
            let index = 0;
            
            document.getElementById('circular-queue-info').textContent = '🔄 Demo: Filling circular queue...';
            
            const enqueueNext = () => {
                if (index < demoValues.length) {
                    if (front === -1) {
                        front = 0;
                        rear = 0;
                    } else {
                        rear = (rear + 1) % maxSize;
                    }
                    
                    circularQueue[rear] = demoValues[index];
                    updateCircularQueueVisualization();
                    animateCircularEnqueue();
                    
                    document.getElementById('circular-queue-info').textContent = `Enqueued: ${demoValues[index]} at position ${rear}`;
                    
                    if (audioSystem) audioSystem.play('step');
                    
                    index++;
                    animationTimeouts.push(setTimeout(enqueueNext, animationSpeed));
                } else {
                    // Start dequeuing and re-enqueuing to show circular nature
                    document.getElementById('circular-queue-info').textContent = '🔄 Demo: Now dequeuing and re-enqueuing to show circular behavior...';
                    
                    let dequeueCount = 0;
                    const dequeueAndReenqueue = () => {
                        if (dequeueCount < 3) {
                            // Dequeue
                            const dequeuedValue = circularQueue[front];
                            circularQueue[front] = undefined;
                            
                            if (front === rear) {
                                front = -1;
                                rear = -1;
                            } else {
                                front = (front + 1) % maxSize;
                            }
                            
                            updateCircularQueueVisualization();
                            document.getElementById('circular-queue-info').textContent = `Dequeued: ${dequeuedValue}, space freed for reuse!`;
                            
                            setTimeout(() => {
                                // Re-enqueue with new value
                                const newValue = 70 + dequeueCount * 10;
                                if (front === -1) {
                                    front = 0;
                                    rear = 0;
                                } else {
                                    rear = (rear + 1) % maxSize;
                                }
                                
                                circularQueue[rear] = newValue;
                                updateCircularQueueVisualization();
                                animateCircularEnqueue();
                                
                                document.getElementById('circular-queue-info').textContent = `Enqueued: ${newValue} at position ${rear} (reusing space!)`;
                                
                                dequeueCount++;
                                animationTimeouts.push(setTimeout(dequeueAndReenqueue, animationSpeed));
                            }, animationSpeed);
                        } else {
                            document.getElementById('circular-queue-info').textContent = '✅ Demo complete! Notice how positions wrap around circularly.';
                            isAnimating = false;
                            
                            if (audioSystem) audioSystem.play('success');
                        }
                    };
                    
                    animationTimeouts.push(setTimeout(dequeueAndReenqueue, animationSpeed * 2));
                }
            };
            
            enqueueNext();
        };
        
        document.getElementById('reset-btn').onclick = () => {
            clearAllTimeouts();
            isAnimating = false;
            circularQueue = [];
            front = -1;
            rear = -1;
            updateCircularQueueVisualization();
            if (audioSystem) audioSystem.play('click');
        };
        
        document.getElementById('random-btn').onclick = () => {
            clearAllTimeouts();
            isAnimating = false;
            circularQueue = [];
            front = -1;
            rear = -1;
            
            const count = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < count; i++) {
                if (front === -1) {
                    front = 0;
                    rear = 0;
                } else {
                    rear = (rear + 1) % maxSize;
                }
                circularQueue[rear] = Math.floor(Math.random() * 100) + 1;
            }
            
            updateCircularQueueVisualization();
            document.getElementById('circular-queue-info').textContent = `Generated ${count} random elements!`;
            if (audioSystem) audioSystem.play('click');
        };
    }
};

// Register with the algorithm registry
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('circular-queue', CircularQueue);
}