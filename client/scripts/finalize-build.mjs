import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve(process.cwd(), 'build/client');
await copyFile(resolve(output, '404/index.html'), resolve(output, '404.html'));
