/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param sources
 */
export function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            // noinspection JSUnfilteredForInLoop
            if (isObject(source[key])) {
                // noinspection JSUnfilteredForInLoop
                if (!target[key]) {
                    // noinspection JSUnfilteredForInLoop
                    Object.assign(target, { [key]: {} });
                }
                // noinspection JSUnfilteredForInLoop
                mergeDeep(target[key], source[key]);
            } else {
                // noinspection JSUnfilteredForInLoop
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}
