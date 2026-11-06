import { existsSync, readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf-8'));
const filePath = input?.tool_input?.file_path || '';

if (/\.test\.(ts|tsx)$/.test(filePath) && existsSync(filePath)) {
  console.error(
    `BLOCKED: ${filePath} is an existing test file. You are not allowed to edit existing tests!`
  );
  process.exit(2);
}

process.exit(0);
