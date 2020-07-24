module.exports = {
  title: 'Moonshard',
  description: 'Typescript nodejs framework',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/guides/get-started.md' },
      { text: 'Github', link: 'https://github.com/cervantes007/moonshard.git' },
    ],
    sidebar: 'auto',
  },
  plugins: ['@vuepress/medium-zoom', '@vuepress/back-to-top', 'vuepress-plugin-smooth-scroll', 'one-click-copy'],
};
