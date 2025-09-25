// Global variables
let isAnimating = false;
let animationSpeed = 600;
let animationTimeouts = [];
let currentVisualization = '';
let currentArray = [];
let arrayBuilder = null;
let soundEnabled = true;

// Loading screen control
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading for 1.5 seconds
    }
}

// Simple notification system
function showNotification(message, type = 'success', icon = '✅') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    
    container.appendChild(notification);
    
    // Auto remove after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Performance metrics
let performanceMetrics = {
    operations: 0,
    comparisons: 0,
    startTime: 0,
    endTime: 0
};

// Simple Audio System
class SimpleAudioSystem {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
    }
    
    play(type) {
        if (!this.enabled || !soundEnabled) return;
        
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Different frequencies for different sounds
            const frequencies = {
                'click': 800,
                'success': 1000,
                'error': 400,
                'step': 600
            };
            
            oscillator.frequency.setValueAtTime(frequencies[type] || 600, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        } catch (error) {
            console.log('Audio not supported');
        }
    }
}

// Simple Theme System
class SimpleThemeSystem {
    constructor() {
        this.isDark = localStorage.getItem('theme') === 'dark';
        this.apply();
    }
    
    toggle() {
        this.isDark = !this.isDark;
        this.apply();
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }
    
    apply() {
        document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }
}

// Initialize systems
let audioSystem = new SimpleAudioSystem();
let themeSystem = new SimpleThemeSystem();

// Comparison function for the compare section
function startComparison() {
    const algo1 = document.getElementById('algo1-select').value;
    const algo2 = document.getElementById('algo2-select').value;
    const resultsContainer = document.getElementById('comparison-results');
    
    if (algo1 === algo2) {
        showNotification('Please select different algorithms to compare', 'error', '⚠️');
        return;
    }
    
    // Simple comparison display
    resultsContainer.innerHTML = `
        <div class="result-panel">
            <h4>${getAlgorithmName(algo1)}</h4>
            <div class="comparison-metrics">
                <div class="metric">
                    <span class="metric-label">Time Complexity:</span>
                    <span class="metric-value">${getTimeComplexity(algo1)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Space Complexity:</span>
                    <span class="metric-value">${getSpaceComplexity(algo1)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Stability:</span>
                    <span class="metric-value">${getStability(algo1)}</span>
                </div>
            </div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="result-panel">
            <h4>${getAlgorithmName(algo2)}</h4>
            <div class="comparison-metrics">
                <div class="metric">
                    <span class="metric-label">Time Complexity:</span>
                    <span class="metric-value">${getTimeComplexity(algo2)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Space Complexity:</span>
                    <span class="metric-value">${getSpaceComplexity(algo2)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Stability:</span>
                    <span class="metric-value">${getStability(algo2)}</span>
                </div>
            </div>
        </div>
    `;
    
    showNotification('Comparison complete!', 'success', '📊');
    if (audioSystem) audioSystem.play('success');
}

function getAlgorithmName(id) {
    const names = {
        'bubble-sort': 'Bubble Sort',
        'merge-sort': 'Merge Sort',
        'quick-sort': 'Quick Sort',
        'binary-search': 'Binary Search'
    };
    return names[id] || id;
}

function getTimeComplexity(id) {
    const complexities = {
        'bubble-sort': 'O(n²)',
        'merge-sort': 'O(n log n)',
        'quick-sort': 'O(n log n)',
        'binary-search': 'O(log n)'
    };
    return complexities[id] || 'N/A';
}

function getSpaceComplexity(id) {
    const complexities = {
        'bubble-sort': 'O(1)',
        'merge-sort': 'O(n)',
        'quick-sort': 'O(log n)',
        'binary-search': 'O(1)'
    };
    return complexities[id] || 'N/A';
}

function getStability(id) {
    const stability = {
        'bubble-sort': 'Stable',
        'merge-sort': 'Stable',
        'quick-sort': 'Unstable',
        'binary-search': 'N/A'
    };
    return stability[id] || 'N/A';
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function clearAllTimeouts() {
    animationTimeouts.forEach(timeout => clearTimeout(timeout));
    animationTimeouts = [];
}

function updateSpeedFromSlider() {
    const slider = document.getElementById('speed-slider');
    if (slider) {
        const value = parseInt(slider.value);
        animationSpeed = 1100 - value; // Invert so higher slider value = faster
        
        const label = document.getElementById('speed-label');
        if (label) {
            label.textContent = `Speed: ${Math.round((value / 10))}x`;
        }
    }
}

function updatePerformanceMetrics() {
    const metricsDiv = document.getElementById('performance-metrics');
    if (metricsDiv && performanceMetrics.startTime > 0) {
        const duration = performanceMetrics.endTime > 0 ? 
            (performanceMetrics.endTime - performanceMetrics.startTime).toFixed(2) : 
            (performance.now() - performanceMetrics.startTime).toFixed(2);
        
        metricsDiv.innerHTML = `
            <strong>Performance:</strong> ${performanceMetrics.operations} operations, 
            ${performanceMetrics.comparisons} comparisons, ${duration}ms
        `;
    }
}

// Modal functions
function openVisualization(algorithmId) {
    const modal = document.getElementById('visualization-modal');
    const title = document.getElementById('modal-title');
    const container = document.getElementById('visualization-container');
    
    if (!modal || !title || !container) {
        console.error('Modal elements not found');
        return;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset performance metrics
    performanceMetrics = {
        operations: 0,
        comparisons: 0,
        startTime: 0,
        endTime: 0
    };
    
    // Get algorithm from registry
    if (window.AlgorithmRegistry) {
        const algorithm = window.AlgorithmRegistry.get(algorithmId);
        if (algorithm && algorithm.init) {
            const meta = algorithm.meta;
            title.textContent = `${meta.emoji} ${meta.name} Visualization`;
            container.innerHTML = '';
            
            try {
                algorithm.init();
            } catch (error) {
                console.error('Error initializing algorithm:', error);
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #666;">
                        <h3>⚠️ Algorithm Loading Error</h3>
                        <p>There was an error loading this visualization.</p>
                        <p>Algorithm: ${meta.name}</p>
                    </div>
                `;
            }
        } else {
            title.textContent = 'Algorithm Not Found';
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <h3>❌ Algorithm Not Found</h3>
                    <p>The algorithm "${algorithmId}" could not be found in the registry.</p>
                </div>
            `;
        }
    } else {
        title.textContent = 'Registry Not Available';
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <h3>⚠️ Registry Not Available</h3>
                <p>The algorithm registry is not loaded. Please refresh the page.</p>
            </div>
        `;
    }
    
    if (audioSystem) {
        audioSystem.play('click');
    }
}

function closeModal() {
    const modal = document.getElementById('visualization-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear any running animations
        clearAllTimeouts();
        isAnimating = false;
        currentVisualization = '';
        
        if (audioSystem) audioSystem.play('click');
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Algorithm Visualizer...');
    
    // Hide loading screen
    hideLoadingScreen();
    
    // Speed slider
    const speedSlider = document.getElementById('speed-slider');
    if (speedSlider) {
        speedSlider.addEventListener('input', updateSpeedFromSlider);
        updateSpeedFromSlider();
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => themeSystem.toggle());
    }
    
    // Sound toggle
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
            if (audioSystem) {
                audioSystem.play('click');
            }
        });
    }
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            scrollToSection(this.getAttribute('href').substring(1));
        });
    });
    
    // Close modal
    const modal = document.getElementById('visualization-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
    
    // Close button
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    console.log('✅ Algorithm Visualizer initialized successfully!');
});