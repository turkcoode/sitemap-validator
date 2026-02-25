# Kullanım Örnekleri

## Temel Örnekler

### Örnek 1: Basit Kullanım

```javascript
const sitemapValidator = require('sitemap-validator');

const result = sitemapValidator.analyze('Merhaba Dünya');
console.log(result);
```

### Örnek 2: Detaylı Analiz

```javascript
const sitemapValidator = require('sitemap-validator');

const result = sitemapValidator.analyze('Test girdi metni', {
    verbose: true,
    format: 'json',
    locale: 'tr'
});

console.log(JSON.stringify(result, null, 2));
```

### Örnek 3: Dosya ile Kullanım

```javascript
const fs = require('fs');
const sitemapValidator = require('sitemap-validator');

const content = fs.readFileSync('input.txt', 'utf8');
const result = sitemapValidator.analyze(content);
console.log(result);
```

## CLI Örnekleri

```bash
# Basit analiz
sitemap-validator "test input"

# Dosyadan okuma
cat input.txt | sitemap-validator

# JSON çıktı
sitemap-validator "test" --json

# Sonucu dosyaya kaydet
sitemap-validator "test" --json > output.json
```

## Express.js Entegrasyonu

```javascript
const express = require('express');
const sitemapValidator = require('sitemap-validator');

const app = express();

app.post('/analyze', async (req, res) => {
    try {
        const result = await sitemapValidator.analyze(req.body.input);
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.listen(3000);
```

---

Daha fazla örnek ve rehber için [TurkCode Blog](https://turkcode.net/blog) sayfasını ziyaret edin.
