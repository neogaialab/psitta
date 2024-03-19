import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Psitta",
  description: "Next-gen internationalization library",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/core/introduction' },
      /* { text: 'Examples', link: '/examples' }, */
      { text: 'Reference', link: '/core/reference/localization' },
      {
        text: 'Integrations',
        items: [
          { text: 'Vue', link: '/vue/installation' },
        ]
      },
      {
        text: 'About',
        items: [
          { text: 'Team', link: '/about/team' },
        ]
      },
      {
        text: 'Changelog',
        items: [
          { text: 'Core', link: 'https://github.com/neogaialab/psitta/blob/main/packages/core/CHANGELOG.md' },
          { text: 'Vue', link: 'https://github.com/neogaialab/psitta/blob/main/packages/vue/CHANGELOG.md' },
        ]
      },
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          base: '/core',
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Installation', link: '/installation' },
            { text: 'Quickstart', link: '/quickstart' },
          ]
        },
        {
          text: 'Guide',
          base: '/core/guide',
          items: [
            { text: 'Localization', link: '/localization' },
            { text: 'Formatting', link: '/formatting' },
            { text: 'Detection', link: '/locale-detection' },
            { text: 'Translation', link: '/translation' },
            { text: 'Config', link: '/config' },
          ]
        },
        {
          text: 'Integrations',
          base: '/integrations',
          items: [
            { text: 'UI Frameworks', link: '/ui-frameworks' },
            { text: 'LLMs', link: '/llms' },
          ]
        },
        {
          text: 'Explanations',
          items: [
            { text: 'Key Design', link: '/core/explanations/key-design' },
          ]
        },
        {
          text: 'Reference',
          base: '/core/reference',
          items: [
            { text: 'Localization API', link: '/localization' },
            { text: 'Detection', link: '/detection' },
            { text: 'Translation API', link: '/translation' },
            { text: 'Config', link: '/config' },
            { text: 'Format API', link: '/format' },
          ]
        },
      ],
      '/vue/': [
        {
          text: 'Vue Integration',
          base: '/vue',
          items: [
            { text: 'Installation', link: '/installation' },
            { text: 'API Reference', link: '/reference' },
          ]
        },
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/neogaialab/psitta' }
    ],

    footer: {
      copyright: 'Generated with Vitepress by Luis Emidio (2024-present)'
    }
  }
})
