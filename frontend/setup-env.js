import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create .env.local file with default values
const envContent = `VITE_API_URL=http://localhost:5000/api`;

const envPath = path.join(__dirname, '.env.local');

fs.writeFileSync(envPath, envContent);

console.log('.env.local file created successfully at:', envPath);