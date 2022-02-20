import DividerControl from '../EditorToolbar/controls/DividerControl';
import UndoControl from '../EditorToolbar/controls/UndoControl';
import RedoControl from '../EditorToolbar/controls/RedoControl';
import BoldControl from '../EditorToolbar/controls/BoldControl';
import ItalicControl from '../EditorToolbar/controls/ItalicControl';
import UnderlineControl from '../EditorToolbar/controls/UnderlineControl';
import StrikethroughControl from '../EditorToolbar/controls/StrikethroughControl';
import LinkAddControl from '../EditorToolbar/controls/LinkAddControl';
import linkAddPlugin from '../EditorToolbar/controls/LinkAddControl/plugin';
import LinkRemoveControl from '../EditorToolbar/controls/LinkRemoveControl';
import BlockTypeControl from '../EditorToolbar/controls/BlockTypeControl';
import UnorderedListControl from '../EditorToolbar/controls/UnorderedListControl';
import OrderedListControl from '../EditorToolbar/controls/OrderedListControl';
import FontFamilyControl from '../EditorToolbar/controls/FontFamilyControl';
import fontFamilyPlugin from '../EditorToolbar/controls/FontFamilyControl/plugin';
import TextAlignControl from '../EditorToolbar/controls/TextAlignControl';
import textAlignPlugin from '../EditorToolbar/controls/TextAlignControl/plugin';
import FontSizeControl from '../EditorToolbar/controls/FontSizeControl';
import fontSizePlugin from '../EditorToolbar/controls/FontSizeControl/plugin';
import FontColorControl from '../EditorToolbar/controls/FontColorControl';
import fontColorPlugin from '../EditorToolbar/controls/FontColorControl/plugin';
import FontBackgroundColorControl from '../EditorToolbar/controls/FontBackgroundColorControl';
import fontBackgroundColorPlugin from '../EditorToolbar/controls/FontBackgroundColorControl/plugin';
import ImageControl from '../EditorToolbar/controls/ImageControl';
import imagePlugin from '../EditorToolbar/controls/ImageControl/plugin';
import { fileToBase64 } from '../utils/fileUtils';
import { LANG_PREFIX } from './lang';

export const toolbarControlTypes = {
    divider: {
        name: 'divider',
        component: DividerControl,
    },
    undo: {
        name: 'undo',
        component: UndoControl,
    },
    redo: {
        name: 'undo',
        component: RedoControl,
    },
    bold: {
        name: 'bold',
        component: BoldControl,
    },
    italic: {
        name: 'italic',
        component: ItalicControl,
    },
    underline: {
        name: 'underline',
        component: UnderlineControl,
    },
    strikethrough: {
        name: 'strikethrough',
        component: StrikethroughControl,
    },
    fontColor: {
        name: 'fontColor',
        component: FontColorControl,
        plugin: fontColorPlugin,
    },
    fontBackgroundColor: {
        name: 'fontBackgroundColor',
        component: FontBackgroundColorControl,
        plugin: fontBackgroundColorPlugin,
    },
    linkAdd: {
        name: 'linkAdd',
        component: LinkAddControl,
        plugin: linkAddPlugin,
    },
    linkRemove: {
        name: 'linkRemove',
        component: LinkRemoveControl,
    },
    image: {
        name: 'image',
        component: ImageControl,
        plugin: imagePlugin,
    },
    blockType: {
        name: 'blockType',
        component: BlockTypeControl,
    },
    fontSize: {
        name: 'fontSize',
        component: FontSizeControl,
        plugin: fontSizePlugin,
    },
    fontFamily: {
        name: 'fontFamily',
        component: FontFamilyControl,
        plugin: fontFamilyPlugin,
    },
    textAlign: {
        name: 'textAlign',
        component: TextAlignControl,
        plugin: textAlignPlugin,
    },
    unorderedList: {
        name: 'unorderedList',
        component: UnorderedListControl,
    },
    orderedList: {
        name: 'orderedList',
        component: OrderedListControl,
    },
};

export const defaultToolbarControls = [
    toolbarControlTypes.undo,
    toolbarControlTypes.redo,
    toolbarControlTypes.divider,
    toolbarControlTypes.bold,
    toolbarControlTypes.italic,
    toolbarControlTypes.underline,
    toolbarControlTypes.strikethrough,
    toolbarControlTypes.fontColor,
    toolbarControlTypes.fontBackgroundColor,
    toolbarControlTypes.divider,
    toolbarControlTypes.linkAdd,
    toolbarControlTypes.linkRemove,
    toolbarControlTypes.image,
    toolbarControlTypes.divider,
    toolbarControlTypes.blockType,
    toolbarControlTypes.fontSize,
    toolbarControlTypes.fontFamily,
    toolbarControlTypes.textAlign,
    toolbarControlTypes.divider,
    toolbarControlTypes.unorderedList,
    toolbarControlTypes.orderedList,
];

const colors = [
    { text: 'black', value: 'rgb(0, 0, 0)' },
    { text: 'dark grey 4', value: 'rgb(67, 67, 67)' },
    { text: 'dark grey 3', value: 'rgb(102, 102, 102)' },
    { text: 'dark grey 2', value: 'rgb(153, 153, 153)' },
    { text: 'dark grey 1', value: 'rgb(183, 183, 183)' },
    { text: 'grey', value: 'rgb(204, 204, 204)' },
    { text: 'light grey 1', value: 'rgb(217, 217, 217)' },
    { text: 'light grey 2', value: 'rgb(239, 239, 239)' },
    { text: 'light grey 3', value: 'rgb(243, 243, 243)' },
    { text: 'white', value: 'rgb(255, 255, 255)' },
    { text: 'Red berry', value: 'rgb(152, 0, 0)' },
    { text: 'red', value: 'rgb(255, 0, 0)' },
    { text: 'orange', value: 'rgb(255, 153, 0)' },
    { text: 'yellow', value: 'rgb(255, 255, 0)' },
    { text: 'green', value: 'rgb(0, 255, 0)' },
    { text: 'cyan', value: 'rgb(0, 255, 255)' },
    { text: 'cornflower blue', value: 'rgb(74, 134, 232)' },
    { text: 'blue', value: 'rgb(0, 0, 255)' },
    { text: 'purple', value: 'rgb(153, 0, 255)' },
    { text: 'magenta', value: 'rgb(255, 0, 255)' },
    { text: 'light red berry 3', value: 'rgb(230, 184, 175)' },
    { text: 'light red 3', value: 'rgb(244, 204, 204)' },
    { text: 'light orange 3', value: 'rgb(252, 229, 205)' },
    { text: 'light yellow 3', value: 'rgb(255, 242, 204)' },
    { text: 'light green 3', value: 'rgb(217, 234, 211)' },
    { text: 'light cyan 3', value: 'rgb(208, 224, 227)' },
    { text: 'light cornflower blue 3', value: 'rgb(201, 218, 248)' },
    { text: 'light blue 3', value: 'rgb(207, 226, 243)' },
    { text: 'light purple 3', value: 'rgb(217, 210, 233)' },
    { text: 'light magenta 3', value: 'rgb(234, 209, 220)' },
    { text: 'light red berry 2', value: 'rgb(221, 126, 107)' },
    { text: 'light red 2', value: 'rgb(234, 153, 153)' },
    { text: 'light orange 2', value: 'rgb(249, 203, 156)' },
    { text: 'light yellow 2', value: 'rgb(255, 229, 153)' },
    { text: 'light green 2', value: 'rgb(182, 215, 168)' },
    { text: 'light cyan 2', value: 'rgb(162, 196, 201)' },
    { text: 'light cornflower blue 2', value: 'rgb(164, 194, 244)' },
    { text: 'light blue 2', value: 'rgb(159, 197, 232)' },
    { text: 'light purple 2', value: 'rgb(180, 167, 214)' },
    { text: 'light magenta 2', value: 'rgb(213, 166, 189)' },
    { text: 'light red berry 1', value: 'rgb(204, 65, 37)' },
    { text: 'light red 1', value: 'rgb(224, 102, 102)' },
    { text: 'light orange 1', value: 'rgb(246, 178, 107)' },
    { text: 'light yellow 1', value: 'rgb(255, 217, 102)' },
    { text: 'light green 1', value: 'rgb(147, 196, 125)' },
    { text: 'light cyan 1', value: 'rgb(118, 165, 175)' },
    { text: 'light cornflower blue 1', value: 'rgb(109, 158, 235)' },
    { text: 'light blue 1', value: 'rgb(111, 168, 220)' },
    { text: 'light purple 1', value: 'rgb(142, 124, 195)' },
    { text: 'light magenta 1', value: 'rgb(194, 123, 160)' },
    { text: 'dark red berry 1', value: 'rgb(166, 28, 0)' },
    { text: 'dark red 1', value: 'rgb(204, 0, 0)' },
    { text: 'dark orange 1', value: 'rgb(230, 145, 56)' },
    { text: 'dark yellow 1', value: 'rgb(241, 194, 50)' },
    { text: 'dark green 1', value: 'rgb(106, 168, 79)' },
    { text: 'dark cyan 1', value: 'rgb(69, 129, 142)' },
    { text: 'dark cornflower blue 1', value: 'rgb(60, 120, 216)' },
    { text: 'dark blue 1', value: 'rgb(61, 133, 198)' },
    { text: 'dark purple 1', value: 'rgb(103, 78, 167)' },
    { text: 'dark magenta 1', value: 'rgb(166, 77, 121)' },
    { text: 'dark red berry 2', value: 'rgb(133, 32, 12)' },
    { text: 'dark red 2', value: 'rgb(153, 0, 0)' },
    { text: 'dark orange 2', value: 'rgb(180, 95, 6)' },
    { text: 'dark yellow 2', value: 'rgb(191, 144, 0)' },
    { text: 'dark green 2', value: 'rgb(56, 118, 29)' },
    { text: 'dark cyan 2', value: 'rgb(19, 79, 92)' },
    { text: 'dark cornflower blue 2', value: 'rgb(17, 85, 204)' },
    { text: 'dark blue 2', value: 'rgb(11, 83, 148)' },
    { text: 'dark purple 2', value: 'rgb(53, 28, 117)' },
    { text: 'dark magenta 2', value: 'rgb(116, 27, 71)' },
    { text: 'dark red berry 3', value: 'rgb(91, 15, 0)' },
    { text: 'dark red 3', value: 'rgb(102, 0, 0)' },
    { text: 'dark orange 3', value: 'rgb(120, 63, 4)' },
    { text: 'dark yellow 3', value: 'rgb(127, 96, 0)' },
    { text: 'dark green 3', value: 'rgb(39, 78, 19)' },
    { text: 'dark cyan 3', value: 'rgb(12, 52, 61)' },
    { text: 'dark cornflower blue 3', value: 'rgb(28, 69, 135)' },
    { text: 'dark blue 3', value: 'rgb(7, 55, 99)' },
    { text: 'dark purple 3', value: 'rgb(32, 18, 77)' },
    { text: 'dark magenta 3', value: 'rgb(76, 17, 48)' },
];

export const defaultToolbarControlsConfiguration = {
    blockType: {
        options: [
            {
                value: 'default',
                text: LANG_PREFIX + 'controls.blockType.labels.normal',
            },
            {
                value: 'header-one',
                text: LANG_PREFIX + 'controls.blockType.labels.header1',
            },
            {
                value: 'header-two',
                text: LANG_PREFIX + 'controls.blockType.labels.header2',
            },
            {
                value: 'header-three',
                text: LANG_PREFIX + 'controls.blockType.labels.header3',
            },
            {
                value: 'header-four',
                text: LANG_PREFIX + 'controls.blockType.labels.header4',
            },
            {
                value: 'header-five',
                text: LANG_PREFIX + 'controls.blockType.labels.header5',
            },
            {
                value: 'header-six',
                text: LANG_PREFIX + 'controls.blockType.labels.header6',
            },
        ],
    },
    image: {
        uploadCallback: fileToBase64,
    },
    fontColor: {
        colorsPerRow: 10,
        options: colors,
    },
    fontBackgroundColor: {
        colorsPerRow: 10,
        options: colors,
    },
    fontSize: {
        options: [
            'default',
            '8px',
            '9px',
            '10px',
            '11px',
            '12px',
            '14px',
            '18px',
            '24px',
            '30px',
            '36px',
            '48px',
            '60px',
            '72px',
            '96px',
        ],
    },
    fontFamily: {
        options: [
            'default',
            'Arial',
            'Verdana',
            'Times New Roman',
            'Georgia',
            'Courier new',
            'Lucida Console',
        ],
    },
};
