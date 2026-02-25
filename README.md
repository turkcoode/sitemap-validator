# Sitemap Validator

XML sitemap dosyalarını doğrulayan ve analiz eden CLI aracı

[![npm version](https://img.shields.io/npm/v/sitemap-validator.svg)](https://www.npmjs.com/package/sitemap-validator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Kurulum

```bash
npm install -g sitemap-validator
```

## Kullanım

```bash
sitemap-validator --help
```

```javascript
const sitemapValidator = require('sitemap-validator');

// Temel kullanım
const result = sitemapValidator.analyze(input);
console.log(result);
```

## Özellikler

- Hızlı ve hafif
- Sıfır yapılandırma ile çalışır
- CLI ve programatik API desteği
- Türkçe karakter desteği

## API

### `analyze(input, options?)`

| Parametre | Tip | Açıklama |
|-----------|-----|----------|
| `input` | `string` | Analiz edilecek veri |
| `options` | `object` | İsteğe bağlı yapılandırma |

## Örnekler

Daha fazla örnek ve detaylı dokümantasyon için [TurkCode Blog](https://turkcode.net/blog) adresini ziyaret edin.

## Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.



## 📚 Dokümantasyon

- [Ana Sayfa](docs/Home.md)
- [Kurulum Rehberi](docs/Kurulum.md)
- [API Dokümantasyonu](docs/API-Docs.md)
- [SSS](docs/SSS.md)
- [Örnekler](docs/Örnekler.md)

## Lisans

MIT - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

**TurkCode** tarafından geliştirilmiştir | [https://turkcode.net](https://turkcode.net)
