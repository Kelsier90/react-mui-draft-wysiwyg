export default class Translator {
    constructor(translations) {
        this.translations = translations;
    }

    get(id) {
        if (!id) return '';
        const keys = id.split('.');
        let item = this.translations;
        for (const key of keys) {
            item = item[key];
            if (item === undefined) return '';
        }
        return item || '';
    }
}
