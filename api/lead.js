// Deployment refresh after RESEND_API_KEY setup
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

  try {
    const data = req.body || {};
    if (data._honey) return res.status(200).json({ ok:true });

    const required = ['Besoin de financement','Montant estimé','Échéance souhaitée','Nom et prénom','Société','email','Téléphone'];
    for (const key of required) {
      if (!data[key] || String(data[key]).trim() === '') {
        return res.status(400).json({ ok:false, error:'Champ manquant : '+key });
      }
    }

    const email = String(data.email).trim();
    const safe = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const rows = required.map(k => `<tr><td style="padding:10px 12px;border:1px solid #e5e7eb;font-weight:600">${safe(k)}</td><td style="padding:10px 12px;border:1px solid #e5e7eb">${safe(data[k])}</td></tr>`).join('');
    const now = new Date().toLocaleString('fr-FR', { timeZone:'Europe/Paris' });

    const r = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        from:'FinancementsPME.fr <leads@financementspme.fr>',
        to:['contact@financementspme.fr'],
        reply_to: email,
        subject:`Nouvelle demande d’étude — ${data['Société']}`,
        text:
`Nouvelle demande d'étude FinancementsPME.fr

Besoin de financement : ${data['Besoin de financement']}
Montant estimé : ${data['Montant estimé']}
Échéance souhaitée : ${data['Échéance souhaitée']}
Nom et prénom : ${data['Nom et prénom']}
Société : ${data['Société']}
Email : ${data.email}
Téléphone : ${data['Téléphone']}
Date : ${now}`,
        html:`<div style="font-family:Arial,sans-serif;color:#17384E"><h2>Nouvelle demande d'étude</h2><p>Reçue le ${safe(now)}</p><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table><p style="margin-top:18px">Répondre directement à cet email pour contacter le prospect.</p></div>`
      })
    });

    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('Resend error', body);
      return res.status(502).json({ ok:false, error:'Email delivery failed' });
    }
    return res.status(200).json({ ok:true, id:body.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, error:'Server error' });
  }
}
