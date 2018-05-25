// @flow
'use strict';
const test = require('ava');
const path = require('path');
const spawn = require('spawndamnit');

const FIXTURE = path.join(__dirname, 'fixture.js');

async function run(env) {
  let res = await spawn('node', [FIXTURE], {
    env: Object.assign({}, {
      PATH: process.env.PATH,
    }, env),
  });
  return JSON.parse(res.stdout.toString());
}

test('nothin', async t => {
  t.is(await run({}), null);
});

test('partial', async t => {
  t.is(await run({
    CI_NODE_INDEX: 0
  }), null);
});

test('both', async t => {
  t.deepEqual(await run({
    CI_NODE_INDEX: 1,
    CI_NODE_TOTAL: 3,
  }), {
    index: 1,
    total: 3
  });
});
