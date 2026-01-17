/**
 * Internationalization (i18n) System
 *
 * Provides multi-language support for First Contact.
 * Default language: German (de)
 */

// Available languages
export const LANGUAGES = {
    de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    en: { code: 'en', name: 'English', flag: '🇬🇧' }
};

// Current language (default: German)
let currentLanguage = 'de';

// Translation data store
const translations = {};

/**
 * Load translations for a language
 */
export async function loadLanguage(langCode) {
    if (!translations[langCode]) {
        try {
            const module = await import(`./lang/${langCode}.js`);
            translations[langCode] = module.default;
        } catch (error) {
            console.error(`Failed to load language: ${langCode}`, error);
            return false;
        }
    }
    return true;
}

/**
 * Set the current language
 */
export async function setLanguage(langCode) {
    if (!LANGUAGES[langCode]) {
        console.warn(`Unknown language: ${langCode}`);
        return false;
    }

    await loadLanguage(langCode);
    currentLanguage = langCode;

    // Store preference
    localStorage.setItem('firstcontact-language', langCode);

    // Dispatch event for components to update
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: langCode } }));

    return true;
}

/**
 * Get current language code
 */
export function getCurrentLanguage() {
    return currentLanguage;
}

/**
 * Get translation by key path (e.g., 'ui.welcome.title')
 */
export function t(keyPath, replacements = {}) {
    const keys = keyPath.split('.');
    let value = translations[currentLanguage];

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            // Fallback to English if key not found
            value = getNestedValue(translations['en'], keys);
            if (!value) {
                console.warn(`Translation not found: ${keyPath}`);
                return keyPath;
            }
            break;
        }
    }

    // Handle replacements like {bandName}, {distance}
    if (typeof value === 'string') {
        for (const [placeholder, replacement] of Object.entries(replacements)) {
            value = value.replace(new RegExp(`{${placeholder}}`, 'g'), replacement);
        }
    }

    return value;
}

/**
 * Get nested value from object
 */
function getNestedValue(obj, keys) {
    let value = obj;
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return null;
        }
    }
    return value;
}

/**
 * Initialize i18n system
 */
export async function initI18n() {
    // Check for stored preference
    const stored = localStorage.getItem('firstcontact-language');

    // Priority: stored > default (de)
    // We default to German regardless of browser language
    let lang = 'de'; // Default to German
    if (stored && LANGUAGES[stored]) {
        lang = stored;
    }
    // Note: We intentionally don't auto-detect browser language
    // German is the default as requested

    // Always load both languages for fallback
    await loadLanguage('de');
    await loadLanguage('en');

    currentLanguage = lang;
    return lang;
}

/**
 * Format number according to locale
 */
export function formatNumber(num) {
    return num.toLocaleString(currentLanguage === 'de' ? 'de-DE' : 'en-US');
}

/**
 * Format distance in km
 */
export function formatDistance(km) {
    if (km > 1000) {
        return formatNumber(Math.round(km / 100) / 10) + ' ' + t('units.thousandKm');
    }
    return formatNumber(Math.round(km)) + ' ' + t('units.km');
}
