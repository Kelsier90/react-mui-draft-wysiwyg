import { LANG_PREFIX } from '../types/lang';

export const translateLiteralWithPrefix = (literal, translateFn) =>
    (typeof literal === 'string' || literal instanceof String) &&
    literal.substr(0, LANG_PREFIX.length) === LANG_PREFIX
        ? translateFn(literal.substr(LANG_PREFIX.length))
        : literal;
