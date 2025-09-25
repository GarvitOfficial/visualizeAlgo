/**
 * Circular Linked List Data Structure Implementation
 * A linked list where the last node points back to the first node,
 * creating a circular structure with no null pointers.
 */

const CircularLinkedList = {
    // Algorithm metadata
    meta: {
        name: 'Circular Linked List',
        emoji: '🔗',
        category: 'data-structure',
        difficulty: 'intermediate',
        timeComplexity: {
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)'
        },
        spaceComplexity: 'O(n)',
        description: 'Linked list where the last node points back to the first node',
        features: ['🔗 Circular', '🎯 No Null', '💫 Continuous'],
        badge: '🔗 CIRCULAR',
        cardClass: 'card-circular'
    },

    // Initialize the circular linked list visualization
    init: function() {
        const container = document.getElementById('visualization-container');
        let circularList = [];
        let head = null;
        
        container.innerHTML = `
            <div style="padding: 1rem;">
                <div style="margin-bottom: 1rem;">
                    <button id="start-btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: #9c27b0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">🔗 Demo Circular List</button>
                    <button id="reset-btn" style="padding: 0.5rem 1rem; margin-right: 0.5rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Clear</button>
                    <button id="random-btn" style="padding: 0.5rem 1rem; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">🎲 Random</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: #f3e5f5; border-radius: 8px; border-left: 4px solid #9c27b0;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #333;">🔗 Circular Node Structure</h4>
                    <p style="margin: 0; color: #666; font-size: 0.9rem;">Last node points back to first! No null pointers, continuous traversal possible.</p>
                </div>
                <div style="margin-bottom: 1rem; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <input type="number" id="circular-list-input" placeholder="Enter value" min="1" max="999" style="padding: 0.5rem; border: 2px solid #9c27b0; border-radius: 4px; width: 120px; text-align: center; font-weight: 600;">
                    <button onclick="insertToCircularList()" style="padding: 0.5rem 1rem; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;">➕ Insert</button>
                    <button onclick="deleteFromCircularList()" style="padding: 0.5rem 1rem; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer;">🗑️ Delete Last</button>
                    <input type="number" id="circular-search-input" placeholder="Search" min="1" max="999" style="padding: 0.5rem; border: 2px solid #2196f3; border-radius: 4px; width: 100px; text-align: center; font-weight: 600;">
                    <button onclick="searchInCircularList()" style="padding: 0.5rem 1rem; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;">🔍 Search</button>
                    <button onclick="traverseCircularList()" style="padding: 0.5rem 1rem; background: #ff6b35; color: white; border: none; border-radius: 4px; cursor: pointer;">🔄 Traverse</button>
                </div>
                <div id="circular-list-info" style="margin-bottom: 1rem; padding: 0.5rem; background: #e3f2fd; border-radius: 6px; text-align: center; font-weight: 600; color: #1976d2;">
                    Circular linked list is empty. Add nodes to see circular structure!
                </div>
                <div style="margin-bottom: 1rem; display: flex; gap: 1rem; justify-content: center;">
                    <div style="background: #fff3e0; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Size</div>
                        <div id="circular-list-size" style="font-weight: 600; color: #ff9800;">0</div>
                    </div>
                    <div style="background: #e8f5e8; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Head</div>
                        <div id="circular-list-head" style="font-weight: 600; color: #4caf50;">NULL</div>
                    </div>
                    <div style="background: #f3e5f5; padding: 0.5rem 1rem; border-radius: 6px; text-align: center;">
                        <div style="font-size: 0.8rem; color: #666;">Last→First</div>
                        <div id="circular-connection" style="font-weight: 600; color: #9c27b0;">No</div>
                    </div>
                </div>
                <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; min-height: 200px; overflow: hidden;">
                    <div style="text-align: center; margin-bottom: 1rem; font-weight: 600; color: #666;">
                        🔗 Circular Linked List (last node → first node)
                    </div>
                    <div id="circular-list-container" style="display: flex; justify-content: center; align-items: center; position: relative; min-height: 150px;">
                        <div style="color: #999; font-style: italic;">Circular linked list nodes will appear here...</div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize visualization
        updateCircularListVisualization();
        
        // Make functions global
        window.insertToCircularList = function() {
            const input = document.getElementById('circular-list-input');
            const value = parseInt(input.value);
            
            if (value && value >= 1 && value <= 999 && circularList.length < 6) {
                circularList.push(value);
                input.value = '';
                updateCircularListVisualization();
                animateCircularListInsert();
                
                document.getElementById('circular-list-info').textContent = `Inserted: ${value} (now part of circular structure)`;
                
                if (audioSystem) audioSystem.play('success');
            } else if (audioSystem) {
                audioSystem.play('error');
            }
        };
        
        window.deleteFromCircularList = function() {
            if (circularList.length > 0) {
                const deletedValue = circularList.pop();
                updateCircularListVisualization();
                animateCircularListDelete();
                
                document.getElementById('circular-list-info').textContent = `Deleted: ${deletedValue} from circular list`;
                
                if (audioSystem) audioSystem.play('step');
            } else {
                document.getElementById('circular-list-info').textContent = 'Cannot delete from empty circular list!';
                if (audioSystem) audioSystem.play('error');
            }
        };
        
        window.searchInCircularList = function() {
            const input = document.getElementById('circular-search-input');
            const value = parseInt(input.value);
            
            if (value) {
                const index = circularList.indexOf(value);
                if (index !== -1) {
                    document.getElementById('circular-list-info').textContent = `Found ${value} at position ${index} in circular list!`;
                    highlightCircularListNode(index);
                    
                    if (audioSystem) audioSystem.play('success');
                } else {
                    document.getElementById('circular-list-info').textContent = `Value ${value} not found in circular list!`;
                    if (audioSystem) audioSystem.play('error');
                }
            }
        };
        
        window.traverseCircularList = function() {
            if (circularList.length === 0) {
                document.getElementById('circular-list-info').textContent = 'Cannot traverse empty circular list!';
                if (audioSystem) audioSystem.play('error');
                return;
            }
            
            if (isAnimating) return;
            isAnimating = true;
            
            document.getElementById('circular-list-info').textContent = '🔄 Traversing circular list (can go infinitely!)';
            
            let currentIndex = 0;
            let traverseCount = 0;
            const maxTraverse = circularList.length * 2; // Go around twice
            
            const traverseStep = () => {
                if (traverseCount < maxTraverse) {
                    // Clear previous highlights
                    document.querySelectorAll('.circular-list-node').forEach(node => {
                        node.style.background = 'linear-gradient(45deg, #9c27b0, #ba68c8)';
                        node.style.transform = 'scale(1)';
                    });
                    
                    // Highlight current node
                    const currentNode = document.querySelector(`[data-circular-index="${currentIndex}"]`);
                    if (currentNode) {
                        currentNode.style.background = '#ffeb3b';
                        currentNode.style.transform = 'scale(1.2)';
                    }
                    
                    document.getElementById('circular-list-info').textContent = `Traversing: ${circularList[currentIndex]} (position ${currentIndex}, round ${Math.floor(traverseCount / circularList.length) + 1})`;
                    
                    currentIndex = (currentIndex + 1) % circularList.length; // Circular increment
                    traverseCount++;
                    
                    if (audioSystem) audioSystem.play('step');
                    
                    animationTimeouts.push(setTimeout(traverseStep, animationSpeed));
                } else {
                    // Reset highlights
                    document.querySelectorAll('.circular-list-node').forEach(node => {
                        node.style.background = 'linear-gradient(45deg, #9c27b0, #ba68c8)';
                        node.style.transform = 'scale(1)';
                    });
                    
                    document.getElementById('circular-list-info').textContent = '✅ Traversal complete! Notice how it loops back infinitely.';
                    isAnimating = false;
                    
                    if (audioSystem) audioSystem.play('success');
                }
            };
            
            traverseStep();
        };
        
        function updateCircularListVisualization() {
            const container = document.getElementById('circular-list-container');
            container.innerHTML = '';
            
            if (circularList.length === 0) {
                container.innerHTML = '<div style="color: #999; font-style: italic;">Circular linked list nodes will appear here...</div>';
            } else if (circularList.length === 1) {
                // Single node pointing to itself
                const nodeContainer = document.createElement('div');
                nodeContainer.style.cssText = 'position: relative; display: flex; align-items: center; justify-content: center;';
                
                const node = createCircularNode(circularList[0], 0);
                nodeContainer.appendChild(node);
                
                // Self-pointing arrow
                const selfArrow = document.createElement('div');
                selfArrow.style.cssText = `
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 1.5rem;
                    color: #9c27b0;
                    animation: bounce 2s ease-in-out infinite;
                `;
                selfArrow.innerHTML = '↻';
                nodeContainer.appendChild(selfArrow);
                
                container.appendChild(nodeContainer);
            } else {
                // Multiple nodes in circular arrangement
                const centerX = 150;
                const centerY = 75;
                const radius = 80;
                
                container.style.cssText = 'position: relative; width: 300px; height: 150px; margin: 0 auto;';
                
                circularList.forEach((value, index) => {
                    const angle = (index * 2 * Math.PI) / circularList.length;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    
                    const nodeContainer = document.createElement('div');
                    nodeContainer.style.cssText = `
                        position: absolute;
                        left: ${x - 40}px;
                        top: ${y - 20}px;
                    `;
                    
                    const node = createCircularNode(value, index);
                    nodeContainer.appendChild(node);
                    
                    // Arrow to next node
                    const nextIndex = (index + 1) % circularList.length;
                    const nextAngle = (nextIndex * 2 * Math.PI) / circularList.length;
                    const arrowAngle = (angle + nextAngle) / 2;
                    
                    const arrow = document.createElement('div');
                    arrow.style.cssText = `
                        position: absolute;
                        left: 35px;
                        top: 10px;
                        font-size: 1.2rem;
                        color: #9c27b0;
                        transform: rotate(${(nextAngle - angle) * 180 / Math.PI}deg);
                    `;
                    arrow.innerHTML = '→';
                    nodeContainer.appendChild(arrow);
                    
                    container.appendChild(nodeContainer);
                });
                
                // Central circular indicator
                const centerIndicator = document.createElement('div');
                centerIndicator.style.cssText = `
                    position: absolute;
                    left: ${centerX - 15}px;
                    top: ${centerY - 15}px;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: rgba(156, 39, 176, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    animation: spin 3s linear infinite;
                `;
                centerIndicator.innerHTML = '🔄';
                container.appendChild(centerIndicator);
            }
            
            // Update info
            document.getElementById('circular-list-size').textContent = circularList.length;
            document.getElementById('circular-list-head').textContent = circularList.length > 0 ? circularList[0] : 'NULL';
            document.getElementById('circular-connection').textContent = circularList.length > 0 ? 'Yes' : 'No';
            
            if (circularList.length === 0) {
                document.getElementById('circular-list-info').textContent = 'Circular linked list is empty. Add nodes to see circular structure!';
            }
        }
        
        function createCircularNode(value, index) {
            const node = document.createElement('div');
            node.className = 'circular-list-node';
            node.setAttribute('data-circular-index', index);
            node.style.cssText = `
                display: flex;
                background: linear-gradient(45deg, #9c27b0, #ba68c8);
                border-radius: 8px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                transition: all 0.3s ease;
                cursor: pointer;
                width: 80px;
                height: 40px;
            `;
            
            const nodeData = document.createElement('div');
            nodeData.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                color: white;
                padding: 0.5rem;
                font-weight: 600;
                font-size: 1rem;
                border-radius: 6px 0 0 6px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            nodeData.textContent = value;
            
            const nodePointer = document.createElement('div');
            nodePointer.style.cssText = `
                background: rgba(0, 0, 0, 0.2);
                color: white;
                padding: 0.5rem 0.3rem;
                font-weight: 600;
                font-size: 1rem;
                border-radius: 0 6px 6px 0;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            nodePointer.textContent = '↻';
            
            node.appendChild(nodeData);
            node.appendChild(nodePointer);
            
            return node;
        }
        
        function animateCircularListInsert() {
            const nodes = document.querySelectorAll('.circular-list-node');
            const lastNode = nodes[nodes.length - 1];
            if (lastNode) {
                lastNode.style.transform = 'scale(0.5)';
                lastNode.style.opacity = '0';
                setTimeout(() => {
                    lastNode.style.transform = 'scale(1)';
                    lastNode.style.opacity = '1';
                }, 100);
            }
        }
        
        function animateCircularListDelete() {
            // Animation handled by the removal
        }
        
        function highlightCircularListNode(index) {
            const node = document.querySelector(`[data-circular-index="${index}"]`);
            if (node) {
                node.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a)';
                node.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    node.style.background = 'linear-gradient(45deg, #9c27b0, #ba68c8)';
                    node.style.transform = 'scale(1)';
                }, 2000);
            }
        }
        
        // Demo button
        document.getElementById('start-btn').onclick = () => {
            if (isAnimating) return;
            isAnimating = true;
            
            circularList = [];
            updateCircularListVisualization();
            
            const demoValues = [10, 20, 30, 40];
            let index = 0;
            
            document.getElementById('circular-list-info').textContent = '🔗 Demo: Building circular linked list...';
            
            const insertNext = () => {
                if (index < demoValues.length) {
                    circularList.push(demoValues[index]);
                    updateCircularListVisualization();
                    animateCircularListInsert();
                    
                    document.getElementById('circular-list-info').textContent = `Inserted: ${demoValues[index]} (${index === 0 ? 'head node' : 'linked circularly'})`;
                    
                    if (audioSystem) audioSystem.play('step');
                    
                    index++;
                    animationTimeouts.push(setTimeout(insertNext, animationSpeed));
                } else {
                    // Demo traversal
                    document.getElementById('circular-list-info').textContent = '🔗 Demo: Now demonstrating circular traversal...';
                    
                    animationTimeouts.push(setTimeout(() => {
                        traverseCircularList();
                    }, animationSpeed));
                }
            };
            
            insertNext();
        };
        
        document.getElementById('reset-btn').onclick = () => {
            clearAllTimeouts();
            isAnimating = false;
            circularList = [];
            updateCircularListVisualization();
            if (audioSystem) audioSystem.play('click');
        };
        
        document.getElementById('random-btn').onclick = () => {
            clearAllTimeouts();
            isAnimating = false;
            circularList = [];
            
            const count = Math.floor(Math.random() * 4) + 2;
            for (let i = 0; i < count; i++) {
                circularList.push(Math.floor(Math.random() * 100) + 1);
            }
            
            updateCircularListVisualization();
            document.getElementById('circular-list-info').textContent = `Generated ${count} random nodes in circular structure!`;
            if (audioSystem) audioSystem.play('click');
        };
    }
};

// Register with the algorithm registry
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('circular-linked-list', CircularLinkedList);
}