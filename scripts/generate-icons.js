const sharp = require('sharp');
const path = require('path');

// Icon SVG with dark gradient background per brand spec
// 120x120 viewBox icon mark on gradient background
function buildIconSvg(size) {
  // Padding: icon centered with ~20% margin
  const pad = size * 0.18;
  const iconArea = size - pad * 2;
  const scale = iconArea / 120;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(145)">
      <stop offset="0%" stop-color="#0A201F"/>
      <stop offset="100%" stop-color="#0F2B2A"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg)"/>
  <!-- Icon mark, centered -->
  <g transform="translate(${pad}, ${pad}) scale(${scale})">
    <!-- Left arcs (Teal) -->
    <path d="M60 24 C34 24, 14 44, 14 70" stroke="#2DD4BF" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="1"/>
    <path d="M60 39 C43 39, 29 53, 29 70" stroke="#2DD4BF" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="0.6"/>
    <path d="M60 54 C52 54, 44 62, 44 70" stroke="#2DD4BF" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="0.3"/>
    <!-- Right arcs (Coral) -->
    <path d="M60 24 C86 24, 106 44, 106 70" stroke="#FF6B6B" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="1"/>
    <path d="M60 39 C77 39, 91 53, 91 70" stroke="#FF6B6B" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="0.6"/>
    <path d="M60 54 C68 54, 76 62, 76 70" stroke="#FF6B6B" stroke-width="5.5" stroke-linecap="round" fill="none" opacity="0.3"/>
    <!-- Center point -->
    <circle cx="60" cy="70" r="4.5" fill="#fff"/>
  </g>
</svg>`;
}

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');

  const targets = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ];

  for (const { name, size } of targets) {
    const svg = buildIconSvg(size);
    const outPath = path.join(publicDir, name);
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated ${name} (${size}x${size})`);
  }
}

generate().catch(err => { console.error(err); process.exit(1); });
