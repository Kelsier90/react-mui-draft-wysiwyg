import entities from '../../types/entities';

export const entityHTMLMap = {
    [entities.LINK]: (entity) => [`<a href="${entity.getData().url}" target="_blank">`, '</a>'],
    [entities.IMAGE]: (entity) => [
        `<img src="${entity.data.src}" alt="" width="${entity.getData().width}" height="${
            entity.getData().height
        }">`,
        '',
    ],
};
