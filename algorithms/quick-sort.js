/**
 * Quick Sort Algorithm Implementation
 * Lightning-fast in practice with smart pivot selection and cache efficiency!
 * Picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.
 */

const QuickSort = {
    // Algorithm metadata
    meta: {
        name: 'Quick Sort',
        emoji: '⚡',
        category: 'sorting',
        difficulty: 'intermediate',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(log n)',
        stable: false,
        inPlace: true,
        description: 'Lightning-fast in practice with smart pivot selection and cache efficiency!',
        features: ['⚡ In-place', '🎯 Cache-friendly', '🔥 Practical'],
        badge: '⚡ FASTEST',
        cardClass: 'card-fast'
    },

    // Algorithm implementation
    algorithm: function quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            
            this.algorithm(arr, low, pi - 1);
            this.algorithm(arr, pi + 1, high);
        }
        
        return arr;
    },

    // Partition function
    partition: function(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        let array = currentArray.length > 0 ? [...currentArray] : [64, 34, 25, 12, 22, 11, 90];
        
        container.innerHTML = `
            <div class="quick-sort-container">
                <div class="pivot-indicator" id="pivot-indicator">Pivot: <span id="pivot-value">-</span></div>
                <div class="array-container" id="quick-array"></div>
                <div class="partition-info" id="partition-info">
                    <span class="less-than">Less than pivot</span>
                    <span class="pivot-element">Pivot</span>
                    <span class="greater-than">Greater than pivot</span>
                </div>
            </div>
        `;
        
        this.renderArray(array, 'quick');
        
        document.getElementById('start-btn').onclick = () => this.startVisualization(array);
        document.getElementById('reset-btn').onclick = () => this.reset();
        document.getElementById('random-btn').onclick = () => this.randomize();
    },

    // Render array visualization
    renderArray: function(array, prefix) {
        const container = document.getElementById(`${prefix}-array`);
        if (!container) return;
        
        container.innerHTML = '';
        const maxValue = Math.max(...array);
        
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element quick-element';
            element.style.height = `${(value / maxValue) * 200}px`;
            element.textContent = value;
            element.id = `${prefix}-element-${index}`;
            container.appendChild(element);
        });
    },

    // Start visualization
    startVisualization: function(array) {
        if (isAnimating) return;
        isAnimating = true;
        
        const arr = [...array];
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        performanceMetrics.comparisons = 0;
        
        this.visualizeQuickSort(arr, 0, arr.length - 1);
    },

    // Visualize quick sort
    visualizeQuickSort: function(arr, low, high) {
        if (low >= high) {
            // Mark single element as sorted
            if (low === high) {
                const element = document.getElementById(`quick-element-${low}`);
                if (element) {
                    element.classList.add('sorted');
                }
            }
            
            // Check if we're done
            if (low === 0 && high === arr.length - 1) {
                performanceMetrics.endTime = performance.now();
                updatePerformanceMetrics();
                isAnimating = false;
                
                if (audioSystem) {
                    audioSystem.play('success');
                }
            }
            return;
        }
        
        // Highlight current partition
        this.highlightPartition(low, high);
        
        // Show pivot
        const pivotValue = arr[high];
        const pivotIndicator = document.getElementById('pivot-value');
        if (pivotIndicator) {
            pivotIndicator.textContent = pivotValue;
        }
        
        animationTimeouts.push(setTimeout(() => {
            const pi = this.visualizePartition(arr, low, high);
            
            animationTimeouts.push(setTimeout(() => {
                // Recursively sort left and right partitions
                this.visualizeQuickSort(arr, low, pi - 1);
                
                animationTimeouts.push(setTimeout(() => {
                    this.visualizeQuickSort(arr, pi + 1, high);
                }, animationSpeed));
            }, animationSpeed));
        }, animationSpeed));
    },

    // Visualize partition process
    visualizePartition: function(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        // Highlight pivot
        const pivotElement = document.getElementById(`quick-element-${high}`);
        if (pivotElement) {
            pivotElement.classList.add('pivot');
        }
        
        for (let j = low; j < high; j++) {
            performanceMetrics.comparisons++;
            
            // Highlight current comparison
            const currentElement = document.getElementById(`quick-element-${j}`);
            if (currentElement) {
                currentElement.classList.add('comparing');
            }
            
            if (arr[j] < pivot) {
                i++;
                if (i !== j) {
                    // Swap elements
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    this.swapElements(i, j);
                    performanceMetrics.operations++;
                }
                
                // Mark as less than pivot
                const element = document.getElementById(`quick-element-${i}`);
                if (element) {
                    element.classList.add('less-than-pivot');
                }
            } else {
                // Mark as greater than pivot
                if (currentElement) {
                    currentElement.classList.add('greater-than-pivot');
                }
            }
            
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('step');
            }
        }
        
        // Place pivot in correct position
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this.swapElements(i + 1, high);
        performanceMetrics.operations++;
        
        // Mark pivot as sorted
        const finalPivotElement = document.getElementById(`quick-element-${i + 1}`);
        if (finalPivotElement) {
            finalPivotElement.classList.remove('pivot');
            finalPivotElement.classList.add('sorted');
        }
        
        return i + 1;
    },

    // Highlight current partition
    highlightPartition: function(low, high) {
        // Clear previous highlights
        document.querySelectorAll('.quick-element').forEach(el => {
            el.classList.remove('comparing', 'pivot', 'less-than-pivot', 'greater-than-pivot', 'current-partition');
        });
        
        // Highlight current partition
        for (let i = low; i <= high; i++) {
            const element = document.getElementById(`quick-element-${i}`);
            if (element && !element.classList.contains('sorted')) {
                element.classList.add('current-partition');
            }
        }
    },

    // Swap elements visually
    swapElements: function(i, j) {
        const elem1 = document.getElementById(`quick-element-${i}`);
        const elem2 = document.getElementById(`quick-element-${j}`);
        
        if (elem1 && elem2) {
            const temp = elem1.textContent;
            const tempHeight = elem1.style.height;
            elem1.textContent = elem2.textContent;
            elem1.style.height = elem2.style.height;
            elem2.textContent = temp;
            elem2.style.height = tempHeight;
        }
    },

    // Reset visualization
    reset: function() {
        clearAllTimeouts();
        isAnimating = false;
        const array = currentArray.length > 0 ? [...currentArray] : [64, 34, 25, 12, 22, 11, 90];
        this.renderArray(array, 'quick');
        
        // Reset pivot indicator
        const pivotIndicator = document.getElementById('pivot-value');
        if (pivotIndicator) {
            pivotIndicator.textContent = '-';
        }
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Randomize array
    randomize: function() {
        clearAllTimeouts();
        isAnimating = false;
        const newArray = Array.from({length: 7}, () => Math.floor(Math.random() * 100) + 1);
        this.renderArray(newArray, 'quick');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('quick-sort', QuickSort);
}