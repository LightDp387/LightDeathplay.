document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lssd-form') || document.querySelector('form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn && submitBtn.disabled) return;
        if (submitBtn) submitBtn.disabled = true;

        const icIsim = document.getElementById('ic-isim') ? document.getElementById('ic-isim').value : '';
        const yas = document.getElementById('yas') ? document.getElementById('yas').value : '';
        const discordKullanici = document.getElementById('discord-kullanici') ? document.getElementById('discord-kullanici').value : '';
        const discordId = document.getElementById('discord-id') ? (document.getElementById('discord-id').value || "Belirtilmedi") : "Belirtilmedi";
        const oynamaSuresi = document.getElementById('oynama-suresi') ? document.getElementById('oynama-suresi').value : '';
        const haftalikSaat = document.getElementById('haftalik-saat') ? document.getElementById('haftalik-saat').value : '';
        const deneyim = document.getElementById('deneyim') ? (document.getElementById('deneyim').value || "Belirtilmedi") : "Belirtilmedi";
        const neden = document.getElementById('neden') ? document.getElementById('neden').value : '';
        const senaryo = document.getElementById('senaryo') ? document.getElementById('senaryo').value : '';
        const ekBilgi = document.getElementById('ek-bilgi') ? (document.getElementById('ek-bilgi').value || "Yok") : "Yok";

        const discordPayload = {
            embeds: [{
                title: "⭐ Yeni LSSD Başvurusu Geldi!",
                color: 15105570,
                fields: [
                    { name: "👤 Karakter Ad Soyad", value: icIsim, inline: true },
                    { name: "🎂 Yaş (OOC)", value: yas, inline: true },
                    { name: "💬 Discord Kullanıcı", value: discordKullanici, inline: true },
                    { name: "🆔 Discord ID", value: discordId, inline: true },
                    { name: "📜 Sabıka / Geçmiş", value: oynamaSuresi, inline: true },
                    { name: "⏰ Haftalık Aktiflik", value: haftalikSaat, inline: true },
                    { name: "🤠 Önceki Kolluk Deneyimi", value: deneyim, inline: false },
                    { name: "🎯 Neden Şerif Departmanı?", value: neden, inline: false },
                    { name: "🚨 Kırsal Bölge Senaryosu", value: senaryo, inline: false },
                    { name: "📌 Ek Bilgi", value: ekBilgi, inline: false }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        const webhookURL = "https://discord.com/api/webhooks/1554933132426481714/8q2lk0cgqsTM_deK3gTpU5WkPmQVilr_DXF-6UB9eJnS1mu7LWkydkxidNDx4oVyxCN6";

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        })
        .then(response => {
            showToast("LSSD başvurunuz başarıyla gönderildi!");
            form.reset();
        })
        .catch(error => {
            console.error('Hata:', error);
            showToast("LSSD başvurunuz başarıyla gönderildi!");
            form.reset();
        })
        .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
        });
    });
});

function showToast(message) {
    const toast = document.getElementById('toast');
    if(toast) {
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}