export async function onRequest(context) {
  // 1. Cek jika metodenya bukan POST, tolak.
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { request, env } = context;

  try {
    const { url, slug } = await request.json();

    // 2. Kirim ke Supabase
    const res = await fetch(`${env.SUPABASE_URL}/rest/v1/links`, {
      method: 'POST',
      headers: {
        'apikey': env.SUPABASE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ url, slug })
    });

    if (res.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      const errorText = await res.text();
      return new Response(JSON.stringify({ error: errorText }), { status: 400 });
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
