const Replicate = require('replicate');
const replicate = new Replicate({ auth: 'r8_VLzH1s1teujOvj6dZqTH6klaYiY8kZL3URKL0' });

replicate.models.get('black-forest-labs/flux-dev').then(model => {
  console.log('✅ Token valid! Model accessible:', model.owner + '/' + model.name);
}).catch(err => {
  console.error('❌ Token/MODEL ERROR:', err.message);
});
