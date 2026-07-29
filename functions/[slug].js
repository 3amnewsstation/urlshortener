export async function onRequest(context) {
  const { params, env } = context;
  const slug = params.slug;

  // Jangan proses jika slug itu adalah file internal
  if (slug.includes('.') || slug === 'api') {
    return context.next();
  }

  const res = await fetch(
    `${env.SUPABASE_URL}/rest/v1/links?slug=eq.${slug}&select=url`,
    {
      headers: {
        'apikey': env.SUPABASE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_KEY}`
      }
    }
  );

  const data = await res.json();

  if (data && data.length > 0) {
    return Response.redirect(data[0].url, 302);
  }

  // Jika tidak ketemu, lempar ke halaman utama
  return Response.redirect(new URL(context.request.url).origin, 302);
}
