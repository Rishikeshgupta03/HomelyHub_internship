console.log('=== ALL ENVIRONMENT VARIABLES ===');
Object.keys(process.env)
  .sort()
  .forEach((key) => {
    // Only show MongoDB-related or all vars — your choice
    if (key.toLowerCase().includes('mongo') || key.toLowerCase().includes('db') || key.toLowerCase().includes('uri')) {
      const val = process.env[key];
      console.log(`${key}=${val.substring(0, 20)}... (length: ${val.length})`);
    }
  });

console.log('\n=== ALL KEYS (for inspection) ===');
console.log(Object.keys(process.env).sort().join(', '));