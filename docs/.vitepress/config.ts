import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Psitta",
  description: "Next-gen internationalization library",
  base: '/psitta/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/core/guide/quickstart' },
      /* { text: 'Examples', link: '/examples' }, */
      { text: 'Reference', link: '/core/reference/config' },
      {
        text: 'About',
        items: [
          { text: 'What is Psitta?', link: '/core/introduction' },
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
          text: 'Overview',
          base: '/core',
          items: [
            { text: 'Introduction', link: '/introduction' },
          ]
        },
        {
          text: 'Guides',
          base: '/core/guide',
          items: [
            { text: 'Quickstart', link: '/quickstart' },
            { text: 'Installation', link: '/installation' },
            { text: 'Configuration', link: '/configuration' },
            /* { text: 'Localization', link: '/localization' },
            { text: 'Formatting', link: '/formatting' },
            { text: 'Detection', link: '/locale-detection' },
            { text: 'Translation', link: '/translation' }, */
          ]
        },
        /* {
          text: 'Explanations',
          items: [
            { text: 'Key Design', link: '/core/explanations/key-design' },
          ]
        }, */
        {
          text: 'Reference',
          base: '/core/reference',
          items: [
            { text: 'Configuration', link: '/config' },
            { text: 'Format API', link: '/format' },
            { text: 'Interpolate API', link: '/interpolation' },
            { text: 'Resolve API', link: '/resolve' },
            { text: 'Grammar API', link: '/grammar' },
            { text: 'Localization API', link: '/localization' },
            { text: 'Translation API', link: '/translation' },
            { text: 'Detection API', link: '/detection' },
            { text: 'Library', link: '/library' },
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
