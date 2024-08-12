import moduleAlias from 'module-alias';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define specific aliases
moduleAlias.addAliases({
  '@config': path.join(__dirname, 'config'),
  '@env': path.join(__dirname, 'env'),
  '@middleware': path.join(__dirname, 'middleware'),
  '@routes': path.join(__dirname, 'routes'),
});

export default moduleAlias;
