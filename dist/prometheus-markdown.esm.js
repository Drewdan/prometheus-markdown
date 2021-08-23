import Vue from 'vue';

var script = Vue.extend({
	props: {
		icon: {
			required: true,
			type: String,
		},
	},
	computed: {
		svg: function svg() {
			return this[this.icon];
		},
		bold: function bold() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18.287 11.121c1.588-1.121 2.713-3.018 2.713-5.093 0-2.946-1.918-5.951-7.093-6.028h-11.907v2.042c1.996 0 3 .751 3 2.683v14.667c0 1.689-.558 2.608-3 2.608v2h11.123c6.334 0 8.877-3.599 8.877-7.038 0-2.538-1.417-4.67-3.713-5.841zm-8.287-8.121h2.094c2.357 0 4.126 1.063 4.126 3.375 0 2.035-1.452 3.625-3.513 3.625h-2.707v-7zm2.701 18h-2.701v-8h2.781c2.26.024 3.927 1.636 3.927 3.667 0 2.008-1.226 4.333-4.007 4.333z"/></svg>';
		},
		italic: function italic() {
			return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.565 20.827c-.361.732-.068 1.173.655 1.173h1.78v2h-9v-2h.897c1.356 0 1.673-.916 2.157-1.773l8.349-16.89c.403-.852-.149-1.337-.855-1.337h-1.548v-2h9v2h-.84c-1.169 0-1.596.646-2.06 1.516l-8.535 17.311z"/></svg>';
		},
	},
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "editor-button",
    domProps: { innerHTML: _vm._s(_vm.svg) },
    on: {
      click: function($event) {
        return _vm.$emit("click")
      }
    }
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-259517df_0", { source: "\n.editor-button {\r\n\tcursor: pointer;\n}\n.editor-button:hover {\r\n\tbackground-color: #8d8c8c;\n}\n.editor-button svg {\r\n\theight: calc(40px - 20px);\r\n\tmargin: 5px;\r\n\tpadding: 5px;\n}\r\n", map: {"version":3,"sources":["/mnt/c/source/personal/prometheus-markdown/src/Components/EditorButton.vue"],"names":[],"mappings":";AAkCA;CACA,eAAA;AACA;AAEA;CACA,yBAAA;AACA;AACA;CACA,yBAAA;CACA,WAAA;CACA,YAAA;AACA","file":"EditorButton.vue","sourcesContent":["<template>\r\n\t<div\r\n\t\tclass=\"editor-button\"\r\n\t\tv-html=\"svg\"\r\n\t\t@click=\"$emit('click')\"\r\n\t/>\r\n\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nexport default Vue.extend({\r\n\tprops: {\r\n\t\ticon: {\r\n\t\t\trequired: true,\r\n\t\t\ttype: String,\r\n\t\t},\r\n\t},\r\n\tcomputed: {\r\n\t\tsvg() {\r\n\t\t\treturn this[this.icon];\r\n\t\t},\r\n\t\tbold() {\r\n\t\t\treturn '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M18.287 11.121c1.588-1.121 2.713-3.018 2.713-5.093 0-2.946-1.918-5.951-7.093-6.028h-11.907v2.042c1.996 0 3 .751 3 2.683v14.667c0 1.689-.558 2.608-3 2.608v2h11.123c6.334 0 8.877-3.599 8.877-7.038 0-2.538-1.417-4.67-3.713-5.841zm-8.287-8.121h2.094c2.357 0 4.126 1.063 4.126 3.375 0 2.035-1.452 3.625-3.513 3.625h-2.707v-7zm2.701 18h-2.701v-8h2.781c2.26.024 3.927 1.636 3.927 3.667 0 2.008-1.226 4.333-4.007 4.333z\"/></svg>';\r\n\t\t},\r\n\t\titalic() {\r\n\t\t\treturn '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M9.565 20.827c-.361.732-.068 1.173.655 1.173h1.78v2h-9v-2h.897c1.356 0 1.673-.916 2.157-1.773l8.349-16.89c.403-.852-.149-1.337-.855-1.337h-1.548v-2h9v2h-.84c-1.169 0-1.596.646-2.06 1.516l-8.535 17.311z\"/></svg>';\r\n\t\t},\r\n\t},\r\n});\r\n</script>\r\n\r\n<style>\r\n.editor-button {\r\n\tcursor: pointer;\r\n}\r\n\r\n.editor-button:hover {\r\n\tbackground-color: #8d8c8c;\r\n}\r\n.editor-button svg {\r\n\theight: calc(40px - 20px);\r\n\tmargin: 5px;\r\n\tpadding: 5px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var script$1 = Vue.extend({
	components: { EditorButton: __vue_component__ },
	data: function data() {
		return {
			markdownEditor: null,
			raw: '',
		};
	},
	methods: {
		setBold: function setBold() {
			var selectedText = this.getSelectedText();
			if (selectedText) {
				alert('selected text');
			}
			this.raw += "\r\n**  **\r\n";
		},
		setItalic: function setItalic() {
			this.raw += "\r\n*  *\r\n";
		},
		getSelectedText: function getSelectedText() {
			var selectionStart = this.markdownEditor.selectionStart;
			var selectionEnd = this.markdownEditor.selectionEnd;
			return this.raw.substring(selectionStart, selectionEnd);
		},
	},
	mounted: function mounted() {
		this.markdownEditor = document.getElementById('markdown-editor');
	}
});

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "markdown-container" } }, [
    _c(
      "div",
      { attrs: { id: "markdown-header" } },
      [
        _c("editor-button", {
          attrs: { icon: "bold" },
          on: { click: _vm.setBold }
        }),
        _vm._v(" "),
        _c("editor-button", {
          attrs: { icon: "italic" },
          on: { click: _vm.setItalic }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("textarea", {
      directives: [
        { name: "model", rawName: "v-model", value: _vm.raw, expression: "raw" }
      ],
      attrs: { id: "markdown-editor" },
      domProps: { value: _vm.raw },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.raw = $event.target.value;
        }
      }
    }),
    _vm._v(" "),
    _c("div", { attrs: { id: "markdown-footer" } })
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = function (inject) {
    if (!inject) { return }
    inject("data-v-72300a64_0", { source: "\nhtml, body {\r\n\theight: 100vh;\r\n\twidth: 100vw;\r\n\tpadding: 0;\r\n\tmargin: 0;\n}\r\n", map: {"version":3,"sources":["/mnt/c/source/personal/prometheus-markdown/src/MarkdownEditor.vue"],"names":[],"mappings":";AA8CA;CACA,aAAA;CACA,YAAA;CACA,UAAA;CACA,SAAA;AACA","file":"MarkdownEditor.vue","sourcesContent":["<template>\r\n\t<div id=\"markdown-container\">\r\n\t\t<div id=\"markdown-header\">\r\n\t\t\t<editor-button @click=\"setBold\" icon=\"bold\" />\r\n\t\t\t<editor-button @click=\"setItalic\" icon=\"italic\" />\r\n\t\t</div>\r\n\t\t<textarea id=\"markdown-editor\" v-model=\"raw\"/>\r\n\t\t<div id=\"markdown-footer\"></div>\r\n\t</div>\r\n</template>\r\n<script lang=\"ts\">\r\n\r\nimport EditorButton from './Components/EditorButton.vue';\r\nimport Vue from \"vue\";\r\n\r\nexport default Vue.extend({\r\n\tcomponents: { EditorButton },\r\n\tdata() {\r\n\t\treturn {\r\n\t\t\tmarkdownEditor: null,\r\n\t\t\traw: '',\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tsetBold() {\r\n\t\t\tconst selectedText = this.getSelectedText();\r\n\t\t\tif (selectedText) {\r\n\t\t\t\talert('selected text');\r\n\t\t\t}\r\n\t\t\tthis.raw += `\\r\\n**  **\\r\\n`;\r\n\t\t},\r\n\t\tsetItalic() {\r\n\t\t\tthis.raw += `\\r\\n*  *\\r\\n`;\r\n\t\t},\r\n\t\tgetSelectedText() {\r\n\t\t\tconst selectionStart = this.markdownEditor.selectionStart;\r\n\t\t\tconst selectionEnd = this.markdownEditor.selectionEnd;\r\n\t\t\treturn this.raw.substring(selectionStart, selectionEnd);\r\n\t\t},\r\n\t},\r\n\tmounted() {\r\n\t\tthis.markdownEditor = document.getElementById('markdown-editor');\r\n\t}\r\n});\r\n</script>\r\n<style>\r\nhtml, body {\r\n\theight: 100vh;\r\n\twidth: 100vw;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n</style>\r\n<style scoped>\r\n#markdown-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\theight: 100vh;\r\n}\r\n\r\n#markdown-header {\r\n\theight: 40px;\r\n\tbackground-color: #ccc;\r\n\tdisplay: flex;\r\n}\r\n\r\n#markdown-editor {\r\n\tflex: auto;\r\n\tborder: 0;\r\n\toutline: none;\r\n\tresize: none;\r\n\tfont-family: Arial, serif;\r\n\tline-height: 1.5;\r\n\tpadding: 10px;\r\n}\r\n\r\n#markdown-footer {\r\n\theight: 25px;\r\n\tbackground-color: #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined })
,inject("data-v-72300a64_1", { source: "\n#markdown-container[data-v-72300a64] {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\theight: 100vh;\n}\n#markdown-header[data-v-72300a64] {\r\n\theight: 40px;\r\n\tbackground-color: #ccc;\r\n\tdisplay: flex;\n}\n#markdown-editor[data-v-72300a64] {\r\n\tflex: auto;\r\n\tborder: 0;\r\n\toutline: none;\r\n\tresize: none;\r\n\tfont-family: Arial, serif;\r\n\tline-height: 1.5;\r\n\tpadding: 10px;\n}\n#markdown-footer[data-v-72300a64] {\r\n\theight: 25px;\r\n\tbackground-color: #ccc;\n}\r\n", map: {"version":3,"sources":["/mnt/c/source/personal/prometheus-markdown/src/MarkdownEditor.vue"],"names":[],"mappings":";AAsDA;CACA,aAAA;CACA,sBAAA;CACA,aAAA;AACA;AAEA;CACA,YAAA;CACA,sBAAA;CACA,aAAA;AACA;AAEA;CACA,UAAA;CACA,SAAA;CACA,aAAA;CACA,YAAA;CACA,yBAAA;CACA,gBAAA;CACA,aAAA;AACA;AAEA;CACA,YAAA;CACA,sBAAA;AACA","file":"MarkdownEditor.vue","sourcesContent":["<template>\r\n\t<div id=\"markdown-container\">\r\n\t\t<div id=\"markdown-header\">\r\n\t\t\t<editor-button @click=\"setBold\" icon=\"bold\" />\r\n\t\t\t<editor-button @click=\"setItalic\" icon=\"italic\" />\r\n\t\t</div>\r\n\t\t<textarea id=\"markdown-editor\" v-model=\"raw\"/>\r\n\t\t<div id=\"markdown-footer\"></div>\r\n\t</div>\r\n</template>\r\n<script lang=\"ts\">\r\n\r\nimport EditorButton from './Components/EditorButton.vue';\r\nimport Vue from \"vue\";\r\n\r\nexport default Vue.extend({\r\n\tcomponents: { EditorButton },\r\n\tdata() {\r\n\t\treturn {\r\n\t\t\tmarkdownEditor: null,\r\n\t\t\traw: '',\r\n\t\t};\r\n\t},\r\n\tmethods: {\r\n\t\tsetBold() {\r\n\t\t\tconst selectedText = this.getSelectedText();\r\n\t\t\tif (selectedText) {\r\n\t\t\t\talert('selected text');\r\n\t\t\t}\r\n\t\t\tthis.raw += `\\r\\n**  **\\r\\n`;\r\n\t\t},\r\n\t\tsetItalic() {\r\n\t\t\tthis.raw += `\\r\\n*  *\\r\\n`;\r\n\t\t},\r\n\t\tgetSelectedText() {\r\n\t\t\tconst selectionStart = this.markdownEditor.selectionStart;\r\n\t\t\tconst selectionEnd = this.markdownEditor.selectionEnd;\r\n\t\t\treturn this.raw.substring(selectionStart, selectionEnd);\r\n\t\t},\r\n\t},\r\n\tmounted() {\r\n\t\tthis.markdownEditor = document.getElementById('markdown-editor');\r\n\t}\r\n});\r\n</script>\r\n<style>\r\nhtml, body {\r\n\theight: 100vh;\r\n\twidth: 100vw;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n}\r\n</style>\r\n<style scoped>\r\n#markdown-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\theight: 100vh;\r\n}\r\n\r\n#markdown-header {\r\n\theight: 40px;\r\n\tbackground-color: #ccc;\r\n\tdisplay: flex;\r\n}\r\n\r\n#markdown-editor {\r\n\tflex: auto;\r\n\tborder: 0;\r\n\toutline: none;\r\n\tresize: none;\r\n\tfont-family: Arial, serif;\r\n\tline-height: 1.5;\r\n\tpadding: 10px;\r\n}\r\n\r\n#markdown-footer {\r\n\theight: 25px;\r\n\tbackground-color: #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$1 = "data-v-72300a64";
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
	// @ts-ignore
	if (install.installed) { return; }
	// @ts-ignore
	install.installed = true;
	Vue.component('MarkdownEditor', __vue_component__$1);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	// @ts-ignore
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	// @ts-ignore
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	// @ts-ignore
	GlobalVue.use(plugin);
}

export default __vue_component__$1;
export { install };
