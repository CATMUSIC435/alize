import { execSync } from 'node:child_process';
try {
  execSync('npm.cmd run db:migrate', { stdio: 'inherit' });
} catch {
  process.exit(1);
}
