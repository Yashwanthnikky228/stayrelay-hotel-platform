import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';

test('public response module loads in native Node without the tsx resolver', () => {
  const source = new URL('../../apps/api/src/responses.ts', import.meta.url).href;
  const output = execFileSync(process.execPath, ['--input-type=module', '-e', `const {getApiReply}=await import(${JSON.stringify(source)});console.log(JSON.stringify([getApiReply('/health','GET').status,getApiReply('/properties','GET').status,getApiReply('/account','GET').status]))`], { encoding: 'utf8', env: { ...process.env, NODE_OPTIONS: '' } });
  assert.deepEqual(JSON.parse(output), [200, 503, 404]);
});
