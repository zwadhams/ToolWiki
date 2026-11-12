/** The same consumer function is exercised against Pact's mock provider. */
export async function parcelStatus(baseUrl, id) {
  const response = await fetch(`${baseUrl}/parcels/${id}`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Parcel request failed: ${response.status}`);
  const parcel = await response.json();
  if (typeof parcel.status !== 'string') throw new Error('Parcel status must be a string.');
  return parcel.status.toUpperCase();
}
