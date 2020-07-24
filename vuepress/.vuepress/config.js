module.exports = {
  base: !process.env.CI || (process.env.CI && process.env.CI.toLowerCase() !== 'true') ? '/' : '/moonshard/',
  title: 'Moonshard',
  description: 'Nodejs framework to build high-performance app in no time',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/guides/get-started.md' },
      { text: 'Controllers', link: '/guides/controllers.md' },
      { text: 'Services', link: '/guides/services.md' },
      { text: 'Github', link: 'https://github.com/cervantes007/moonshard.git' },
    ],
    sidebar: 'auto',
  },
  plugins: ['@vuepress/medium-zoom', '@vuepress/back-to-top', 'vuepress-plugin-smooth-scroll', 'one-click-copy'],
};
