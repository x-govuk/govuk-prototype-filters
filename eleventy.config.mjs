import { govukEleventyPlugin } from '@x-govuk/govuk-eleventy-plugin'

const serviceName = 'GOV.UK Prototype Filters'

export default function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(govukEleventyPlugin, {
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
    },
    header: {
      homepageUrl: 'https://x-govuk.org'
    },
    homeKey: serviceName,
    icons: {
      mask: 'https://raw.githubusercontent.com/x-govuk/logo/main/images/x-govuk-icon-mask.svg?raw=true',
      shortcut:
        'https://raw.githubusercontent.com/x-govuk/logo/main/images/favicon.ico',
      touch:
        'https://raw.githubusercontent.com/x-govuk/logo/main/images/x-govuk-icon-180.png'
    },
    opengraphImageUrl:
      'https://govuk-prototype-filters.x-govuk.org/assets/opengraph-image.png',
    serviceNavigation: {
      serviceName,
      serviceUrl: '/',
      search: {
        indexPath: '/search-index.json',
        sitemapPath: '/sitemap'
      }
    },
    showBreadcrumbs: false,
    stylesheets: ['/assets/application.css'],
    templates: {
      searchIndex: true
    },
    themeColor: '#2288aa',
    titleSuffix: serviceName
  })

  // Passthrough
  eleventyConfig.addPassthroughCopy('./docs/assets')

  // Enable X-GOVUK brand
  eleventyConfig.addNunjucksGlobal('xGovuk', true)

  // Config
  return {
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    dir: {
      input: 'docs'
    }
  }
}
