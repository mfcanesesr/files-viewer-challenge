const API_BASE = 'http://localhost:3001';

export async function fetchFilesList() {
  const res = await fetch(`${API_BASE}/files/list`);
  if (!res.ok) throw new Error('Error fetching files list');
  return res.json(); // { files: [...] }
}

export async function fetchFilesData(fileName) {
  let url = `${API_BASE}/files/data`;
  if (fileName) {
    url += `?fileName=${encodeURIComponent(fileName)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error fetching files data');
  return res.json(); // [{ file, lines: [...] }, ...]
}
