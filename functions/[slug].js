export async function onRequestGet({ params, env }) {
  const { slug } = params;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SUPABASE_KEY = env.SUPABASE_KEY;

  // Ambil data dari Supabase menggunakan Fetch API
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/links?slug=eq.${slug}&select=url`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await response.json();

  if (data.length > 0) {
    // Jika ketemu, alihkan (302 redirect)
    return Response.redirect(data[0].url, 302);
  }

  // Jika tidak ketemu, balikkan ke halaman utama atau 404
  return new Response("Link tidak ditemukan", { status: 404 });
}
