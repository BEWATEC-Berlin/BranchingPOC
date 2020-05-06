const fs = require('fs');
const path = require('path');

const env = process.env;

fs.readdir('build', (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join('build', file), err => {
      if (err) throw err;
    });
  }


  const script = fs.readFileSync(path.join('src', 'branching-test.js'), 'utf-8');
  const newFile = `
const env = ${JSON.stringify(env)};
${script}
`;

  fs.writeFileSync(path.join('build', 'branching-test.js'), newFile);
});
