import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = locals.runtime.env;

  try {
    const donations = await DB.prepare(
      'SELECT id, title, target, collected, sort_order, active FROM donations ORDER BY sort_order ASC'
    ).all();

    return new Response(JSON.stringify({ donations: donations.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memuat donations' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  const { DB } = locals.runtime.env;

  try {
    const body = await request.json();
    const { action, id, title, target, collected, sort_order } = body;

    if (action === 'add') {
      if (!title) {
        return new Response(JSON.stringify({ error: 'title wajib diisi' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const maxRow = await DB.prepare('SELECT MAX(sort_order) as max_order FROM donations').first();
      const nextOrder = ((maxRow?.max_order as number) ?? -1) + 1;

      await DB.prepare(
        'INSERT INTO donations (title, target, collected, sort_order) VALUES (?, ?, ?, ?)'
      ).bind(title, target ?? 0, collected ?? 0, sort_order ?? nextOrder).run();

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
        'UPDATE donations SET title = ?, target = ?, collected = ?, sort_order = ? WHERE id = ?'
      ).bind(title || '', target ?? 0, collected ?? 0, sort_order ?? 0, id).run();

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

      await DB.prepare('DELETE FROM donations WHERE id = ?').bind(id).run();

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === 'reorder') {
      const { items } = body;
      if (!Array.isArray(items)) {
        return new Response(JSON.stringify({ error: 'items harus array' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const stmts = items.map((item: { id: number; sort_order: number }) =>
        DB.prepare('UPDATE donations SET sort_order = ? WHERE id = ?').bind(item.sort_order, item.id)
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
    return new Response(JSON.stringify({ error: 'Gagal memproses donasi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
