# docusaurus-plugin-llms-txt

A Docusaurus plugin for creating `llms.txt` and `llms-full.txt` files. You can learn more about Docusaurus at [https://docusaurus.io/](https://docusaurus.io/) and about `llms.txt` files at [https://llmstxt.org/t](https://llmstxt.org/).

The goal of of the `llms.txt` format is to provide two main files:

1. `llms.txt`: A file that contains a list of all the pages in your docusaurus site with a short description of each page. This file is useful for LLM chatbots so they know which pages to visit.
2. `llms-full.txt`: A file that contains the full text of all the pages in your docusaurus site. This file is useful for LLM chatbots (and other LLM applications) that have very long context windows.

## Installation

```bash
npm install docusaurus-plugin-llms-txt
```

## Usage

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  // ...
  plugins: ['docusaurus-plugin-llms-txt'],
  // ...
};
```

## Configuration

[Configuration details will be added]

## License

MIT
