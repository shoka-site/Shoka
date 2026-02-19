export function transformForLanguage<T extends Record<string, any>>(content: T | T[], lang: 'en' | 'ar'): any {
    if (!content) return content;

    // If it's an array, transform each item
    if (Array.isArray(content)) {
        return content.map(item => transformForLanguage(item, lang));
    }

    // Extract language-specific fields
    const transformed: Record<string, any> = {};
    Object.keys(content).forEach(key => {
        if (key.endsWith('En') && lang === 'en') {
            transformed[key.replace('En', '')] = content[key];
        } else if (key.endsWith('Ar') && lang === 'ar') {
            // Use Arabic content if available, otherwise fallback to English content
            const enKey = key.replace('Ar', 'En');
            transformed[key.replace('Ar', '')] = content[key] || content[enKey];
        } else if (!key.endsWith('En') && !key.endsWith('Ar')) {
            // Include non-language-specific fields (id, order, published, etc.)
            transformed[key] = content[key];
        }
    });

    return transformed;
}
