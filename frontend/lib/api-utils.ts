export function transformForLanguage<T extends Record<string, unknown>>(content: T | T[], lang: 'en' | 'ar'): unknown {
    if (!content || typeof content !== 'object' || content instanceof Date) return content;

    // If it's an array, transform each item
    if (Array.isArray(content)) {
        return content.map(item => transformForLanguage(item, lang));
    }

    // Extract language-specific fields
    const transformed: Record<string, unknown> = {};
    Object.keys(content).forEach(key => {
        if (key.endsWith('En') && lang === 'en') {
            transformed[key.replace('En', '')] = content[key];
        } else if (key.endsWith('Ar') && lang === 'ar') {
            // Use Arabic content if available, otherwise fallback to English content
            const enKey = key.replace('Ar', 'En');
            transformed[key.replace('Ar', '')] = content[key] || content[enKey];
        } else if (!key.endsWith('En') && !key.endsWith('Ar')) {
            // Include non-language-specific fields (id, order, published, etc.)
            // Recursively transform nested arrays and objects
            if (content[key] && typeof content[key] === 'object' && !(content[key] instanceof Date)) {
                transformed[key] = transformForLanguage(content[key] as Record<string, unknown>, lang);
            } else {
                transformed[key] = content[key];
            }
        }
    });

    return transformed;
}
