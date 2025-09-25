/**
 * Queue Data Structure Implementation
 * Queue is a FIFO (First In, First Out) data structure.
 * Elements are added at the rear and removed from the front.
 */

const Queue = {
    // Algorithm metadata
    meta: {
        name: 'Queue',
        emoji: '🚶‍♂️',
        category: 'data-structure',
        difficulty: 'beginner',
        timeComplexity: {
            best: 'O(1)',
            average: 'O(1)',
            worst: 'O(1)'
        },
        spaceComplexity: 'O(n)',
        stable: true,
        inPlace: false,
        description: 'FIFO data structure - First In, First Out. Perfect for scheduling and breadth-first search!',
        features: ['🚶‍♂️ FIFO', '⚡ Fast', '📋 Ordered'],
        badge: '🚶‍♂️ DATA STRUCTURE',
        cardClass: 'card-search'
    },

    // Queue implementation
    algorithm: function queueOperations() {
        class QueueDS {
            constructor() {
                this.items = [];
            }
            
            enqueue(element) {
                this.items.push(element);
            }
            
            dequeue() {
                if (this.isEmpty()) return null;
                return this.items.shift();
            }
            
            front() {
                if (this.isEmpty()) return null;
                return this.items[0];
            }
            
            isEmpty() {
                return this.items.length === 0;
            }
            
            size() {
                return this.items.length;
            }
        }
        
        return QueueDS;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        this.queue = [];
        
        container.innerHTML = `
            <div class="queue-container">
                <div class="queue-controls">
                    <div class="input-group">
                        <input type="number" id="queue-input" placeholder="Enter value" min="1" max="999">
                        <button class="btn btn-success" onclick="Queue.enqueue()">➡️ Enqueue</button>
                    </div>
                    <div class="control-buttons">
                        <button class="btn btn-warning" onclick="Queue.dequeue()">⬅️ Dequeue</button>
                        <button class="btn btn-info" onclick="Queue.front()">👁️ Front</button>
                        <button class="btn btn-secondary" onclick="Queue.clear()">🧹 Clear</button>
                    </div>
                </div>
                <div class="queue-info" id="queue-info">
                    <div class="info-item">Size: <span id="queue-size">0</span></div>
                    <div class="info-item">Front: <span id="queue-front">Empty</span></div>
                    <div class="info-item">Status: <span id="queue-status">Ready</span></div>
                </div>
                <div class="queue-visualization" id="queue-viz">
                    <div class="queue-labels">
                        <span class="front-label">← Front (Dequeue)</span>
                        <span class="rear-label">Rear (Enqueue) →</span>
                    </div>
                    <div class="queue-line" id="queue-line">
                        <!-- Queue elements will be added here -->
                    </div>
                </div>
            </div>
        `;
        
        this.updateVisualization();
        
        // Override default buttons
        document.getElementById('start-btn').onclick = () => this.demo();
        document.getElementById('reset-btn').onclick = () => this.clear();
        document.getElementById('random-btn').onclick = () => this.randomDemo();
    },

    // Enqueue operation
    enqueue: function() {
        const input = document.getElementById('queue-input');
        const value = parseInt(input.value);
        
        if (value && value >= 1 && value <= 999 && this.queue.length < 10) {
            this.queue.push(value);
            input.value = '';
            this.updateVisualization();
            this.animateEnqueue();
            
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('success');
            }
        } else if (audioSystem) {
            audioSystem.play('error');
        }
    },

    // Dequeue operation
    dequeue: function() {
        if (this.queue.length > 0) {
            const dequeuedValue = this.queue.shift();
            this.updateVisualization();
            this.animateDequeue();
            
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            document.getElementById('queue-status').textContent = `Dequeued: ${dequeuedValue}`;
            
            if (audioSystem) {
                audioSystem.play('step');
            }
        } else {
            document.getElementById('queue-status').textContent = 'Queue is empty!';
            if (audioSystem) {
                audioSystem.play('error');
            }
        }
    },

    // Front operation
    front: function() {
        if (this.queue.length > 0) {
            const frontValue = this.queue[0];
            document.getElementById('queue-status').textContent = `Front value: ${frontValue}`;
            
            // Highlight front element
            const frontElement = document.querySelector('.queue-element:first-child');
            if (frontElement) {
                frontElement.classList.add('peeking');
                setTimeout(() => {
                    frontElement.classList.remove('peeking');
                }, 1000);
            }
            
            if (audioSystem) {
                audioSystem.play('click');
            }
        } else {
            document.getElementById('queue-status').textContent = 'Queue is empty!';
            if (audioSystem) {
                audioSystem.play('error');
            }
        }
    },

    // Clear queue
    clear: function() {
        this.queue = [];
        this.updateVisualization();
        document.getElementById('queue-status').textContent = 'Queue cleared';
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Update visualization
    updateVisualization: function() {
        const container = document.getElementById('queue-line');
        
        // Clear existing elements
        container.innerHTML = '';
        
        // Add queue elements
        this.queue.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'queue-element';
            element.textContent = value;
            
            if (index === 0) {
                element.classList.add('front-element');
            }
            if (index === this.queue.length - 1) {
                element.classList.add('rear-element');
            }
            
            container.appendChild(element);
        });
        
        // Update info
        document.getElementById('queue-size').textContent = this.queue.length;
        document.getElementById('queue-front').textContent = this.queue.length > 0 ? this.queue[0] : 'Empty';
    },

    // Animate enqueue operation
    animateEnqueue: function() {
        const elements = document.querySelectorAll('.queue-element');
        const lastElement = elements[elements.length - 1];
        if (lastElement) {
            lastElement.style.animation = 'queueEnqueue 0.5s ease';
        }
    },

    // Animate dequeue operation
    animateDequeue: function() {
        // Animation handled by removal and shift
        const elements = document.querySelectorAll('.queue-element');
        elements.forEach((element, index) => {
            element.style.animation = 'queueShift 0.3s ease';
        });
    },

    // Demo mode
    demo: function() {
        if (isAnimating) return;
        isAnimating = true;
        
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        
        const demoValues = [10, 20, 30, 40, 50];
        let index = 0;
        
        const enqueueNext = () => {
            if (index < demoValues.length) {
                this.queue.push(demoValues[index]);
                this.updateVisualization();
                this.animateEnqueue();
                
                performanceMetrics.operations++;
                updatePerformanceMetrics();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
                
                index++;
                animationTimeouts.push(setTimeout(enqueueNext, animationSpeed));
            } else {
                // Start dequeuing
                const dequeueNext = () => {
                    if (this.queue.length > 0) {
                        this.dequeue();
                        animationTimeouts.push(setTimeout(dequeueNext, animationSpeed));
                    } else {
                        performanceMetrics.endTime = performance.now();
                        updatePerformanceMetrics();
                        isAnimating = false;
                        
                        if (audioSystem) {
                            audioSystem.play('success');
                        }
                    }
                };
                
                animationTimeouts.push(setTimeout(dequeueNext, animationSpeed * 2));
            }
        };
        
        enqueueNext();
    },

    // Random demo
    randomDemo: function() {
        this.clear();
        const randomValues = Array.from({length: 5}, () => Math.floor(Math.random() * 100) + 1);
        
        randomValues.forEach((value, index) => {
            setTimeout(() => {
                this.queue.push(value);
                this.updateVisualization();
                this.animateEnqueue();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
            }, index * 300);
        });
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('queue', Queue);
}