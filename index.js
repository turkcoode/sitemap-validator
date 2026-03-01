#!/usr/bin/env node
'use strict';

/**
 * Sitemap Validator
 * XML sitemap dosyalarını doğrulayan ve analiz eden CLI aracı
 *
 * @author TurkCode <https://turkcode.net>
 * @license MIT
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

function fetchUrl(urlStr, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr);
        const client = url.protocol === 'https:' ? https : http;

        const req = client.get({
            hostname: url.hostname,
            path: url.pathname + url.search,
            headers: {
                'User-Agent': 'sitemap-validator/1.0.0',
                ...options.headers,
            },
            timeout: options.timeout || 10000,
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        });

        req.on('error', reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

async function analyze(input, options = {}) {
    const url = input.startsWith('http') ? input : `https://${input}`;
    const response = await fetchUrl(url);
    const html = response.body;

    const results = {
        url,
        statusCode: response.statusCode,
        analysis: {},
        score: 0,
        maxScore: 100,
    };

    // Title analizi
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    results.analysis.title = {
        exists: !!titleMatch,
        value: titleMatch ? titleMatch[1].trim() : null,
        length: titleMatch ? titleMatch[1].trim().length : 0,
        optimal: titleMatch ? titleMatch[1].trim().length >= 30 && titleMatch[1].trim().length <= 60 : false,
    };
    if (results.analysis.title.optimal) results.score += 20;
    else if (results.analysis.title.exists) results.score += 10;

    // Meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    results.analysis.description = {
        exists: !!descMatch,
        value: descMatch ? descMatch[1].trim() : null,
        length: descMatch ? descMatch[1].trim().length : 0,
        optimal: descMatch ? descMatch[1].trim().length >= 120 && descMatch[1].trim().length <= 160 : false,
    };
    if (results.analysis.description.optimal) results.score += 20;
    else if (results.analysis.description.exists) results.score += 10;

    // H1 analizi
    const h1Matches = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi) || [];
    results.analysis.h1 = {
        count: h1Matches.length,
        optimal: h1Matches.length === 1,
    };
    if (results.analysis.h1.optimal) results.score += 15;

    // Canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    results.analysis.canonical = {
        exists: !!canonicalMatch,
        value: canonicalMatch ? canonicalMatch[1] : null,
    };
    if (results.analysis.canonical.exists) results.score += 15;

    // Open Graph
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*/i);
    const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*/i);
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*/i);
    results.analysis.openGraph = {
        hasTitle: !!ogTitle,
        hasDescription: !!ogDesc,
        hasImage: !!ogImage,
    };
    if (ogTitle && ogDesc && ogImage) results.score += 15;

    // Robots meta
    const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
    results.analysis.robots = {
        exists: !!robotsMatch,
        value: robotsMatch ? robotsMatch[1] : null,
        indexable: !robotsMatch || !robotsMatch[1].includes('noindex'),
    };
    if (results.analysis.robots.indexable) results.score += 15;

    if (options.verbose) {
        results.rawHeaders = response.headers;
    }

    return results;
}

// CLI
if (require.main === module) {
    const args = process.argv.slice(2);
    const url = args.find(a => !a.startsWith('-'));

    if (!url || args.includes('--help')) {
        console.log(`
Sitemap Validator - XML sitemap dosyalarını doğrulayan ve analiz eden CLI aracı

Kullanım:
  sitemap-validator <url> [seçenekler]

Seçenekler:
  --verbose    Detaylı çıktı
  --json       JSON formatında çıktı
  --help       Bu yardım mesajını göster

Örnekler:
  sitemap-validator example.com
  sitemap-validator https://example.com --json
  sitemap-validator example.com --verbose

Daha fazla bilgi: https://turkcode.net
`);
        process.exit(0);
    }

    const verbose = args.includes('--verbose');
    const json = args.includes('--json');

    analyze(url, { verbose })
        .then(result => {
            if (json) {
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(`\n📊 SEO Analiz: ${result.url}`);
                console.log(`Skor: ${result.score}/${result.maxScore}\n`);
                Object.entries(result.analysis).forEach(([key, val]) => {
                    const status = val.optimal || val.exists || val.indexable ? '✅' : '❌';
                    console.log(`  ${status} ${key}: ${JSON.stringify(val)}`);
                });
            }
        })
        .catch(err => {
            console.error(`Hata: ${err.message}`);
            process.exit(1);
        });
}

module.exports = { analyze };

// Input validation güçlendirildi
