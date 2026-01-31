/**
 * Image Optimization Script for Thymeless Treats
 * 
 * WHEN TO RUN: 
 *   - After adding new photos to public/assets/img/
 *   - Run: npm run optimize-images
 * 
 * WHAT IT DOES:
 *   - Compresses large images (maintains quality, reduces file size)
 *   - Converts oversized PNGs to JPG (photos don't need transparency)
 *   - Resizes images over 1600px wide
 *   - Creates WebP versions for modern browsers
 *   - SKIPS already-optimized images (safe to run repeatedly)
 * 
 * NOTE: You don't HAVE to run this. The site will work with unoptimized 
 * images, they'll just load slower on mobile. Running this is recommended
 * before major deployments or after adding many new photos.
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, rename, unlink, writeFile } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMG_DIR = join(__dirname, '..', 'public', 'assets', 'img');
const MAX_WIDTH = 1600; // Good balance of quality and file size
const QUALITY_JPG = 82;
const QUALITY_WEBP = 80;

// Files/folders to skip
const SKIP_PATTERNS = ['.HEIC', '.heic', '_site', '.DS_Store', '.optimized'];

// Track optimized files to avoid re-processing
const OPTIMIZED_MARKER = '.optimized';

async function getAllImageFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      if (!SKIP_PATTERNS.some(pattern => file.includes(pattern))) {
        await getAllImageFiles(filePath, fileList);
      }
    } else {
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        if (!SKIP_PATTERNS.some(pattern => file.includes(pattern))) {
          fileList.push(filePath);
        }
      }
    }
  }
  
  return fileList;
}

function getMarkerPath(imagePath) {
  const dir = dirname(imagePath);
  const name = basename(imagePath, extname(imagePath));
  return join(dir, `${name}${OPTIMIZED_MARKER}`);
}

async function isAlreadyOptimized(imagePath) {
  const markerPath = getMarkerPath(imagePath);
  if (!existsSync(markerPath)) return false;
  
  // Check if image is newer than marker
  const imageStat = await stat(imagePath);
  const markerStat = await stat(markerPath);
  return imageStat.mtimeMs <= markerStat.mtimeMs;
}

async function markAsOptimized(imagePath) {
  const markerPath = getMarkerPath(imagePath);
  await writeFile(markerPath, new Date().toISOString());
}

async function optimizeImage(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const dir = dirname(inputPath);
  const relativePath = inputPath.replace(IMG_DIR, '').replace(/^[\/\\]/, '');
  
  // Check if already optimized
  if (await isAlreadyOptimized(inputPath)) {
    return { skipped: true, path: relativePath };
  }
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const originalSize = (await stat(inputPath)).size;
  
  // Skip tiny images (likely already optimized or icons)
  if (originalSize < 50 * 1024) { // Under 50KB
    await markAsOptimized(inputPath);
    return { skipped: true, path: relativePath, reason: 'already small' };
  }
  
  // Determine if resize needed
  const needsResize = metadata.width > MAX_WIDTH;
  const resizeOptions = needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : {};
  
  // For photos (PNG that should be JPG), convert to JPG
  const isPNG = ext === '.png';
  const hasAlpha = metadata.hasAlpha;
  const shouldConvertToJpg = isPNG && !hasAlpha;
  
  let outputPath = inputPath;
  let pipeline = sharp(inputPath);
  
  if (needsResize) {
    pipeline = pipeline.resize(resizeOptions);
  }
  
  // Create temp file, then replace original
  const tempPath = join(dir, `${name}_temp.jpg`);
  
  if (shouldConvertToJpg || !isPNG) {
    // Convert to/optimize as JPG
    await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toFile(tempPath);
    
    // If converting from PNG, update the path
    if (shouldConvertToJpg) {
      outputPath = join(dir, `${name}.jpg`);
      // Remove original PNG after successful conversion
      await rename(tempPath, outputPath);
      await unlink(inputPath);
    } else {
      // Replace original JPG
      await unlink(inputPath);
      await rename(tempPath, inputPath);
      outputPath = inputPath;
    }
  } else {
    // Keep as optimized PNG
    const tempPng = join(dir, `${name}_temp.png`);
    await pipeline.png({ compressionLevel: 9 }).toFile(tempPng);
    await unlink(inputPath);
    await rename(tempPng, inputPath);
    outputPath = inputPath;
  }
  
  // Generate WebP version
  const webpPath = join(dir, `${name}.webp`);
  await sharp(outputPath)
    .resize(resizeOptions)
    .webp({ quality: QUALITY_WEBP })
    .toFile(webpPath);
  
  const newSize = (await stat(outputPath)).size;
  const webpSize = (await stat(webpPath)).size;
  
  // Mark as optimized
  await markAsOptimized(outputPath);
  
  return {
    skipped: false,
    path: relativePath,
    original: originalSize,
    optimized: newSize,
    webp: webpSize,
    converted: shouldConvertToJpg,
  };
}

async function main() {
  console.log('🖼️  Thymeless Treats Image Optimizer');
  console.log('=====================================\n');
  
  if (!existsSync(IMG_DIR)) {
    console.log(`❌ Image directory not found: ${IMG_DIR}`);
    return;
  }
  
  const files = await getAllImageFiles(IMG_DIR);
  console.log(`Found ${files.length} images\n`);
  
  let processed = 0;
  let skipped = 0;
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  for (const file of files) {
    try {
      const result = await optimizeImage(file);
      
      if (result.skipped) {
        skipped++;
        // Only show skip message in verbose mode
      } else {
        processed++;
        totalOriginal += result.original;
        totalOptimized += result.optimized;
        
        const originalKB = (result.original / 1024).toFixed(0);
        const newKB = (result.optimized / 1024).toFixed(0);
        const webpKB = (result.webp / 1024).toFixed(0);
        const savings = (((result.original - result.optimized) / result.original) * 100).toFixed(0);
        
        console.log(`✓ ${result.path}`);
        console.log(`  ${originalKB}KB → ${newKB}KB (${savings}% smaller) + WebP: ${webpKB}KB`);
        if (result.converted) {
          console.log(`  📸 Converted PNG → JPG`);
        }
      }
    } catch (error) {
      console.error(`✗ Error: ${file}`);
      console.error(`  ${error.message}`);
    }
  }
  
  console.log('\n=====================================');
  if (processed > 0) {
    const totalSavings = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(0);
    console.log(`✅ Optimized: ${processed} images`);
    console.log(`📦 Saved: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(1)} MB (${totalSavings}% reduction)`);
  }
  if (skipped > 0) {
    console.log(`⏭️  Skipped: ${skipped} (already optimized)`);
  }
  if (processed === 0 && skipped > 0) {
    console.log(`\n💡 All images already optimized! Nothing to do.`);
  }
}

main().catch(console.error);
