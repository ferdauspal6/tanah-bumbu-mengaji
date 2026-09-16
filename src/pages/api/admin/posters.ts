import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const GET: APIRoute = async () => {
  const DB = env.DB;

  try {
    const posters = await DB.prepare(
      'SELECT id, img_url, caption, sort_order, active FROM posters ORDER BY sort_order ASC'
    ).all();

    return new Response(JSON.stringify({ posters: posters.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memuat posters' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const DB = env.DB;

  try {
    const body = await request.json();
    const { action, id, img_url, caption, sort_order } = body;

    if (action === 'add') {
      if (!img_url) {
        return new Response(JSON.stringify({ error: 'img_url wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Get max sort_order
      const maxRow = await DB.prepare('SELECT MAX(sort_order) as max_order FROM posters').first();
      const nextOrder = ((maxRow?.max_order as number) ?? -1) + 1;

      await DB.prepare(
        'INSERT INTO posters (img_url, caption, sort_order) VALUES (?, ?, ?)'
      ).bind(img_url, caption || '', sort_order ?? nextOrder).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'update') {
      if (!id) {
        return new Response(JSON.stringify({ error: 'id wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await DB.prepare(
        'UPDATE posters SET img_url = ?, caption = ?, sort_order = ? WHERE id = ?'
      ).bind(img_url || '', caption || '', sort_order ?? 0, id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'delete') {
      if (!id) {
        return new Response(JSON.stringify({ error: 'id wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await DB.prepare('DELETE FROM posters WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'reorder') {
      const { items } = body; // [{ id, sort_order }]
      if (!Array.isArray(items)) {
        return new Response(JSON.stringify({ error: 'items harus array' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const stmts = items.map((item: { id: number; sort_order: number }) =>
        DB.prepare('UPDATE posters SET sort_order = ? WHERE id = ?').bind(item.sort_order, item.id)
      );
      await DB.batch(stmts);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'action tidak valid' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memproses poster' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
