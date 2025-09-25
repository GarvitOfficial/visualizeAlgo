/**
 * Algorithm Registry System
 * Automatically discovers, loads, and manages algorithm modules
 * Makes it easy for contributors to add new algorithms by simply creating a new file
 */

class AlgorithmRegistry {
    constructor() {
        this.algorithms = new Map();
        this.categories = new Map();
        this.loadedScripts = new Set();
    }

    /**
     * Register a new algorithm
     * @param {string} id - Unique identifier for the algorithm
     * @param {object} algorithmModule - The algorithm module object
     */
    register(id, algorithmModule) {
        console.log(`🔄 Attempting to register: ${id}`);
        
        if (!algorithmModule.meta || !algorithmModule.init) {
            console.error(`❌ Algorithm ${id} is missing required meta or init properties`);
            return false;
        }

        this.algorithms.set(id, algorithmModule);
        
        // Organize by category
        const category = algorithmModule.meta.category || 'other';
        if (!this.categories.has(category)) {
            this.categories.set(category, []);
        }
        this.categories.get(category).push(id);

        console.log(`✅ Registered algorithm: ${algorithmModule.meta.name} (${id}) in category: ${category}`);
        return true;
    }

    /**
     * Get an algorithm by ID
     * @param {string} id - Algorithm identifier
     * @returns {object|null} Algorithm module or null if not found
     */
    get(id) {
        return this.algorithms.get(id) || null;
    }

    /**
     * Get all algorithms in a category
     * @param {string} category - Category name
     * @returns {Array} Array of algorithm objects
     */
    getByCategory(category) {
        const algorithmIds = this.categories.get(category) || [];
        return algorithmIds.map(id => ({
            id,
            ...this.algorithms.get(id)
        }));
    }

    /**
     * Get all registered algorithms
     * @returns {Array} Array of all algorithm objects
     */
    getAll() {
        const result = [];
        for (const [id, algorithm] of this.algorithms) {
            result.push({ id, ...algorithm });
        }
        return result;
    }

    /**
     * Get all categories
     * @returns {Array} Array of category names
     */
    getCategories() {
        return Array.from(this.categories.keys());
    }

    /**
     * Load algorithm scripts dynamically
     * @param {Array} algorithmFiles - Array of algorithm file paths
     */
    async loadAlgorithms(algorithmFiles) {
        const loadPromises = algorithmFiles.map(file => this.loadScript(file));
        
        try {
            await Promise.all(loadPromises);
            console.log(`🚀 Loaded ${algorithmFiles.length} algorithm modules`);
            this.generateAlgorithmCards();
        } catch (error) {
            console.error('Error loading algorithms:', error);
        }
    }

    /**
     * Load a single script file
     * @param {string} scriptPath - Path to the script file
     */
    loadScript(scriptPath) {
        return new Promise((resolve, reject) => {
            if (this.loadedScripts.has(scriptPath)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = scriptPath;
            script.onload = () => {
                this.loadedScripts.add(scriptPath);
                // Small delay to ensure algorithm registration completes
                setTimeout(resolve, 50);
            };
            script.onerror = () => reject(new Error(`Failed to load ${scriptPath}`));
            
            document.head.appendChild(script);
        });
    }

    /**
     * Auto-discover algorithm files
     * This would typically scan a directory, but for web we'll use a manifest
     */
    async autoDiscover() {
        // Algorithm files manifest - contributors add their files here
        const algorithmFiles = [
            'algorithms/bubble-sort.js',
            'algorithms/merge-sort.js',
            'algorithms/quick-sort.js',
            'algorithms/binary-search.js',
            'algorithms/stack.js',
            'algorithms/queue.js',
            'algorithms/linked-list.js',
            'algorithms/circular-queue.js',
            'algorithms/circular-linked-list.js',
            // Add new algorithm files here - they will be automatically loaded!
        ];

        await this.loadAlgorithms(algorithmFiles);
    }

    /**
     * Generate algorithm cards dynamically
     */
    generateAlgorithmCards() {
        console.log('🎨 Generating algorithm cards...');
        console.log('📊 Total registered algorithms:', this.algorithms.size);
        
        const sortingAlgorithms = this.getByCategory('sorting');
        const searchAlgorithms = this.getByCategory('search');
        const dataStructures = this.getByCategory('data-structure');
        
        console.log('📋 Sorting algorithms:', sortingAlgorithms.length);
        console.log('🔍 Search algorithms:', searchAlgorithms.length);
        console.log('🏗️ Data structures:', dataStructures.length);
        
        // Generate sorting algorithm cards
        this.generateCategoryCards('algorithms', sortingAlgorithms.concat(searchAlgorithms));
        
        // Generate data structure cards (if any)
        if (dataStructures.length > 0) {
            this.generateCategoryCards('data-structures', dataStructures);
        }
        
        console.log('✅ Card generation complete!');
    }

    /**
     * Generate cards for a specific category
     * @param {string} sectionId - Section ID in the HTML
     * @param {Array} algorithms - Array of algorithms
     */
    generateCategoryCards(sectionId, algorithms) {
        console.log(`🎯 Generating cards for section: ${sectionId} with ${algorithms.length} algorithms`);
        
        const section = document.getElementById(sectionId);
        if (!section) {
            console.error(`❌ Section not found: ${sectionId}`);
            return;
        }

        const cardsGrid = section.querySelector('.cards-grid');
        if (!cardsGrid) {
            console.error(`❌ Cards grid not found in section: ${sectionId}`);
            return;
        }

        console.log(`📦 Found section and grid for: ${sectionId}`);

        // Clear existing cards
        cardsGrid.innerHTML = '';

        // Sort algorithms by priority (best first)
        const sortedAlgorithms = algorithms.sort((a, b) => {
            const priorityOrder = ['card-best', 'card-fast', 'card-search', 'card-educational', 'card-hidden', 'card-special'];
            const aPriority = priorityOrder.indexOf(a.meta.cardClass) !== -1 ? priorityOrder.indexOf(a.meta.cardClass) : 999;
            const bPriority = priorityOrder.indexOf(b.meta.cardClass) !== -1 ? priorityOrder.indexOf(b.meta.cardClass) : 999;
            return aPriority - bPriority;
        });

        console.log(`🔄 Creating ${sortedAlgorithms.length} cards...`);

        // Generate cards
        sortedAlgorithms.forEach((algorithm, index) => {
            console.log(`📋 Creating card ${index + 1}: ${algorithm.meta.name}`);
            const card = this.createAlgorithmCard(algorithm);
            cardsGrid.appendChild(card);
        });
        
        console.log(`✅ Successfully created cards for: ${sectionId}`);
    }

    /**
     * Create a single algorithm card
     * @param {object} algorithm - Algorithm object
     * @returns {HTMLElement} Card element
     */
    createAlgorithmCard(algorithm) {
        const card = document.createElement('div');
        card.className = `card ${algorithm.meta.cardClass || ''}`;
        card.setAttribute('data-complexity', algorithm.meta.timeComplexity.average);
        card.onclick = () => openVisualization(algorithm.id);

        // Create badge if specified
        const badge = algorithm.meta.badge ? `<div class="${this.getBadgeClass(algorithm.meta.cardClass)}">${algorithm.meta.badge}</div>` : '';
        
        // Create special effects if specified
        const effects = this.getCardEffects(algorithm.meta.cardClass);

        card.innerHTML = `
            ${badge}
            <div class="card-glow ${algorithm.meta.cardClass === 'card-best' ? 'card-glow-best' : ''}"></div>
            <div class="card-content">
                <div class="card-icon ${algorithm.meta.cardClass === 'card-best' ? 'card-icon-best' : ''}">
                    <i class="fas fa-${this.getIconClass(algorithm.meta.category)}"></i>
                    ${effects}
                </div>
                <h3 class="card-title">${algorithm.meta.name} ${algorithm.meta.emoji}</h3>
                <p class="card-description">${algorithm.meta.description}</p>
                <div class="card-metrics">
                    <span class="metric ${algorithm.meta.cardClass === 'card-best' ? 'metric-best' : ''}">
                        <i class="fas fa-${this.getMetricIcon(algorithm.meta.cardClass)}"></i>
                        ${algorithm.meta.timeComplexity.average}
                    </span>
                    <span class="metric">
                        <i class="fas fa-memory"></i>
                        ${algorithm.meta.spaceComplexity}
                    </span>
                </div>
                <div class="card-features">
                    ${algorithm.meta.features.map(feature => 
                        `<span class="feature ${algorithm.meta.cardClass === 'card-best' ? 'feature-best' : ''}">${feature}</span>`
                    ).join('')}
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Get badge CSS class based on card class
     */
    getBadgeClass(cardClass) {
        const badgeClasses = {
            'card-best': 'best-badge',
            'card-fast': 'speed-badge',
            'card-educational': 'edu-badge',
            'card-search': 'search-badge',
            'card-hidden': 'hidden-badge',
            'card-special': 'special-badge'
        };
        return badgeClasses[cardClass] || 'badge';
    }

    /**
     * Get icon class based on category
     */
    getIconClass(category) {
        const iconClasses = {
            'sorting': 'sort',
            'search': 'search',
            'data-structure': 'layer-group',
            'graph': 'project-diagram',
            'tree': 'sitemap'
        };
        return iconClasses[category] || 'cog';
    }

    /**
     * Get metric icon based on card class
     */
    getMetricIcon(cardClass) {
        const metricIcons = {
            'card-best': 'rocket',
            'card-fast': 'tachometer-alt',
            'card-educational': 'graduation-cap',
            'card-search': 'bullseye',
            'card-hidden': 'gem',
            'card-special': 'magic'
        };
        return metricIcons[cardClass] || 'clock';
    }

    /**
     * Get special effects for card
     */
    getCardEffects(cardClass) {
        const effects = {
            'card-best': '<div class="icon-sparkles">✨</div>',
            'card-fast': '<div class="lightning-effect">⚡⚡</div>',
            'card-educational': '<div class="bubble-effect">🫧🫧🫧</div>',
            'card-search': '<div class="search-rays">🔍✨</div>',
            'card-hidden': '<div class="gem-sparkle">💎✨</div>',
            'card-special': '<div class="rainbow-effect">🌈</div>'
        };
        return effects[cardClass] || '';
    }

    /**
     * Initialize an algorithm visualization
     * @param {string} algorithmId - Algorithm identifier
     */
    initializeAlgorithm(algorithmId) {
        const algorithm = this.get(algorithmId);
        if (!algorithm) {
            console.error(`Algorithm ${algorithmId} not found`);
            return false;
        }

        try {
            algorithm.init();
            return true;
        } catch (error) {
            console.error(`Error initializing algorithm ${algorithmId}:`, error);
            return false;
        }
    }
}

// Create global registry instance immediately
const algorithmRegistry = new AlgorithmRegistry();

// Make it available globally for algorithm files to register themselves
window.AlgorithmRegistry = algorithmRegistry;

// Also make the register function available globally for easier access
window.registerAlgorithm = (id, algorithm) => algorithmRegistry.register(id, algorithm);

// Auto-discover and load algorithms when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, starting auto-discovery...');
    algorithmRegistry.autoDiscover();
    
    // Add a test function to manually trigger card generation
    window.testCardGeneration = () => {
        console.log('🧪 Manual test triggered');
        console.log('📊 Registry state:', algorithmRegistry.algorithms);
        console.log('📂 Categories:', algorithmRegistry.categories);
        algorithmRegistry.generateAlgorithmCards();
    };
    
    // Fallback: try again after a delay
    setTimeout(() => {
        console.log('⏰ Fallback: Attempting card generation after delay...');
        algorithmRegistry.generateAlgorithmCards();
    }, 2000);
});

console.log('🎯 Algorithm Registry System initialized - Ready for contributions!');