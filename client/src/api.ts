const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getHeroes(page = 1, limit = 5) {
  const res = await fetch(`${API}/api/heroes?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load heroes");
  return res.json();
}

export async function getHero(id: string | number) {
  const res = await fetch(`${API}/api/heroes/${id}`);
  if (!res.ok) throw new Error("Hero not found");
  return res.json();
}

export async function createHero(payload: any) {
  const res = await fetch(`${API}/api/heroes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}

export async function updateHero(id: string | number, payload: any) {
  const res = await fetch(`${API}/api/heroes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function deleteHero(id: string | number) {
  const res = await fetch(`${API}/api/heroes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}

export async function uploadImages(id: string | number, files: File[]) {
  const fd = new FormData();
  files.forEach((f) => fd.append("images", f));
  const res = await fetch(`${API}/api/heroes/${id}/images`, { method: "POST", body: fd });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function deleteImage(id: string | number, imageId: number) {
  const res = await fetch(`${API}/api/heroes/${id}/images/${imageId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete image failed");
}
