import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = locals.runtime.env;

  try {
    // Fetch settings
    const settingsRows = await DB.prepare('SELECT key, value FROM settings').all();
    const settings: Record<string, string> = {};
    for (const row of settingsRows.results) {
      settings[row.key as string] = row.value as string;
    }

    // Fetch posters
    const posters = await DB.prepare(
      'SELECT id, img_url, caption, sort_order FROM posters WHERE active = 1 ORDER BY sort_order ASC'
    ).all();

    // Fetch donations
    const donations = await DB.prepare(
      'SELECT id, title, target, collected, sort_order FROM donations WHERE active = 1 ORDER BY sort_order ASC'
    ).all();

    // Prayer times — fetch from AlAdhan API using settings coords
    const lat = parseFloat(settings.lat || '-3.4553');
    const lng = parseFloat(settings.lng || '115.9750');
    const tz = settings.timezone || 'Asia/Makassar';

    const now = new Date();
    const dateKey = now.toLocaleDateString('en-CA', { timeZone: tz });
    const [y, m, d] = dateKey.split('-');

    let prayerData = null;

    // Check cache first
    const cached = await DB.prepare(
      'SELECT data FROM prayer_cache WHERE date_key = ? AND lat = ? AND lng = ?'
    ).bind(dateKey, lat, lng).first();

    if (cached) {
      prayerData = JSON.parse(cached.data as string);
    } else {
      // Fetch from AlAdhan API
      const url = `https://api.aladhan.com/v1/timings/${d}-${m}-${y}?latitude=${lat}&longitude=${lng}&method=20&timezonestring=${tz}`;
      const res = await fetch(url);
      const json = await res.json();

      if (json.code === 200) {
        prayerData = json.data;
        // Cache it
        await DB.prepare(
          'INSERT OR REPLACE INTO prayer_cache (date_key, lat, lng, data) VALUES (?, ?, ?, ?)'
        ).bind(dateKey, lat, lng, JSON.stringify(prayerData)).run();
      }
    }

    return new Response(JSON.stringify({
      settings: {
        mosque_name: settings.mosque_name || 'Musholla Ibnu Abbas',
        location_name: settings.location_name || 'Tanah Bumbu · Kalimantan Selatan',
        lat,
        lng,
        timezone: tz,
        marquee_text: settings.marquee_text || '',
      },
      posters: posters.results,
      donations: donations.results,
      prayer: prayerData,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memuat data display' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
