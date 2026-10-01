document.getElementById('lspd-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Çift gönderimi önlemek için butonu kilitle
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn && submitBtn.disabled) return;
    if (submitBtn) submitBtn.disabled = true;

    const icIsim = document.getElementById('ic-isim').value;
    const yas = document.getElementById('yas').value;
    const discordKullanici = document.getElementById('discord-kullanici').value;
    const discordId = document.getElementById('discord-id').value || "Belirtilmedi";
    const oynamaSuresi = document.getElementById('oynama-suresi').value;
    const haftalikSaat = document.getElementById('haftalik-saat').value;
    const deneyim = document.getElementById('deneyim').value || "Belirtilmedi";
    const neden = document.getElementById('neden').value;
    const senaryo = document.getElementById('senaryo').value;
    const ekBilgi = document.getElementById('ek-bilgi').value || "Yok";

    const discordPayload = {
        embeds: [{
            title: "🛡 Yeni LSPD Başvurusu Geldi!",
            color: 1752220,
            fields: [
                { name: "👤 Karakter Ad Soyad", value: icIsim, inline: true },
                { name: "🎂 Yaş (OOC)", value: yas, inline: true },
                { name: "💬 Discord Kullanıcı", value: discordKullanici, inline: true },
                { name: "🆔 Discord ID", value: discordId, inline: true },
                { name: "📜 Sabıka / Geçmiş", value: oynamaSuresi, inline: true },
                { name: "⏰ Haftalık Aktiflik", value: haftalikSaat, inline: true },
                { name: "👮‍♂️ Önceki Polislik Deneyimi", value: deneyim, inline: false },
                { name: "🎯 Neden LSPD?", value: neden, inline: false },
                { name: "🚨 Taktiksel Yaklaşım / Senaryo", value: senaryo, inline: false },
                { name: "📌 Ek Bilgi", value: ekBilgi, inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    const webhookURL = "https://discord.com/api/webhooks/1554933009231118406/Amnzupq7m646dXgB-eYBjxvNsZuFFNCLi1Whi735SzwPN9_0j2Pr4b8EjXJrpgbr4lD3";

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordPayload)
    })
    .then(response => {
        showToast("LSPD başvurunuz başarıyla gönderildi!");
        document.getElementById('lspd-form').reset();
    })
    .catch(error => {
        console.error('Hata:', error);
        showToast("LSPD başvurunuz başarıyla gönderildi!");
        document.getElementById('lspd-form').reset();
    })
    .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
    });
});

function showToast(message) {
    const toast = document.getElementById('toast');
    if(toast) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
}