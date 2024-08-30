// app/actions/fetchMockData.ts
import fs from 'fs';
import path from 'path';

export async function fetchMockData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'flags.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);
  // console.log('Data fetched:', data);
  return data;
}
