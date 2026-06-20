import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = [
  'public/images',
  'public/uploads',
  'src/assets',
];

const EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function getFiles(dir) {
  try {
    const entries = await readdir(dir);
    return entries
      .filter(f => EXTS.has(extname(f).toLowerCase()))
      .map(f => join(dir, f));
  } catch {
    return [];
  }
}

const results = { converted: [], skipped: [], failed: [] };

for (const dir of DIRS) {
  const files = await getFiles(dir);
  for (const src of files) {
    const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    try {
      const info = await sharp(src).webp({ quality: 85 }).toFile(webp);
      const before = (await stat(src)).size;
      const saving = Math.round((1 - info.size / before) * 100);
      results.converted.push(`  ✓ ${src} → ${basename(webp)} (${saving}% smaller)`);
      // Remove the original
      await unlink(src);
    } catch (err) {
      results.failed.push(`  ✗ ${src}: ${err.message}`);
    }
  }
}

console.log(`\nConverted (${results.converted.length}):`);
results.converted.forEach(l => console.log(l));
if (results.failed.length) {
  console.log(`\nFailed (${results.failed.length}):`);
  results.failed.forEach(l => console.log(l));
}
console.log('\nDone. Update image references in code from .jpg/.png → .webp');
