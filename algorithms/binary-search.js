/**
 * Binary Search Algorithm Implementation
 * The ultimate search algorithm! Find anything in sorted data instantly.
 * Efficiently searches through sorted arrays by repeatedly dividing the search interval in half.
 */

const BinarySearch = {
    // Algorithm metadata
    meta: {
        name: 'Binary Search',
        emoji: '🔍',
        category: 'search',
        difficulty: 'beginner',
        timeComplexity: {
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)'
        },
        spaceComplexity: 'O(1)',
        stable: true,
        inPlace: true,
        description: 'The ultimate search algorithm! Find anything in sorted data instantly',
        features: ['🎯 Precise', '⚡ Instant', '🧠 Smart'],
        badge: '🔍 SEARCH KING',
        cardClass: 'card-search'
    },

    // Algorithm implementation
    algorithm: function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        const array = currentArray.length > 0 ? [...currentArray].sort((a, b) => a - b) : [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
        let target = array[Math.floor(Math.random() * array.length)];
        
        container.innerHTML = `
            <div class="binary-search-container">
                <div class="search-controls">
                    <label>🎯 Target: 
                        <input type="number" id="search-target" value="${target}" min="${Math.min(...array)}" max="${Math.max(...array)}">
                    </label>
                    <button class="btn btn-sm" onclick="BinarySearch.updateTarget()">🔄 Update</button>
                </div>
                <div class="search-info" id="search-info">
                    <div class="search-stats">
                        <span>Left: <span id="left-pointer">0</span></span>
                        <span>Mid: <span id="mid-pointer">-</span></span>
                        <span>Right: <span id="right-pointer">${array.length - 1}</span></span>
                    </div>
                </div>
                <div class="array-container" id="binary-array"></div>
                <div class="search-result" id="search-result">Ready to search!</div>
            </div>
        `;
        
        this.renderArray(array);
        
        document.getElementById('start-btn').onclick = () => this.startVisualization(array);
        document.getElementById('reset-btn').onclick = () => this.reset();
        document.getElementById('random-btn').onclick = () => this.randomize();
    },

    // Render array visualization
    renderArray: function(array) {
        const container = document.getElementById('binary-array');
        if (!container) return;
        
        container.innerHTML = '';
        
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element binary-element';
            element.textContent = value;
            element.id = `binary-element-${index}`;
            container.appendChild(element);
        });
    },

    // Update target value
    updateTarget: function() {
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Start visualization
    startVisualization: function(array) {
        if (isAnimating) return;
        isAnimating = true;
        
        const target = parseInt(document.getElementById('search-target').value);
        let left = 0;
        let right = array.length - 1;
        let step = 0;
        
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        performanceMetrics.comparisons = 0;
        
        const searchStep = () => {
            if (left <= right) {
                const mid = Math.floor((left + right) / 2);
                
                // Clear previous highlights
                document.querySelectorAll('.binary-element').forEach(el => {
                    el.classList.remove('comparing', 'found', 'eliminated', 'current-range');
                });
                
                // Highlight current search range
                for (let i = left; i <= right; i++) {
                    const element = document.getElementById(`binary-element-${i}`);
                    if (element) {
                        element.classList.add('current-range');
                    }
                }
                
                // Highlight middle element
                const midElement = document.getElementById(`binary-element-${mid}`);
                if (midElement) {
                    midElement.classList.add('comparing');
                }
                
                // Update pointers
                document.getElementById('left-pointer').textContent = left;
                document.getElementById('mid-pointer').textContent = mid;
                document.getElementById('right-pointer').textContent = right;
                
                performanceMetrics.comparisons++;
                performanceMetrics.operations++;
                updatePerformanceMetrics();
                
                if (audioSystem) {
                    audioSystem.play('step');
                }
                
                animationTimeouts.push(setTimeout(() => {
                    if (array[mid] === target) {
                        // Found the target
                        if (midElement) {
                            midElement.classList.remove('comparing');
                            midElement.classList.add('found');
                        }
                        
                        document.getElementById('search-result').innerHTML = `
                            <div class="success-message">
                                🎉 Found ${target} at index ${mid}! 
                                <br>Steps taken: ${step + 1}
                            </div>
                        `;
                        
                        performanceMetrics.endTime = performance.now();
                        updatePerformanceMetrics();
                        isAnimating = false;
                        
                        if (audioSystem) {
                            audioSystem.play('success');
                        }
                        return;
                    } else if (array[mid] < target) {
                        // Target is in the right half
                        for (let i = left; i <= mid; i++) {
                            const element = document.getElementById(`binary-element-${i}`);
                            if (element) {
                                element.classList.add('eliminated');
                            }
                        }
                        left = mid + 1;
                    } else {
                        // Target is in the left half
                        for (let i = mid; i <= right; i++) {
                            const element = document.getElementById(`binary-element-${i}`);
                            if (element) {
                                element.classList.add('eliminated');
                            }
                        }
                        right = mid - 1;
                    }
                    
                    step++;
                    searchStep();
                }, animationSpeed));
            } else {
                // Target not found
                document.querySelectorAll('.binary-element').forEach(el => {
                    el.classList.add('eliminated');
                });
                
                document.getElementById('search-result').innerHTML = `
                    <div class="error-message">
                        ❌ ${target} not found in the array!
                        <br>Steps taken: ${step}
                    </div>
                `;
                
                performanceMetrics.endTime = performance.now();
                updatePerformanceMetrics();
                isAnimating = false;
                
                if (audioSystem) {
                    audioSystem.play('error');
                }
            }
        };
        
        searchStep();
    },

    // Reset visualization
    reset: function() {
        clearAllTimeouts();
        isAnimating = false;
        const array = currentArray.length > 0 ? [...currentArray].sort((a, b) => a - b) : [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
        this.renderArray(array);
        
        // Reset UI elements
        document.getElementById('left-pointer').textContent = '0';
        document.getElementById('mid-pointer').textContent = '-';
        document.getElementById('right-pointer').textContent = (array.length - 1).toString();
        document.getElementById('search-result').textContent = 'Ready to search!';
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Randomize array and target
    randomize: function() {
        clearAllTimeouts();
        isAnimating = false;
        
        // Generate sorted array
        const newArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);
        const newTarget = newArray[Math.floor(Math.random() * newArray.length)];
        
        this.renderArray(newArray);
        document.getElementById('search-target').value = newTarget;
        
        // Reset UI elements
        document.getElementById('left-pointer').textContent = '0';
        document.getElementById('mid-pointer').textContent = '-';
        document.getElementById('right-pointer').textContent = (newArray.length - 1).toString();
        document.getElementById('search-result').textContent = 'Ready to search!';
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('binary-search', BinarySearch);
}