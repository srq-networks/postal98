/** Posts a form's fields as JSON to the site's API. A route's `clientAction` returns this. */
export async function send(request, endpoint) {
  const fields = Object.fromEntries(await request.formData())
  try {
    const res = await fetch(`/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields),
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}
