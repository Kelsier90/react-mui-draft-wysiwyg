export default {
    controls: {
        undo: {
            title: 'Deshacer',
        },
        redo: {
            title: 'Rehacer',
        },
        bold: {
            title: 'Negrita',
        },
        italic: {
            title: 'Cursiva',
        },
        underline: {
            title: 'Subrayado',
        },
        strikethrough: {
            title: 'Tachado',
        },
        code: {
            title: 'Código',
        },
        fontColor: {
            title: 'Color de fuente',
            labels: {
                noColor: 'Sin color',
            },
        },
        fontBackgroundColor: {
            title: 'Color de resaltado de texto',
            labels: {
                noColor: 'Sin color',
            },
        },
        linkAdd: {
            title: 'Añadir enlace',
            labels: {
                link: 'Enlace',
            },
            actions: {
                add: 'Añadir',
                cancel: 'Cancelar',
            },
        },
        linkRemove: {
            title: 'Eliminar enlace',
        },
        image: {
            title: 'Insertar imagen',
            actions: {
                upload: 'Subir imagen',
                url: 'Desde URL',
                add: 'Añadir',
                cancel: 'Cancelar',
                alignLeft: 'Alinear a la izquierda',
                alignCenter: 'Centrar',
                alignRight: 'Alinear a la derecha',
                remove: 'Eliminar imagen',
            },
            labels: {
                dropImageHere: 'Arrastra una imagen aquí o haz click para subir una',
                width: 'Ancho',
                height: 'Alto',
                url: 'URL',
                insertOptions: 'Opciones de insertar imagen',
                editOptions: 'Opciones de imagen',
            },
            errorMessages: {
                notValidImage: 'La imagen no es válida',
            },
        },
        blockType: {
            title: 'Formato de bloque',
            labels: {
                normal: 'Normal',
                header1: 'Encabezado 1',
                header2: 'Encabezado 2',
                header3: 'Encabezado 3',
                header4: 'Encabezado 4',
                header5: 'Encabezado 5',
                header6: 'Encabezado 6',
            },
        },
        fontSize: {
            title: 'Tamaño de fuente',
            labels: {
                default: 'Por defecto',
            },
        },
        fontFamily: {
            title: 'Fuente',
            labels: {
                default: 'Por defecto',
            },
        },
        textAlign: {
            title: 'Alinear texto',
            actions: {
                alignLeft: 'Izquierda',
                alignCenter: 'Centro',
                alignRight: 'Derecha',
                justify: 'Justificar',
            },
        },
        unorderedList: {
            title: 'Viñetas',
        },
        orderedList: {
            title: 'Numeración',
        },
    },
};
