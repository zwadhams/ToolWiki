import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://zwadhams.github.io',
  base: '/ToolWiki',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'Software Analysis Wiki',
    description: 'Tools and techniques for understanding, testing, and verifying software.',
    favicon: '/favicon.svg',
    customCss: ['./src/styles/custom.css'],
    editLink: { baseUrl: 'https://github.com/zwadhams/ToolWiki/edit/main/' },
    social: [{ icon: 'github', label: 'GitHub repository', href: 'https://github.com/zwadhams/ToolWiki' }],
    pagination: false,
    components: { MarkdownContent: './src/components/ArticleContent.astro' },
    sidebar: [
      { label: 'Explore', items: [
        { label: 'All tools', slug: 'index' },
        { label: 'Static analysis', slug: 'static' },
        { label: 'Dynamic analysis', slug: 'dynamic' },
        { label: 'Compare tools', slug: 'compare' },
      ] },
      { label: 'Understand the concepts', items: [
        { label: 'Static vs. dynamic analysis', slug: 'concepts/static-vs-dynamic' },
        { label: 'Static analysis approaches', slug: 'concepts/static-approaches' },
        { label: 'SAST vs. DAST', slug: 'concepts/sast-vs-dast' },
        { label: 'Ways to do DAST', slug: 'concepts/dast-approaches' },
        { label: 'Model and temporal falsification', slug: 'concepts/model-falsification' },
        { label: 'Verification and generated tests', slug: 'concepts/verification-and-generated-tests' },
      ] },
      { label: 'Tool notes', items: [{ autogenerate: { directory: 'tools' } }], collapsed: true },
      { label: 'Maintain the wiki', items: [{ label: 'Add or update a tool', slug: 'guides/editing' }] },
      { label: 'Personal website', link: 'https://zwadhams.github.io/' },
    ],
  })],
});
