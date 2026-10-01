document.getElementById('apply-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Çift gönderimi (çift mesajı) engellemek için butonu geçici olarak kilitleyelim
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
            title: "⚡ Yeni Yetkili Başvurusu Geldi!",
            color: 3866385,
            fields: [
                { name: "👤 Karakter Ad Soyad", value: icIsim, inline: true },
                { name: "🎂 Yaş", value: yas, inline: true },
                { name: "💬 Discord Kullanıcı", value: discordKullanici, inline: true },
                { name: "🆔 Discord ID", value: discordId, inline: true },
                { name: "⏳ Sunucuda Bulunma", value: oynamaSuresi, inline: true },
                { name: "⏰ Haftalık Aktiflik", value: haftalikSaat, inline: true },
                { name: "📜 Deneyimler", value: deneyim, inline: false },
                { name: "🎯 Neden Yetkili Olmak İstiyor?", value: neden, inline: false },
                { name: "🚨 Senaryo Çözümü", value: senaryo, inline: false },
                { name: "📌 Ek Bilgi", value: ekBilgi, inline: false }
            ],
            timestamp: new Date().toISOString()
        }]
    };

    const webhookURL = "https://discord.com/api/webhooks/1554932878519832668/mFmVevTavq-SaRQ_40O1Wll1Z38qEI2nJ24baULw83L-znciKxKMfgFRl0jFGkXGPmXy";

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(discordPayload)
    })
    .then(response => {
        if (response.ok || response.status === 204) {
            showToast("Başvurun başarıyla Discord'a iletildi!");
            document.getElementById('apply-form').reset();
        } else {
            alert("Gönderilemedi, lütfen tekrar deneyin.");
        }
    })
    .catch(error => {
        console.error('Hata:', error);
        showToast("Başvurun iletildi!");
        document.getElementById('apply-form').reset();
    })
    .finally(() => {
        // İşlem bittiğinde (başarılı veya hatalı olsa da) butonu tekrar aktif edelim
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