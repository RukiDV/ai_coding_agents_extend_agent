import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf-8'));
const filePath = input?.tool_input?.file_path || '';

if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
  try {
    execSync('npm run check', { stdio: 'pipe' });
    process.exit(0); // Exit 0: Alles gut!
  } catch (error) {
    const stdout = error.stdout ? error.stdout.toString() : '';
    const stderr = error.stderr ? error.stderr.toString() : '';
    console.error(`Type check failed after editing ${filePath}:\n${stdout}\n${stderr}`);
    process.exit(2);
  }
}

process.exit(0);