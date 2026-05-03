import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const envPath = resolve('.env');
const outputPath = resolve('src/environments/environment.ts');

function parseEnvFile(path) {
  if (!existsSync(path)) {
    return {};
  }

  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return env;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '');

      if (key) {
        env[key] = value;
      }

      return env;
    }, {});
}

function normalizeUrl(value) {
  return value.replace(/\/+$/, '');
}

const fileEnv = parseEnvFile(envPath);
const apiBaseUrl = normalizeUrl(
  process.env.API_BASE_URL ?? fileEnv.API_BASE_URL ?? 'http://localhost:8080',
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `export const environment = {
  apiBaseUrl: ${JSON.stringify(apiBaseUrl)},
};
`,
);

console.log(`Generated ${outputPath}`);
