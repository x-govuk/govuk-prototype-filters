const process = require('node:process')
const govukEleventyPlugin = require('@x-govuk/govuk-eleventy-plugin')

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(govukEleventyPlugin, {
    icons: {
      mask: 'https://raw.githubusercontent.com/x-govuk/logo/main/images/x-govuk-mask-icon.svg?raw=true',
      shortcut:
        'https://raw.githubusercontent.com/x-govuk/logo/main/images/x-govuk-favicon.ico',
      touch:
        'https://raw.githubusercontent.com/x-govuk/logo/main/images/x-govuk-apple-touch-icon.png'
    },
    opengraphImageUrl:
      'https://x-govuk.github.io/govuk-prototype-filters/assets/opengraph-image.png',
    homeKey: 'GOV.UK Prototype Filters',
    parentSite: {
      url: 'https://x-govuk.github.io/#projects',
      name: 'X-GOVUK projects'
    },
    url:
      process.env.GITHUB_ACTIONS &&
      'https://x-govuk.github.io/govuk-prototype-filters/',
    header: {
      logotype: 'x-govuk',
      organisationName: 'X-GOVUK',
      productName: 'Prototype Filters',
      search: {
        indexPath: '/search.json',
        sitemapPath: '/sitemap'
      }
    },
    footer: {
      contentLicence: {
        html: 'Licensed under the <a class="govuk-footer__link" href="https://github.com/x-govuk/govuk-prototype-components/blob/main/LICENSE.txt">MIT Licence</a>, except where otherwise stated'
      },
      copyright: {
        text: '© X-GOVUK'
      },
      meta: {
        items: [
          {
            href: 'https://mozilla.github.io/nunjucks/templating.html#builtin-filters',
            text: 'Builtin Nunjucks filters (opens in a new tab)',
            attributes: {
              target: '_blank'
            }
          }
        ]
      }
    }
  })

  // Passthrough
  eleventyConfig.addPassthroughCopy('./docs/assets')

  // Config
  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    dir: {
      input: 'docs',
      layouts: '../node_modules/@x-govuk/govuk-eleventy-plugin/layouts'
    },
    pathPrefix: process.env.GITHUB_ACTIONS && '/govuk-prototype-filters/'
  }
}
