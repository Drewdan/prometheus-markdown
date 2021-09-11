# Prometheus Markdown Editor

This is a simple markdown editor I made for my website written in Vue2. It was also mainly for me to
learn and improve my package development skills, and understand a little more
about the build process for front end scripts.

## Installation

To install run:

```
npm i prometheus-markdown
```

This will add it to your package.json dependencies. The module is exported as a library
with its styles inlined, so you can import it into your vue projects.

## Usage

I currently only use this in a Laravel Project, so have registered the vue component
in my app.js file, which comes as the default with Laravel:

```javascript
require('./bootstrap');
window.Vue = require('vue').default;

Vue.component('prometheus-markdown', require('prometheus-markdown').default);

const app = new Vue({
    el: '#app',
});
```

## Supported Features

This package uses the marked library to generate a preview of the markdown, and it follows
the GitHub Flavoured Markdown syntax (I think).

The toolbar supports the following features

- Bold Text
- Italic Text
- H1, 2, 3, 4
- Unordered Lists
- Check Lists
- Code Blocks
- Block Quotes
- Image Upload

The package supports highlighting the text you want to format and then clicking the button
wraps the text appropriately.

Clicking without the buttons adds the annotations to the page on a new line.

## Shortcut Keys

I have only configured two shortcut keys currently. They are for making text bold
and italic. Due to the mappings on your browser, you will either have to disable
the browser mappings for your bookmark tab or use the secondary keymappings I have added

Bold - CTRL + ALT + B / CTRL + B
Italic - CTRL + ALT + I / CTRL + I

**There is an issue with the italic secondary key mapping currently which requires some
remapping of your keys. I am open to suggestions for better keymapping alternatives.
Feel free to open an issue on GitHub with suggestions.**

## Uploading Images

The vue component takes a prop of `uploadUrl` - this accepts a URL, to which a file
with a key of `file` will be posted. The endpoint which receives this should upload the
file and return a JSON array with a key of `url` and a value of the URL pointing to 
the uploaded file.

If you are using Laravel, there is a companion package, available here: https://packagist.org/packages/drewdan/asset-handler
which will add a route to your Laravel application, which is the default setting
for this application. **Please check the configuration of this package, and add any appropriate
middleware to prevent anyone without the correct access from uploading to this endpoint. 
By default the route is unprotected.**


