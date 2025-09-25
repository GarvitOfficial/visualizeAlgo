/**
 * Linked List Data Structure Implementation
 * A dynamic data structure where elements are stored in nodes,
 * each containing data and a pointer to the next node.
 */

const LinkedList = {
    // Algorithm metadata
    meta: {
        name: 'Linked List',
        emoji: '🔗',
        category: 'data-structure',
        difficulty: 'intermediate',
        timeComplexity: {
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)'
        },
        spaceComplexity: 'O(1)',
        stable: true,
        inPlace: true,
        description: 'Dynamic data structure with nodes containing data and pointers. Perfect for dynamic memory allocation!',
        features: ['🔗 Dynamic', '🎯 Flexible', '💾 Memory Efficient'],
        badge: '🔗 DATA STRUCTURE',
        cardClass: 'card-hidden'
    },

    // Linked List implementation
    algorithm: function linkedListOperations() {
        class ListNode {
            constructor(data) {
                this.data = data;
                this.next = null;
            }
        }

        class LinkedListDS {
            constructor() {
                this.head = null;
                this.size = 0;
            }
            
            insert(data) {
                const newNode = new ListNode(data);
                newNode.next = this.head;
                this.head = newNode;
                this.size++;
            }
            
            delete(data) {
                if (!this.head) return false;
                
                if (this.head.data === data) {
                    this.head = this.head.next;
                    this.size--;
                    return true;
                }
                
                let current = this.head;
                while (current.next && current.next.data !== data) {
                    current = current.next;
                }
                
                if (current.next) {
                    current.next = current.next.next;
                    this.size--;
                    return true;
                }
                
                return false;
            }
            
            search(data) {
                let current = this.head;
                let position = 0;
                
                while (current) {
                    if (current.data === data) {
                        return position;
                    }
                    current = current.next;
                    position++;
                }
                
                return -1;
            }
        }
        
        return LinkedListDS;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        this.nodes = [];
        
        container.innerHTML = `
            <div class="linked-list-container">
                <div class="linked-list-controls">
                    <div class="input-group">
                        <input type="number" id="list-input" placeholder="Enter value" min="1" max="999">
                        <button class="btn btn-success" onclick="LinkedList.insert()">➕ Insert</button>
                    </div>
                    <div class="input-group">
                        <input type="number" id="delete-input" placeholder="Value to delete" min="1" max="999">
                        <button class="btn btn-danger" onclick="LinkedList.deleteValue()">🗑️ Delete</button>
                    </div>
                    <div class="input-group">
                        <input type="number" id="search-input" placeholder="Value to search" min="1" max="999">
                        <button class="btn btn-info" onclick="LinkedList.search()">🔍 Search</button>
                    </div>
                    <button class="btn btn-secondary" onclick="LinkedList.clear()">🧹 Clear</button>
                </div>
                <div class="linked-list-info" id="list-info">
                    <div class="info-item">Size: <span id="list-size">0</span></div>
                    <div class="info-item">Head: <span id="list-head">NULL</span></div>
                    <div class="info-item">Status: <span id="list-status">Ready</span></div>
                </div>
                <div class="linked-list-visualization" id="list-viz">
                    <div class="null-pointer">NULL</div>
                </div>
            </div>
        `;
        
        this.updateVisualization();
        
        // Override default buttons
        document.getElementById('start-btn').onclick = () => this.demo();
        document.getElementById('reset-btn').onclick = () => this.clear();
        document.getElementById('random-btn').onclick = () => this.randomDemo();
    },

    // Insert operation
    insert: function() {
        const input = document.getElementById('list-input');
        const value = parseInt(input.value);
        
        if (value && value >= 1 && value <= 999 && this.nodes.length < 8) {
            // Insert at head (like a real linked list)
            this.nodes.unshift(value);
            input.value = '';
            this.updateVisualization();
            this.animateInsert();
            
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('success');
            }
        } else if (audioSystem) {
            audioSystem.play('error');
        }
    },

    // Delete operation
    deleteValue: function() {
        const input = document.getElementById('delete-input');
        const value = parseInt(input.value);
        
        if (value) {
            const index = this.nodes.indexOf(value);
            if (index !== -1) {
                this.nodes.splice(index, 1);
                input.value = '';
                this.updateVisualization();
                this.animateDelete(index);
                
                performanceMetrics.operations++;
                updatePerformanceMetrics();
                
                document.getElementById('list-status').textContent = `Deleted: ${value}`;
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
            } else {
                document.getElementById('list-status').textContent = `Value ${value} not found!`;
                if (audioSystem) {
                    audioSystem.play('error');
                }
            }
        }
    },

    // Search operation
    search: function() {
        const input = document.getElementById('search-input');
        const value = parseInt(input.value);
        
        if (value) {
            const index = this.nodes.indexOf(value);
            if (index !== -1) {
                document.getElementById('list-status').textContent = `Found ${value} at position ${index}`;
                this.highlightNode(index);
                
                performanceMetrics.comparisons++;
                updatePerformanceMetrics();
                
                if (audioSystem) {
                    audioSystem.play('success');
                }
            } else {
                document.getElementById('list-status').textContent = `Value ${value} not found!`;
                if (audioSystem) {
                    audioSystem.play('error');
                }
            }
        }
    },

    // Clear list
    clear: function() {
        this.nodes = [];
        this.updateVisualization();
        document.getElementById('list-status').textContent = 'List cleared';
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Update visualization
    updateVisualization: function() {
        const container = document.getElementById('list-viz');
        
        // Clear existing nodes except NULL pointer
        container.querySelectorAll('.list-node, .arrow').forEach(el => el.remove());
        
        // Add nodes and arrows
        this.nodes.forEach((value, index) => {
            // Create node
            const node = document.createElement('div');
            node.className = 'list-node';
            node.innerHTML = `
                <div class="node-data">${value}</div>
                <div class="node-pointer">→</div>
            `;
            
            // Create arrow (except for last node)
            if (index < this.nodes.length - 1) {
                const arrow = document.createElement('div');
                arrow.className = 'arrow';
                arrow.textContent = '→';
                container.appendChild(arrow);
            }
            
            container.insertBefore(node, container.querySelector('.null-pointer'));
        });
        
        // Update info
        document.getElementById('list-size').textContent = this.nodes.length;
        document.getElementById('list-head').textContent = this.nodes.length > 0 ? this.nodes[0] : 'NULL';
    },

    // Animate insert operation
    animateInsert: function() {
        const firstNode = document.querySelector('.list-node');
        if (firstNode) {
            firstNode.style.animation = 'nodeInsert 0.5s ease';
        }
    },

    // Animate delete operation
    animateDelete: function(index) {
        // Animation handled by removal
    },

    // Highlight node during search
    highlightNode: function(index) {
        const nodes = document.querySelectorAll('.list-node');
        if (nodes[index]) {
            nodes[index].classList.add('found');
            setTimeout(() => {
                nodes[index].classList.remove('found');
            }, 2000);
        }
    },

    // Demo mode
    demo: function() {
        if (isAnimating) return;
        isAnimating = true;
        
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        
        const demoValues = [10, 20, 30, 40];
        let index = 0;
        
        const insertNext = () => {
            if (index < demoValues.length) {
                this.nodes.unshift(demoValues[index]);
                this.updateVisualization();
                this.animateInsert();
                
                performanceMetrics.operations++;
                updatePerformanceMetrics();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
                
                index++;
                animationTimeouts.push(setTimeout(insertNext, animationSpeed));
            } else {
                // Demo search
                animationTimeouts.push(setTimeout(() => {
                    this.highlightNode(1);
                    document.getElementById('list-status').textContent = 'Demo: Searching for value 30';
                    
                    animationTimeouts.push(setTimeout(() => {
                        performanceMetrics.endTime = performance.now();
                        updatePerformanceMetrics();
                        isAnimating = false;
                        
                        if (audioSystem) {
                            audioSystem.play('success');
                        }
                    }, animationSpeed * 2));
                }, animationSpeed));
            }
        };
        
        insertNext();
    },

    // Random demo
    randomDemo: function() {
        this.clear();
        const randomValues = Array.from({length: 4}, () => Math.floor(Math.random() * 100) + 1);
        
        randomValues.forEach((value, index) => {
            setTimeout(() => {
                this.nodes.unshift(value);
                this.updateVisualization();
                this.animateInsert();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
            }, index * 400);
        });
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('linked-list', LinkedList);
}