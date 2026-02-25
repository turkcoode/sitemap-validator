# Sık Sorulan Sorular (SSS)

## Genel

### Bu araç ne işe yarar?
Sitemap Validator, xml sitemap dosyalarını doğrulayan ve analiz eden cli aracı. Hem CLI hem de Node.js kütüphanesi olarak kullanılabilir.

### Ücretsiz mi?
Evet, MIT lisansı ile tamamen açık kaynak ve ücretsizdir.

### Hangi Node.js sürümünü destekliyor?
Node.js 14 ve üzeri sürümleri desteklemektedir.

## Kullanım

### CLI olarak nasıl kullanırım?
```bash
npm install -g sitemap-validator
sitemap-validator <input>
```

### Programatik olarak nasıl kullanırım?
```javascript
const sitemapValidator = require('sitemap-validator');
const result = sitemapValidator.analyze(input);
```

### TypeScript desteği var mı?
Type tanımları pakete dahildir. Doğrudan TypeScript projelerinde kullanabilirsiniz.

## Sorun Giderme

### Kurulum hatası alıyorum
1. Node.js sürümünüzü kontrol edin
2. `npm cache clean --force` çalıştırın
3. Yeniden deneyin

### Performans yavaş
- Büyük girdiler için `--chunk` seçeneğini kullanın
- Detaylı çıktı gereksizse `--verbose` kapatın

## Katkıda Bulunma

### Nasıl katkıda bulunabilirim?
1. Repo'yu fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request açın

### Bug buldum, nasıl bildireyim?
[GitHub Issues](https://github.com/turkcoode/sitemap-validator/issues) sayfasından yeni bir issue açabilirsiniz.

---

Daha fazla soru ve yanıt için [TurkCode](https://turkcode.net/blog) blogunu ziyaret edin.
