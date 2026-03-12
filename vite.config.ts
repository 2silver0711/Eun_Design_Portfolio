import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Plugin to handle figma:asset virtual module scheme
function figmaAssetPlugin() {
  const VIRTUAL_PREFIX = 'figma:asset/';
  
  return {
    name: 'figma-asset-plugin',
    resolveId(id: string) {
      if (id.startsWith(VIRTUAL_PREFIX)) {
        return '\0' + id;
      }
    },
    load(id: string) {
      if (id.startsWith('\0' + VIRTUAL_PREFIX)) {
        // Extract the asset filename from the virtual module ID
        const assetFilename = id.slice(('\0' + VIRTUAL_PREFIX).length);
        // Map to actual file in src/assets/
        const assetPath = path.resolve(__dirname, 'src/assets', assetFilename);
        
        // Check if file exists
        if (fs.existsSync(assetPath)) {
          // Return import statement that Vite can process
          return `import asset from ${JSON.stringify(assetPath)}; export default asset;`;
        }
        
        // Fallback to placeholder if file not found
        return `export default "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="`;
      }
    }
  };
}

export default defineConfig({
  base: '/Eun_Design_Portfolio/',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})