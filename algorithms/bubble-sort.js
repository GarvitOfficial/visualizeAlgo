/**
 * Bubble Sort Algorithm Implementation
 * A simple sorting algorithm that repeatedly steps through the list,
 * compares adjacent elements and swaps them if they are in the wrong order.
 */

const BubbleSort = {
    // Algorithm metadata
    meta: {
        name: 'Bubble Sort',
        emoji: '🫧',
        category: 'sorting',
        difficulty: 'beginner',
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n²)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stable: true,
        inPlace: true,
        description: 'Perfect for learning! Watch elements "bubble up" with mesmerizing animations',
        features: ['🎨 Beautiful', '📖 Simple', '🎵 Sounds'],
        badge: '📚 EDUCATIONAL',
        cardClass: 'card-educational'
    },

    // Algorithm implementation
    algorithm: function bubbleSort(arr) {
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        
        return arr;
    },

    // Visualization initialization
    init: function() {
        const container = document.getElementById('visualization-container');
        let array = currentArray.length > 0 ? [...currentArray] : [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
        
        container.innerHTML = '<div class="array-container" id="bubble-array"></div>';
        this.renderArray(array, 'bubble');
        
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
            element.className = 'array-element';
            element.style.height = `${(value / maxValue) * 250}px`;
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
        let i = 0;
        let j = 0;
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        performanceMetrics.comparisons = 0;
        
        const bubbleStep = () => {
            if (i < arr.length - 1) {
                if (j < arr.length - i - 1) {
                    // Clear previous highlights
                    document.querySelectorAll('.array-element').forEach(el => {
                        el.classList.remove('comparing');
                    });
                    
                    // Highlight comparing elements
                    const elem1 = document.getElementById(`bubble-element-${j}`);
                    const elem2 = document.getElementById(`bubble-element-${j + 1}`);
                    if (elem1 && elem2) {
                        elem1.classList.add('comparing');
                        elem2.classList.add('comparing');
                    }
                    
                    performanceMetrics.comparisons++;
                    
                    animationTimeouts.push(setTimeout(() => {
                        if (arr[j] > arr[j + 1]) {
                            // Swap elements
                            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                            performanceMetrics.operations++;
                            
                            // Update visual
                            if (elem1 && elem2) {
                                const temp = elem1.textContent;
                                const tempHeight = elem1.style.height;
                                elem1.textContent = elem2.textContent;
                                elem1.style.height = elem2.style.height;
                                elem2.textContent = temp;
                                elem2.style.height = tempHeight;
                            }
                            
                            // Play sound effect
                            if (audioSystem) {
                                audioSystem.play('step');
                            }
                        }
                        
                        j++;
                        updatePerformanceMetrics();
                        bubbleStep();
                    }, animationSpeed));
                } else {
                    // Mark last element as sorted
                    const sortedElement = document.getElementById(`bubble-element-${arr.length - i - 1}`);
                    if (sortedElement) {
                        sortedElement.classList.add('sorted');
                    }
                    i++;
                    j = 0;
                    bubbleStep();
                }
            } else {
                // Mark first element as sorted
                const firstElement = document.getElementById('bubble-element-0');
                if (firstElement) {
                    firstElement.classList.add('sorted');
                }
                document.querySelectorAll('.array-element').forEach(el => {
                    el.classList.remove('comparing');
                });
                
                performanceMetrics.endTime = performance.now();
                updatePerformanceMetrics();
                isAnimating = false;
                
                if (audioSystem) {
                    audioSystem.play('success');
                }
            }
        };
        
        bubbleStep();
    },

    // Reset visualization
    reset: function() {
        clearAllTimeouts();
        isAnimating = false;
        const array = currentArray.length > 0 ? [...currentArray] : [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
        this.renderArray(array, 'bubble');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Randomize array
    randomize: function() {
        clearAllTimeouts();
        isAnimating = false;
        const newArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100) + 1);
        this.renderArray(newArray, 'bubble');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    }
};

// Register algorithm
if (window.AlgorithmRegistry) {
    window.AlgorithmRegistry.register('bubble-sort', BubbleSort);
}