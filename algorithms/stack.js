/**
 * Stack Data Structure Implementation
 * Stack is a LIFO (Last In, First Out) data structure.
 * Elements are added and removed from the top.
 */

const Stack = {
    // Algorithm metadata
    meta: {
        name: 'Stack',
        emoji: '📚',
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
        description: 'LIFO data structure - Last In, First Out. Perfect for function calls and undo operations!',
        features: ['📚 LIFO', '⚡ Fast', '🎯 Simple'],
        badge: '📚 DATA STRUCTURE',
        cardClass: 'card-educational'
    },

    // Stack implementation
    algorithm: function stackOperations() {
        class StackDS {
            constructor() {
                this.items = [];
            }
            
            push(element) {
                this.items.push(element);
            }
            
            pop() {
                if (this.isEmpty()) return null;
                return this.items.pop();
            }
            
            peek() {
                if (this.isEmpty()) return null;
                return this.items[this.items.length - 1];
            }
            
            isEmpty() {
                return this.items.length === 0;
            }
            
            size() {
                return this.items.length;
            }
        }
        
        return StackDS;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        this.stack = [];
        
        container.innerHTML = `
            <div class="stack-container">
                <div class="stack-controls">
                    <div class="input-group">
                        <input type="number" id="stack-input" placeholder="Enter value" min="1" max="999">
                        <button class="btn btn-success" onclick="Stack.push()">📚 Push</button>
                    </div>
                    <div class="control-buttons">
                        <button class="btn btn-warning" onclick="Stack.pop()">🗑️ Pop</button>
                        <button class="btn btn-info" onclick="Stack.peek()">👁️ Peek</button>
                        <button class="btn btn-secondary" onclick="Stack.clear()">🧹 Clear</button>
                    </div>
                </div>
                <div class="stack-info" id="stack-info">
                    <div class="info-item">Size: <span id="stack-size">0</span></div>
                    <div class="info-item">Top: <span id="stack-top">Empty</span></div>
                    <div class="info-item">Status: <span id="stack-status">Ready</span></div>
                </div>
                <div class="stack-visualization" id="stack-viz">
                    <div class="stack-base">Stack Base</div>
                </div>
            </div>
        `;
        
        this.updateVisualization();
        
        // Override default buttons
        document.getElementById('start-btn').onclick = () => this.demo();
        document.getElementById('reset-btn').onclick = () => this.clear();
        document.getElementById('random-btn').onclick = () => this.randomDemo();
    },

    // Push operation
    push: function() {
        const input = document.getElementById('stack-input');
        const value = parseInt(input.value);
        
        if (value && value >= 1 && value <= 999 && this.stack.length < 10) {
            this.stack.push(value);
            input.value = '';
            this.updateVisualization();
            this.animatePush();
            
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('success');
            }
        } else if (audioSystem) {
            audioSystem.play('error');
        }
    },

    // Pop operation
    pop: function() {
        if (this.stack.length > 0) {
            const poppedValue = this.stack.pop();
            this.updateVisualization();
            this.animatePop();
            
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            document.getElementById('stack-status').textContent = `Popped: ${poppedValue}`;
            
            if (audioSystem) {
                audioSystem.play('step');
            }
        } else {
            document.getElementById('stack-status').textContent = 'Stack is empty!';
            if (audioSystem) {
                audioSystem.play('error');
            }
        }
    },

    // Peek operation
    peek: function() {
        if (this.stack.length > 0) {
            const topValue = this.stack[this.stack.length - 1];
            document.getElementById('stack-status').textContent = `Top value: ${topValue}`;
            
            // Highlight top element
            const topElement = document.querySelector('.stack-element:last-child');
            if (topElement) {
                topElement.classList.add('peeking');
                setTimeout(() => {
                    topElement.classList.remove('peeking');
                }, 1000);
            }
            
            if (audioSystem) {
                audioSystem.play('click');
            }
        } else {
            document.getElementById('stack-status').textContent = 'Stack is empty!';
            if (audioSystem) {
                audioSystem.play('error');
            }
        }
    },

    // Clear stack
    clear: function() {
        this.stack = [];
        this.updateVisualization();
        document.getElementById('stack-status').textContent = 'Stack cleared';
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Update visualization
    updateVisualization: function() {
        const container = document.getElementById('stack-viz');
        const base = container.querySelector('.stack-base');
        
        // Clear existing elements except base
        container.querySelectorAll('.stack-element').forEach(el => el.remove());
        
        // Add stack elements
        this.stack.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'stack-element';
            element.textContent = value;
            element.style.bottom = `${40 + (index * 50)}px`;
            container.appendChild(element);
        });
        
        // Update info
        document.getElementById('stack-size').textContent = this.stack.length;
        document.getElementById('stack-top').textContent = this.stack.length > 0 ? this.stack[this.stack.length - 1] : 'Empty';
    },

    // Animate push operation
    animatePush: function() {
        const elements = document.querySelectorAll('.stack-element');
        const lastElement = elements[elements.length - 1];
        if (lastElement) {
            lastElement.style.animation = 'stackPush 0.5s ease';
        }
    },

    // Animate pop operation
    animatePop: function() {
        // Animation handled by removal
    },

    // Demo mode
    demo: function() {
        if (isAnimating) return;
        isAnimating = true;
        
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        
        const demoValues = [10, 20, 30, 40, 50];
        let index = 0;
        
        const pushNext = () => {
            if (index < demoValues.length) {
                this.stack.push(demoValues[index]);
                this.updateVisualization();
                this.animatePush();
                
                performanceMetrics.operations++;
                updatePerformanceMetrics();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
                
                index++;
                animationTimeouts.push(setTimeout(pushNext, animationSpeed));
            } else {
                // Start popping
                const popNext = () => {
                    if (this.stack.length > 0) {
                        this.pop();
                        animationTimeouts.push(setTimeout(popNext, animationSpeed));
                    } else {
                        performanceMetrics.endTime = performance.now();
                        updatePerformanceMetrics();
                        isAnimating = false;
                        
                        if (audioSystem) {
                            audioSystem.play('success');
                        }
                    }
                };
                
                animationTimeouts.push(setTimeout(popNext, animationSpeed * 2));
            }
        };
        
        pushNext();
    },

    // Random demo
    randomDemo: function() {
        this.clear();
        const randomValues = Array.from({length: 5}, () => Math.floor(Math.random() * 100) + 1);
        
        randomValues.forEach((value, index) => {
            setTimeout(() => {
                this.stack.push(value);
                this.updateVisualization();
                this.animatePush();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
            }, index * 300);
        });
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('stack', Stack);
}