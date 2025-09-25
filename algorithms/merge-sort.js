/**
 * Merge Sort Algorithm Implementation
 * The ULTIMATE divide & conquer algorithm with guaranteed O(n log n) performance!
 * Divides the array into halves, sorts them separately, and then merges them back together.
 */

const MergeSort = {
    // Algorithm metadata
    meta: {
        name: 'Merge Sort',
        emoji: '🏆',
        category: 'sorting',
        difficulty: 'intermediate',
        timeComplexity: {
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)'
        },
        spaceComplexity: 'O(n)',
        stable: true,
        inPlace: false,
        description: 'The ULTIMATE divide & conquer algorithm with guaranteed O(n log n) performance!',
        features: ['🌟 Stable', '🎯 Consistent', '🚀 Fast'],
        badge: '👑 BEST OVERALL',
        cardClass: 'card-best'
    },

    // Algorithm implementation
    algorithm: function mergeSort(arr) {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = this.algorithm(arr.slice(0, mid));
        const right = this.algorithm(arr.slice(mid));
        
        return this.merge(left, right);
    },

    // Merge helper function
    merge: function(left, right) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        
        return result.concat(left.slice(i), right.slice(j));
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        let array = currentArray.length > 0 ? [...currentArray] : [38, 27, 43, 3, 9, 82, 10];
        
        container.innerHTML = `
            <div class="merge-sort-container">
                <div class="merge-tree" id="merge-tree"></div>
                <div class="array-container" id="merge-array"></div>
            </div>
        `;
        
        this.renderArray(array, 'merge');
        
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
            element.className = 'array-element merge-element';
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
        
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        performanceMetrics.comparisons = 0;
        
        this.visualizeMergeSort([...array], 0);
    },

    // Visualize merge sort with tree representation
    visualizeMergeSort: function(arr, depth) {
        const steps = [];
        let stepIndex = 0;
        
        const mergeSortWithSteps = (array, start, end, level) => {
            if (start >= end) return [array[start]];
            
            const mid = Math.floor((start + end) / 2);
            
            // Add division step
            steps.push({
                type: 'divide',
                array: array.slice(start, end + 1),
                start: start,
                end: end,
                mid: mid,
                level: level
            });
            
            const left = mergeSortWithSteps(array, start, mid, level + 1);
            const right = mergeSortWithSteps(array, mid + 1, end, level + 1);
            
            const merged = this.mergeWithSteps(left, right, start, level);
            
            // Add merge step
            steps.push({
                type: 'merge',
                left: left,
                right: right,
                result: merged,
                start: start,
                level: level
            });
            
            return merged;
        };
        
        mergeSortWithSteps(arr, 0, arr.length - 1, 0);
        
        this.animateSteps(steps);
    },

    // Merge with step tracking
    mergeWithSteps: function(left, right, startIndex, level) {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
            performanceMetrics.comparisons++;
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
            performanceMetrics.operations++;
        }
        
        return result.concat(left.slice(i), right.slice(j));
    },

    // Animate the merge sort steps
    animateSteps: function(steps) {
        let currentStep = 0;
        
        const animateStep = () => {
            if (currentStep >= steps.length) {
                // Animation complete
                document.querySelectorAll('.merge-element').forEach(el => {
                    el.classList.add('sorted');
                });
                
                performanceMetrics.endTime = performance.now();
                updatePerformanceMetrics();
                isAnimating = false;
                
                if (audioSystem) {
                    audioSystem.play('success');
                }
                return;
            }
            
            const step = steps[currentStep];
            
            // Clear previous highlights
            document.querySelectorAll('.merge-element').forEach(el => {
                el.classList.remove('comparing', 'merging');
            });
            
            if (step.type === 'divide') {
                // Highlight elements being divided
                for (let i = step.start; i <= step.end; i++) {
                    const element = document.getElementById(`merge-element-${i}`);
                    if (element) {
                        element.classList.add('comparing');
                    }
                }
            } else if (step.type === 'merge') {
                // Highlight elements being merged
                step.left.concat(step.right).forEach((value, index) => {
                    const element = document.getElementById(`merge-element-${step.start + index}`);
                    if (element) {
                        element.classList.add('merging');
                    }
                });
            }
            
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('step');
            }
            
            currentStep++;
            animationTimeouts.push(setTimeout(animateStep, animationSpeed));
        };
        
        animateStep();
    },

    // Reset visualization
    reset: function() {
        clearAllTimeouts();
        isAnimating = false;
        const array = currentArray.length > 0 ? [...currentArray] : [38, 27, 43, 3, 9, 82, 10];
        this.renderArray(array, 'merge');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Randomize array
    randomize: function() {
        clearAllTimeouts();
        isAnimating = false;
        const newArray = Array.from({length: 7}, () => Math.floor(Math.random() * 100) + 1);
        this.renderArray(newArray, 'merge');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('merge-sort', MergeSort);
}