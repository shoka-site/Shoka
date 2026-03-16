# SEO Guide for Shoka Platform

This guide will help you get your website indexed by Google so people can find it when searching.

## Step 1: Submit to Google Search Console (CRITICAL)

Google Search Console is how you tell Google about your website. Without this, Google may not know your site exists.

### How to set it up:

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Add your property**: Enter `https://www.shoka.site`
3. **Verify ownership**: Google will give you a verification code or ask you to add a DNS record
4. **Submit your sitemap**: 
   - Go to Sitemaps in the left menu
   - Enter `sitemap.xml` in the "Add a new sitemap" field
   - Click Submit

### Alternative: Use Indexing API

If you have access to the Google Cloud Console, you can also use the Indexing API to request immediate indexing.

## Step 2: Verify Google Has Indexed Your Site

1. Open Google and search for: `site:shoka.site`
2. If you see results, your site is indexed! ✅
3. If not, check Google Search Console for any indexing issues

## Step 3: Build Backlinks

Ask other websites to link to yours. Good places:
- Local Iraqi business directories
- Technology blogs
- Social media profiles

## Technical SEO Status

Your site already has:
- ✅ robots.txt - Allows Googlebot
- ✅ sitemap.xml - Lists all pages
- ✅ Meta tags - Title, description, keywords
- ✅ Open Graph - For social media sharing
- ✅ Twitter Cards
- ✅ JSON-LD Structured Data - Organization & Website schemas
- ✅ Arabic & English support with hreflang
- ✅ og-image.png - Social sharing image

## What to Do Next

1. **Submit to Google Search Console** (most important!)
2. Create a Google Analytics account for traffic tracking
3. Add your site to Bing Webmaster Tools (bing.com/webmaster)
4. Set up a LinkedIn company page with link to your website

## For Developers

To check if pages have proper metadata, you can use:
```bash
curl -s https://www.shoka.site | grep "<title>"
```

Or use browser DevTools to view the page source.
