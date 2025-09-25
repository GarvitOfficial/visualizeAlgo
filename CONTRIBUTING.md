# 🚀 Contributing to Algorithm Visualizer Pro

Welcome to the most exciting algorithm visualization project! We've made it incredibly easy for you to contribute new algorithms. Just follow this guide and your algorithm will be automatically integrated into the platform!

## 🎯 Quick Start - Adding a New Algorithm

### Step 1: Create Your Algorithm File
1. Create a new file in the `algorithms/` directory
2. Name it descriptively: `your-algorithm-name.js`
3. Use the template below as your starting point

### Step 2: Register Your Algorithm
1. Add your file path to the `algorithmFiles` array in `core/algorithm-registry.js`
2. That's it! The system will automatically load and display your algorithm

## 📋 Algorithm Template

Copy this template and customize it for your algorithm:

```javascript
/**
 * Your Algorithm Name Implementation
 * Brief description of what your algorithm does
 */

const YourAlgorithmName = {
    // Algorithm metadata - REQUIRED
    meta: {
        name: 'Your Algorithm Name',
        emoji: '🎯', // Choose a fun emoji!
        category: 'sorting', // 'sorting', 'search', 'data-structure', 'graph', 'tree'
        difficulty: 'beginner', // 'beginner', 'intermediate', 'advanced'
        timeComplexity: {
            best: 'O(n)',
            average: 'O(n log n)',
            worst: 'O(n²)'
        },
        spaceComplexity: 'O(1)',
        stable: true, // true/false
        inPlace: true, // true/false
        description: 'Amazing description that will appear on the card',
        features: ['🎨 Feature 1', '⚡ Feature 2', '🎯 Feature 3'],
        badge: '🌟 YOUR BADGE', // Optional special badge
        cardClass: 'card-special' // 'card-best', 'card-fast', 'card-educational', 'card-search', 'card-hidden', 'card-special'
    },

    // Algorithm implementation - REQUIRED
    algorithm: function yourAlgorithm(arr) {
        // Your algorithm logic here
        return arr;
    },

    // Visualization initialization - REQUIRED
    init: function() {
        const container = document.getElementById('visualization-container');
        let array = currentArray.length > 0 ? [...currentArray] : [/* default array */];
        
        // Create your visualization HTML
        container.innerHTML = \`
            <div class="your-algorithm-container">
                <div class="array-container" id="your-array"></div>
                <!-- Add any additional UI elements -->
            </div>
        \`;
        
        this.renderArray(array, 'your');
        
        // Set up button handlers
        document.getElementById('start-btn').onclick = () => this.startVisualization(array);
        document.getElementById('reset-btn').onclick = () => this.reset();
        document.getElementById('random-btn').onclick = () => this.randomize();
    },

    // Render array visualization - RECOMMENDED
    renderArray: function(array, prefix) {
        const container = document.getElementById(\`\${prefix}-array\`);
        if (!container) return;
        
        container.innerHTML = '';
        const maxValue = Math.max(...array);
        
        array.forEach((value, index) => {
            const element = document.createElement('div');
            element.className = 'array-element your-element';
            element.style.height = \`\${(value / maxValue) * 200}px\`;
            element.textContent = value;
            element.id = \`\${prefix}-element-\${index}\`;
            container.appendChild(element);
        });
    },

    // Start visualization - REQUIRED
    startVisualization: function(array) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Initialize performance metrics
        performanceMetrics.startTime = performance.now();
        performanceMetrics.operations = 0;
        performanceMetrics.comparisons = 0;
        
        // Your visualization logic here
        // Use animationTimeouts.push(setTimeout(...)) for animations
        // Call updatePerformanceMetrics() to update counters
        // Play sounds with audioSystem.play('step'/'success'/'error')
        
        // Example animation step:
        const animateStep = () => {
            // Your animation logic
            performanceMetrics.operations++;
            updatePerformanceMetrics();
            
            if (audioSystem) {
                audioSystem.play('step');
            }
            
            // Continue or finish
            if (/* more steps */) {
                animationTimeouts.push(setTimeout(animateStep, animationSpeed));
            } else {
                // Finish
                performanceMetrics.endTime = performance.now();
                updatePerformanceMetrics();
                isAnimating = false;
                
                if (audioSystem) {
                    audioSystem.play('success');
                }
            }
        };
        
        animateStep();
    },

    // Reset visualization - REQUIRED
    reset: function() {
        clearAllTimeouts();
        isAnimating = false;
        const array = currentArray.length > 0 ? [...currentArray] : [/* default array */];
        this.renderArray(array, 'your');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    },

    // Randomize array - REQUIRED
    randomize: function() {
        clearAllTimeouts();
        isAnimating = false;
        const newArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100) + 1);
        this.renderArray(newArray, 'your');
        
        if (audioSystem) {
            audioSystem.play('click');
        }
    }
};

// Register algorithm - REQUIRED
if (typeof AlgorithmRegistry !== 'undefined') {
    AlgorithmRegistry.register('your-algorithm-name', YourAlgorithmName);
}
```

## 🎨 Card Classes & Styling

Choose the appropriate card class for your algorithm:

- **`card-best`** - For the absolute best algorithms (golden theme)
- **`card-fast`** - For the fastest algorithms (red/orange theme)
- **`card-educational`** - For learning-friendly algorithms (green theme)
- **`card-search`** - For search algorithms (blue theme)
- **`card-hidden`** - For underrated gems (purple theme)
- **`card-special`** - For unique algorithms (rainbow theme)

## 🎵 Audio & Visual Effects

### Available Audio Effects:
- `audioSystem.play('step')` - For each algorithm step
- `audioSystem.play('success')` - When algorithm completes
- `audioSystem.play('error')` - For errors
- `audioSystem.play('click')` - For button clicks

### CSS Classes for Visual Effects:
- `.comparing` - Highlight elements being compared
- `.found` - Highlight found/target elements
- `.sorted` - Mark elements as sorted
- `.eliminated` - Mark elements as eliminated (search)
- `.current-range` - Highlight current working range

## 📊 Performance Metrics

Always update performance metrics in your visualization:

```javascript
performanceMetrics.operations++; // Increment for swaps, moves, etc.
performanceMetrics.comparisons++; // Increment for comparisons
updatePerformanceMetrics(); // Update the UI
```

## 🎯 Animation Best Practices

1. **Use the global animation system:**
   ```javascript
   animationTimeouts.push(setTimeout(() => {
       // Your animation step
   }, animationSpeed));
   ```

2. **Respect the animation speed:**
   - Use the global `animationSpeed` variable
   - Users can adjust speed with the slider

3. **Clean up properly:**
   - Always call `clearAllTimeouts()` in reset/randomize
   - Set `isAnimating = false` when done

4. **Provide visual feedback:**
   - Highlight active elements
   - Show progress clearly
   - Use colors meaningfully

## 🚀 Advanced Features

### Custom UI Elements
You can add custom controls to your visualization:

```javascript
container.innerHTML = \`
    <div class="custom-controls">
        <button onclick="YourAlgorithm.customFunction()">Custom Action</button>
        <input type="range" id="custom-slider" min="1" max="10">
    </div>
    <div class="array-container" id="your-array"></div>
\`;
```

### Data Structure Visualizations
For data structures, create interactive elements:

```javascript
// Example: Stack visualization
const stackElement = document.createElement('div');
stackElement.className = 'stack-element';
stackElement.onclick = () => this.removeElement(index);
```

## 📁 File Organization

```
algorithms/
├── bubble-sort.js          ✅ Sorting algorithm
├── merge-sort.js           ✅ Sorting algorithm  
├── quick-sort.js           ✅ Sorting algorithm
├── binary-search.js        ✅ Search algorithm
├── your-new-algorithm.js   🆕 Your contribution!
└── ...
```

## 🎉 Examples of Great Contributions

Look at existing algorithms for inspiration:
- **Bubble Sort** - Simple, educational, great for beginners
- **Merge Sort** - Complex, tree-based visualization
- **Quick Sort** - Interactive partitioning
- **Binary Search** - Search with range highlighting

## 🔧 Testing Your Algorithm

1. Add your file to the `algorithmFiles` array
2. Refresh the page
3. Your algorithm should appear automatically!
4. Test all functions: start, reset, randomize
5. Verify animations work smoothly
6. Check performance metrics update

## 🌟 Contribution Checklist

- [ ] Algorithm file created in `algorithms/` directory
- [ ] File added to `algorithmFiles` array in registry
- [ ] All required functions implemented (init, startVisualization, reset, randomize)
- [ ] Metadata properly filled out
- [ ] Visual animations work smoothly
- [ ] Audio feedback implemented
- [ ] Performance metrics update correctly
- [ ] Responsive design (works on mobile)
- [ ] Code is clean and well-commented

## 🎯 Pro Tips

1. **Study existing algorithms** - They're great examples!
2. **Start simple** - Get basic functionality working first
3. **Add flair gradually** - Animations, sounds, special effects
4. **Test thoroughly** - Try different array sizes and edge cases
5. **Make it educational** - Clear visual feedback helps learning
6. **Have fun!** - This is about making algorithms exciting!

## 🤝 Getting Help

- Check existing algorithm implementations for patterns
- The registry system handles card generation automatically
- All global utilities (audio, animations, metrics) are available
- Feel free to ask questions or suggest improvements!

---

**Ready to contribute? Just create your algorithm file and watch the magic happen! 🎉**