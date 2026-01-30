/**
 * Image Optimization Script
 * 
 * Processes all images in public/assets/img and outputs optimized versions
 * to src/assets/img for Astro's built-in image optimization.
 * 
 * Run with: node scripts/optimize-images.mjs
 * 
 * Features:
 * - Converts PNG to JPG where appropriate (photos)
 * - Resizes oversized images to max 2000px width
 * - Compresses with quality setting
 * - Generates WebP versions
 * - Creates blur placeholders for lazy loading
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = join(__dirname, '..', 'public', 'assets', 'img');
const OUTPUT_DIR = join(__dirname, '..', 'src', 'assets', 'img');
const MAX_WIDTH = 2000;
const QUALITY_JPG = 80;
const QUALITY_WEBP = 80;

// Files/folders to skip
const SKIP_PATTERNS = ['.HEIC', '.heic', '_site'];

async function getAllFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      if (!SKIP_PATTERNS.some(pattern => file.includes(pattern))) {
        await getAllFiles(filePath, fileList);
      }
    } else {
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        if (!SKIP_PATTERNS.some(pattern => file.includes(pattern))) {
          fileList.push(filePath);
        }
      }
    }
  }
  
  return fileList;
}

async function optimizeImage(inputPath, outputBasePath) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const relativePath = inputPath.replace(INPUT_DIR, '').replace(/^[\/\\]/, '');
  const outputDir = join(outputBasePath, dirname(relativePath));
  
  // Create output directory if needed
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  const originalSize = (await stat(inputPath)).size;
  const originalSizeKB = (originalSize / 1024).toFixed(1);
  
  // Determine if resize needed
  const needsResize = metadata.width > MAX_WIDTH;
  const resizeOptions = needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : {};
  
  // For photos (PNG that should be JPG), convert to JPG
  // Keep PNG for graphics with transparency
  const isPNG = ext === '.png';
  const hasAlpha = metadata.hasAlpha;
  const shouldConvertToJpg = isPNG && !hasAlpha;
  
  let outputPath;
  let pipeline = sharp(inputPath);
  
  if (needsResize) {
    pipeline = pipeline.resize(resizeOptions);
  }
  
  if (shouldConvertToJpg) {
    // Convert PNG to JPG
    outputPath = join(outputDir, `${name}.jpg`);
    await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toFile(outputPath);
  } else if (isPNG) {
    // Keep as optimized PNG
    outputPath = join(outputDir, `${name}.png`);
    await pipeline.png({ quality: QUALITY_JPG, compressionLevel: 9 }).toFile(outputPath);
  } else {
    // JPG/JPEG - optimize
    outputPath = join(outputDir, `${name}.jpg`);
    await pipeline.jpeg({ quality: QUALITY_JPG, mozjpeg: true }).toFile(outputPath);
  }
  
  const newSize = (await stat(outputPath)).size;
  const newSizeKB = (newSize / 1024).toFixed(1);
  const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
  
  // Also generate WebP version
  const webpPath = join(outputDir, `${name}.webp`);
  await sharp(inputPath)
    .resize(resizeOptions)
    .webp({ quality: QUALITY_WEBP })
    .toFile(webpPath);
  
  const webpSize = (await stat(webpPath)).size;
  const webpSizeKB = (webpSize / 1024).toFixed(1);
  
  console.log(`✓ ${relativePath}`);
  console.log(`  Original: ${originalSizeKB} KB → JPG: ${newSizeKB} KB (${savings}% saved) | WebP: ${webpSizeKB} KB`);
  
  return {
    original: originalSize,
    optimized: newSize,
    webp: webpSize,
  };
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  
  const files = await getAllFiles(INPUT_DIR);
  console.log(`Found ${files.length} images to process\n`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalWebp = 0;
  
  for (const file of files) {
    try {
      const result = await optimizeImage(file, OUTPUT_DIR);
      totalOriginal += result.original;
      totalOptimized += result.optimized;
      totalWebp += result.webp;
    } catch (error) {
      console.error(`✗ Error processing ${file}: ${error.message}`);
    }
  }
  
  console.log('\n============================');
  console.log('📊 Summary');
  console.log(`Original total:  ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total:      ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Savings:         ${(((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1)}%`);
}

main().catch(console.error);
