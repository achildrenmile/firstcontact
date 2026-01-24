/**
 * Runtime Configuration Module
 *
 * Loads configuration from config.json at runtime.
 * Environment variables are injected via docker-entrypoint.sh.
 */

let config = null;
let configPromise = null;

/**
 * Default configuration values
 */
const defaultConfig = {
    parentSiteName: '',
    parentSiteUrl: '',
    parentSiteLogo: ''
};

/**
 * Load configuration from config.json
 * Returns cached config if already loaded
 */
export async function loadConfig() {
    if (config) {
        return config;
    }

    if (configPromise) {
        return configPromise;
    }

    configPromise = fetch('config.json')
        .then(response => {
            if (!response.ok) {
                console.log('No config.json found, using defaults');
                return defaultConfig;
            }
            return response.json();
        })
        .then(data => {
            config = { ...defaultConfig, ...data };
            return config;
        })
        .catch(error => {
            console.log('Error loading config.json, using defaults:', error);
            config = { ...defaultConfig };
            return config;
        });

    return configPromise;
}

/**
 * Get current configuration (synchronous)
 * Returns null if not yet loaded
 */
export function getConfig() {
    return config;
}

/**
 * Check if parent branding is configured
 */
export function hasParentBranding() {
    return config && config.parentSiteName && config.parentSiteName.trim() !== '';
}

/**
 * Get parent site info
 */
export function getParentSite() {
    if (!config) return null;

    return {
        name: config.parentSiteName || '',
        url: config.parentSiteUrl || '',
        logo: config.parentSiteLogo || ''
    };
}
