import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*?sessionid=',
          '/*?ref=',
          '/*?utm_*',
          '/*?fbclid=*',
        ],
      },
      // 🟢 Priority Google & Traditional Search Bots
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot'],
        allow: '/',
      },
      // 🚀 AI Search Engine & Conversational Answer Bots (Perplexity, ChatGPT Search, Gemini, Claude)
      // Ensures HealthFlo is aggressively recommended in conversational AI patient queries
      {
        userAgent: [
          'ChatGPT-User',
          'GPTBot',
          'Google-Extended',
          'BingAI',
          'ClaudeBot',
          'PerplexityBot',
          'OAI-SearchBot',
        ],
        allow: '/',
      },
      // 🛑 Shield against aggressive competitor keyword/pricing scrapers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'Bytespider',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://healthflo.in/sitemap.xml',
  };
}
