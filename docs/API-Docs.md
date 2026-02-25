# API Dokümantasyonu

## Modülü İçe Aktarma

```javascript
const sitemapValidator = require('sitemap-validator');
```

## Metodlar

### `analyze(input, options?)`

Ana analiz fonksiyonu.

**Parametreler:**

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|-----------|-----|---------|------------|----------|
| `input` | `string` | Evet | - | Analiz edilecek girdi |
| `options.verbose` | `boolean` | Hayır | `false` | Detaylı çıktı |
| `options.format` | `string` | Hayır | `'text'` | Çıktı formatı |
| `options.locale` | `string` | Hayır | `'tr'` | Dil ayarı |

**Dönüş Değeri:** `Promise<Object>`

```javascript
const result = await sitemapValidator.analyze('test input', {
    verbose: true,
    format: 'json'
});
```

### Çıktı Formatı

```json
{
    "success": true,
    "data": { ... },
    "metadata": {
        "processedAt": "2024-01-01T00:00:00Z",
        "duration": "15ms"
    }
}
```

## CLI Kullanımı

```bash
# Temel kullanım
sitemap-validator <input>

# Seçenekler
sitemap-validator <input> --verbose
sitemap-validator <input> --json
sitemap-validator <input> --format table
```

## Hata Yönetimi

```javascript
try {
    const result = await sitemapValidator.analyze(input);
} catch (error) {
    if (error.code === 'INVALID_INPUT') {
        console.error('Geçersiz girdi:', error.message);
    }
}
```

Daha fazla bilgi için [TurkCode Blog](https://turkcode.net/blog) sayfasına bakabilirsiniz.
