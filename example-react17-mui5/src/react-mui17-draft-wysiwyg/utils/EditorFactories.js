import React from 'react';
import { CompositeDecorator, DefaultDraftBlockRenderMap } from 'draft-js';
import { defaultConfig } from '../types/config';
import { defaultToolbarControlsConfiguration } from '../types/editorToolbar';
import { mergeDeep } from './objectUtils';
import languages from '../lang/languages';

class EditorFactories {
    constructor(config) {
        this.config = config || defaultConfig;
    }

    getCompositeDecorator() {
        let decorators = [];
        for (const control of this.getToolbarControls()) {
            const pluginData = this.getPluginData(control);
            if (pluginData && pluginData.decorators) {
                decorators = decorators.concat(pluginData.decorators);
            }
        }
        return decorators.length > 0 ? new CompositeDecorator(decorators) : null;
    }

    getCustomStyleMap() {
        let customStyleMap = {};
        for (const control of this.getToolbarControls()) {
            const pluginData = this.getPluginData(control);
            if (pluginData && pluginData.customStyleMap) {
                customStyleMap = {
                    ...customStyleMap,
                    ...pluginData.customStyleMap,
                };
            }
        }
        return customStyleMap;
    }

    getBlockRenderMap() {
        let renderMap = DefaultDraftBlockRenderMap;
        for (const control of this.getToolbarControls()) {
            const pluginData = this.getPluginData(control);
            if (pluginData && pluginData.blockRenderMap) {
                renderMap = renderMap.merge(pluginData.blockRenderMap);
            }
        }

        return renderMap;
    }

    getBlockStyleFn() {
        return (contentBlock) => {
            let classNames = '';
            for (const control of this.getToolbarControls()) {
                const pluginData = this.getPluginData(control);
                if (pluginData && pluginData.blockStyleFn) {
                    const result = pluginData.blockStyleFn(contentBlock);
                    if (result) classNames += ' ' + result;
                }
            }
            return classNames.trim();
        };
    }

    getBlockRendererFn() {
        return (contentBlock) => {
            for (const control of this.getToolbarControls()) {
                const pluginData = this.getPluginData(control);
                if (!pluginData || !pluginData.blockRendererFn) continue;
                const result = pluginData.blockRendererFn(contentBlock);
                if (result) return result;
            }
        };
    }

    getToolbarControls() {
        return this.getConfigItem('toolbar', 'controls');
    }

    getToolbarControlComponents() {
        const keyCounter = {};
        return this.getToolbarControls().map((control) => {
            if (!keyCounter[control.name]) keyCounter[control.name] = 0;
            keyCounter[control.name]++;

            return React.createElement(control.component, {
                key: `${control.name}${keyCounter[control.name]}`,
                configuration: this.getToolbarControlConfiguration(control.name),
                defaultConfiguration: defaultToolbarControlsConfiguration[control.name],
                pluginData: this.getPluginData(control),
            });
        });
    }

    getToolbarControlConfiguration(controlName) {
        if (
            this.config &&
            this.config.toolbar &&
            this.config.toolbar.controlsConfig &&
            this.config.toolbar.controlsConfig[controlName]
        )
            return this.config.toolbar.controlsConfig[controlName];
        else if (defaultToolbarControlsConfiguration[controlName])
            return defaultToolbarControlsConfiguration[controlName];

        return null;
    }

    getPluginData(control) {
        if (!control.plugin) return null;
        return control.plugin(
            this.getToolbarControlConfiguration(control.name),
            defaultToolbarControlsConfiguration[control.name]
        );
    }

    getTranslations() {
        const lang = this.getConfigItem('lang');
        const langTranslations = languages[lang];
        const customTranslations = this.config.translations || {};
        return mergeDeep(langTranslations, customTranslations);
    }

    getToolbarPosition() {
        return this.getConfigItem('toolbar', 'position').toLowerCase();
    }

    getConfigItem(...keys) {
        let item = { ...this.config };
        for (const key of keys) {
            item = item[key];
            if (item === undefined) break;
        }

        if (item !== undefined) return item;

        item = { ...defaultConfig };
        for (const key of keys) {
            item = item[key];
        }

        return item;
    }
}

export default EditorFactories;
