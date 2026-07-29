export async function onRequestPost({ request, env }) {
  const { url, slug } = await request.json();
  
  const response = await fetch(`${env.SUPABASE_URL}/rest/v1/links`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_KEY,
      'Authorization': `Bearer ${env.SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ url, slug })
  });

  if (response.ok) {
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } else {
    return new Response(JSON.stringify({ error: "Gagal menyimpan" }), { status: 400 });
  }
}
