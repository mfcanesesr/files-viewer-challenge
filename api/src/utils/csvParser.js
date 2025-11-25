function parseCsvContent(csvString) {
  if (!csvString) return [];

  const lines = csvString.split('\n').map((l) => l.trim()).filter(Boolean);
  const [header, ...rows] = lines;

  const expectedHeader = 'file,text,number,hex';
  if (!header || header.replace(/\s/g, '') !== expectedHeader) {
    return [];
  }

  const result = [];

  for (const row of rows) {
    const parts = row.split(',');

    if (parts.length !== 4) continue;

    const [file, text, numberStr, hex] = parts.map((p) => p.trim());

    if (!file || !text || !numberStr || !hex) continue;
    if (!/^\d+$/.test(numberStr)) continue;
    if (!/^[0-9a-fA-F]{32}$/.test(hex)) continue;

    result.push({
      file,
      text,
      number: Number(numberStr),
      hex,
    });
  }

  return result;
}

module.exports = {
  parseCsvContent,
};
