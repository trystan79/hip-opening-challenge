const MascotSVG = {
  _svgs: {
    fox: (size) => `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="mascot-svg">
        <g class="mascot-body">
          <!-- Body -->
          <ellipse cx="50" cy="65" rx="22" ry="20" fill="#E8732A" class="mascot-torso"/>
          <!-- Belly -->
          <ellipse cx="50" cy="70" rx="14" ry="12" fill="#FCEBD5"/>
          <!-- Head -->
          <circle cx="50" cy="38" r="18" fill="#E8732A" class="mascot-head"/>
          <!-- Face patch -->
          <ellipse cx="50" cy="42" rx="12" ry="10" fill="#FCEBD5"/>
          <!-- Ears -->
          <polygon points="35,25 30,8 42,22" fill="#E8732A" class="mascot-ear-left"/>
          <polygon points="65,25 70,8 58,22" fill="#E8732A" class="mascot-ear-right"/>
          <polygon points="36,23 33,12 41,22" fill="#FFD5B0"/>
          <polygon points="64,23 67,12 59,22" fill="#FFD5B0"/>
          <!-- Eyes -->
          <circle cx="43" cy="36" r="3" fill="#2D1B07" class="mascot-eye-left"/>
          <circle cx="57" cy="36" r="3" fill="#2D1B07" class="mascot-eye-right"/>
          <circle cx="44" cy="35" r="1" fill="white"/>
          <circle cx="58" cy="35" r="1" fill="white"/>
          <!-- Nose -->
          <ellipse cx="50" cy="42" rx="3" ry="2" fill="#2D1B07"/>
          <!-- Mouth -->
          <path d="M47,45 Q50,48 53,45" stroke="#2D1B07" fill="none" stroke-width="1" class="mascot-mouth"/>
          <!-- Arms -->
          <ellipse cx="30" cy="60" rx="6" ry="10" fill="#E8732A" transform="rotate(-15 30 60)" class="mascot-arm-left"/>
          <ellipse cx="70" cy="60" rx="6" ry="10" fill="#E8732A" transform="rotate(15 70 60)" class="mascot-arm-right"/>
          <!-- Tail -->
          <path d="M72,75 Q88,65 82,50" stroke="#E8732A" fill="none" stroke-width="6" stroke-linecap="round" class="mascot-tail"/>
          <circle cx="82" cy="50" r="4" fill="#FCEBD5"/>
          <!-- Feet -->
          <ellipse cx="40" cy="85" rx="8" ry="4" fill="#2D1B07"/>
          <ellipse cx="60" cy="85" rx="8" ry="4" fill="#2D1B07"/>
        </g>
      </svg>`,

    cat: (size) => `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="mascot-svg">
        <g class="mascot-body">
          <!-- Body -->
          <ellipse cx="50" cy="65" rx="20" ry="20" fill="#6B6B6B" class="mascot-torso"/>
          <!-- Belly -->
          <ellipse cx="50" cy="70" rx="12" ry="12" fill="#D4D4D4"/>
          <!-- Head -->
          <circle cx="50" cy="38" r="17" fill="#6B6B6B" class="mascot-head"/>
          <!-- Face patch -->
          <ellipse cx="50" cy="42" rx="11" ry="9" fill="#D4D4D4"/>
          <!-- Ears -->
          <polygon points="35,26 28,6 44,22" fill="#6B6B6B" class="mascot-ear-left"/>
          <polygon points="65,26 72,6 56,22" fill="#6B6B6B" class="mascot-ear-right"/>
          <polygon points="36,24 31,10 43,22" fill="#FFB6C1"/>
          <polygon points="64,24 69,10 57,22" fill="#FFB6C1"/>
          <!-- Eyes -->
          <ellipse cx="43" cy="36" rx="3.5" ry="4" fill="#4CAF50" class="mascot-eye-left"/>
          <ellipse cx="57" cy="36" rx="3.5" ry="4" fill="#4CAF50" class="mascot-eye-right"/>
          <ellipse cx="43" cy="36" rx="1.5" ry="3" fill="#1A1A1A"/>
          <ellipse cx="57" cy="36" rx="1.5" ry="3" fill="#1A1A1A"/>
          <!-- Nose -->
          <polygon points="50,41 48,43 52,43" fill="#FFB6C1"/>
          <!-- Whiskers -->
          <line x1="30" y1="42" x2="42" y2="43" stroke="#888" stroke-width="0.5"/>
          <line x1="30" y1="45" x2="42" y2="45" stroke="#888" stroke-width="0.5"/>
          <line x1="58" y1="43" x2="70" y2="42" stroke="#888" stroke-width="0.5"/>
          <line x1="58" y1="45" x2="70" y2="45" stroke="#888" stroke-width="0.5"/>
          <!-- Mouth -->
          <path d="M47,45 Q50,47 53,45" stroke="#555" fill="none" stroke-width="0.8" class="mascot-mouth"/>
          <!-- Arms -->
          <ellipse cx="32" cy="60" rx="5" ry="10" fill="#6B6B6B" transform="rotate(-10 32 60)" class="mascot-arm-left"/>
          <ellipse cx="68" cy="60" rx="5" ry="10" fill="#6B6B6B" transform="rotate(10 68 60)" class="mascot-arm-right"/>
          <!-- Tail -->
          <path d="M28,75 Q15,55 25,40 Q30,35 28,42" stroke="#6B6B6B" fill="none" stroke-width="5" stroke-linecap="round" class="mascot-tail"/>
          <!-- Feet -->
          <ellipse cx="40" cy="85" rx="7" ry="4" fill="#555"/>
          <ellipse cx="60" cy="85" rx="7" ry="4" fill="#555"/>
        </g>
      </svg>`,

    octopus: (size) => `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="mascot-svg">
        <g class="mascot-body">
          <!-- Head/body (dome) -->
          <ellipse cx="50" cy="40" rx="25" ry="22" fill="#9B59B6" class="mascot-head mascot-torso"/>
          <!-- Face patch -->
          <ellipse cx="50" cy="44" rx="16" ry="12" fill="#D7BDE2"/>
          <!-- Eyes -->
          <circle cx="42" cy="38" r="4" fill="white" class="mascot-eye-left"/>
          <circle cx="58" cy="38" r="4" fill="white" class="mascot-eye-right"/>
          <circle cx="43" cy="38" r="2.5" fill="#1A1A1A"/>
          <circle cx="59" cy="38" r="2.5" fill="#1A1A1A"/>
          <circle cx="43.5" cy="37" r="0.8" fill="white"/>
          <circle cx="59.5" cy="37" r="0.8" fill="white"/>
          <!-- Mouth -->
          <path d="M46,47 Q50,50 54,47" stroke="#7D3C98" fill="none" stroke-width="1.2" class="mascot-mouth"/>
          <!-- Tentacles (arms/legs) -->
          <path d="M30,55 Q22,70 28,82 Q30,85 32,82" stroke="#9B59B6" fill="none" stroke-width="5" stroke-linecap="round" class="mascot-arm-left"/>
          <path d="M38,58 Q32,72 35,84 Q37,87 39,84" stroke="#9B59B6" fill="none" stroke-width="5" stroke-linecap="round"/>
          <path d="M70,55 Q78,70 72,82 Q70,85 68,82" stroke="#9B59B6" fill="none" stroke-width="5" stroke-linecap="round" class="mascot-arm-right"/>
          <path d="M62,58 Q68,72 65,84 Q63,87 61,84" stroke="#9B59B6" fill="none" stroke-width="5" stroke-linecap="round"/>
          <path d="M46,60 Q44,75 46,86 Q47,88 48,86" stroke="#9B59B6" fill="none" stroke-width="4" stroke-linecap="round" class="mascot-tail"/>
          <path d="M54,60 Q56,75 54,86 Q53,88 52,86" stroke="#9B59B6" fill="none" stroke-width="4" stroke-linecap="round"/>
          <!-- Spots -->
          <circle cx="35" cy="32" r="2" fill="#D7BDE2" opacity="0.6"/>
          <circle cx="62" cy="30" r="2.5" fill="#D7BDE2" opacity="0.6"/>
          <circle cx="50" cy="26" r="1.8" fill="#D7BDE2" opacity="0.6"/>
        </g>
      </svg>`,

    monkey: (size) => `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" class="mascot-svg">
        <g class="mascot-body">
          <!-- Body -->
          <ellipse cx="50" cy="65" rx="20" ry="20" fill="#8B5E3C" class="mascot-torso"/>
          <!-- Belly -->
          <ellipse cx="50" cy="70" rx="13" ry="12" fill="#D4A574"/>
          <!-- Head -->
          <circle cx="50" cy="38" r="18" fill="#8B5E3C" class="mascot-head"/>
          <!-- Face -->
          <ellipse cx="50" cy="42" rx="13" ry="11" fill="#D4A574"/>
          <!-- Ears -->
          <circle cx="30" cy="36" r="7" fill="#8B5E3C" class="mascot-ear-left"/>
          <circle cx="30" cy="36" r="4" fill="#D4A574"/>
          <circle cx="70" cy="36" r="7" fill="#8B5E3C" class="mascot-ear-right"/>
          <circle cx="70" cy="36" r="4" fill="#D4A574"/>
          <!-- Eyes -->
          <circle cx="43" cy="37" r="3.2" fill="#F5EDE4" class="mascot-eye-left"/>
          <circle cx="57" cy="37" r="3.2" fill="#F5EDE4" class="mascot-eye-right"/>
          <circle cx="43.5" cy="37.2" r="2" fill="#3D2B1F"/>
          <circle cx="57.5" cy="37.2" r="2" fill="#3D2B1F"/>
          <circle cx="44" cy="36.5" r="0.7" fill="#F5EDE4"/>
          <circle cx="58" cy="36.5" r="0.7" fill="#F5EDE4"/>
          <!-- Nose -->
          <ellipse cx="50" cy="43" rx="4" ry="2.5" fill="#6B3F23"/>
          <circle cx="48" cy="43" r="1" fill="#1A1A1A"/>
          <circle cx="52" cy="43" r="1" fill="#1A1A1A"/>
          <!-- Mouth -->
          <path d="M46,47 Q50,50 54,47" stroke="#6B3F23" fill="none" stroke-width="1" class="mascot-mouth"/>
          <!-- Arms -->
          <ellipse cx="30" cy="62" rx="6" ry="12" fill="#8B5E3C" transform="rotate(-10 30 62)" class="mascot-arm-left"/>
          <ellipse cx="70" cy="62" rx="6" ry="12" fill="#8B5E3C" transform="rotate(10 70 62)" class="mascot-arm-right"/>
          <!-- Tail -->
          <path d="M72,75 Q85,68 88,55 Q90,48 85,52" stroke="#8B5E3C" fill="none" stroke-width="4" stroke-linecap="round" class="mascot-tail"/>
          <!-- Feet -->
          <ellipse cx="40" cy="85" rx="8" ry="4" fill="#6B3F23"/>
          <ellipse cx="60" cy="85" rx="8" ry="4" fill="#6B3F23"/>
        </g>
      </svg>`
  },

  render(type, size) {
    const renderer = this._svgs[type] || this._svgs.fox;
    return renderer(size);
  }
};
