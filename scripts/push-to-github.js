// CityShield AI — GitHub Push Script
// Pushes the prepared local commit to https://github.com/krishadvaria/cityshield-ai using a GitHub token.

const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

async function pushToGitHub(token) {
  if (!token) {
    console.error('Error: GitHub Personal Access Token is required.');
    console.error('Usage: node scripts/push-to-github.js <YOUR_GITHUB_TOKEN>');
    process.exit(1);
  }

  const cleanToken = token.trim();
  const dir = path.resolve(__dirname, '..');
  console.log('Project root:', dir);

  console.log('Verifying local commit history...');
  const commits = await git.log({ fs, dir, depth: 2 });
  for (const c of commits) {
    console.log(` - [${c.oid.slice(0, 7)}] ${c.commit.message.trim()} (${c.commit.author.name})`);
  }

  console.log('\nPushing branch main to https://github.com/krishadvaria/cityshield-ai.git ...');

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      onAuth: () => ({
        username: cleanToken,
        password: ''
      })
    });

    console.log('\n Push successful!');
    console.log('Remote updated: https://github.com/krishadvaria/cityshield-ai');
    console.log('Details:', JSON.stringify(pushResult, null, 2));
  } catch (err) {
    console.error('\nPush failed:', err.message);
    if (err.data) console.error('Data:', err.data);
    process.exit(1);
  }
}

const tokenArg = process.argv[2] || process.env.GITHUB_TOKEN;
pushToGitHub(tokenArg);
