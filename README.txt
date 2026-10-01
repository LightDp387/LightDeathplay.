Light Deathplay — MTA:SA rol yapma sunucusu için landing page.

Dosyalar:
- index.html    -> Ana sayfa
- basvuru.html  -> Yetkili başvuru formu sayfası
- style.css     -> Tüm sayfaların ortak tasarımı
- script.js     -> Ana sayfa: oyuncu sayacı, IP kopyalama, kaydırma efektleri
- basvuru.js    -> Başvuru sayfası: formu Discord webhook'una gönderir
- favicon.png   -> Sekme ikonu
- Gta.jpg       -> Hero ve "Nasıl Başlarım" görseli

Kullanım:
Tüm dosyaları aynı klasörde tutup index.html'yi bir tarayıcıda aç.

Değiştirilmesi gerekenler:
- script.js içindeki SERVER_IP / SERVER_PORT değerlerini kendi sunucunun bilgileriyle değiştir.
- basvuru.js içindeki WEBHOOK_URL değerini kendi Discord webhook linkinle değiştir:
  Discord'da ilgili kanalın Ayarları > Entegrasyonlar > Webhook Oluştur adımlarını izleyip
  "Webhook URL'sini Kopyala" ile linki al, WEBHOOK_URL = "..." satırına yapıştır.
  Bu adım yapılmadan form "Discord'a bağlanmamış" uyarısı verir ve gönderim yapmaz.
- index.html ve basvuru.html içindeki Discord ve GTA SA indirme linklerini kendi bağlantılarınla güncelle.
- "mtasa://" ile başlayan bağlantılar oyuncuyu doğrudan MTA istemcisi üzerinden sunucuya bağlar; IP değiştiğinde bu linkleri de güncelle.
