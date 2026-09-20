// debug-env.js
import dotenv from 'dotenv';
dotenv.config();

const hardcoded = 'mongodb+srv://your-actual-uri-here'; // <-- paste the one that WORKS here
const fromEnv = process.env.MONGODB_URI;

console.log('=== ENV DEBUG ===');
console.log('from .env:', fromEnv);
console.log('hardcoded:', hardcoded);
console.log('');

// Check length
console.log('Length .env:', fromEnv ? fromEnv.length : 'UNDEFINED');
console.log('Length hardcoded:', hardcoded.length);

// Check for hidden quotes
console.log('Starts with quote?', fromEnv?.startsWith('"'));
console.log('Ends with quote?', fromEnv?.endsWith('"'));

// Check for spaces
console.log('Has leading space?', fromEnv?.startsWith(' '));
console.log('Has trailing space?', fromEnv?.endsWith(' '));

// Character-by-character diff (first 20 chars)
console.log('\n--- First 30 chars ---');
for (let i = 0; i < Math.min(30, hardcoded.length, fromEnv?.length || 0); i++) {
  const e = fromEnv[i];
  const h = hardcoded[i];
  const match = e === h ? '✅' : `❌ env='${e}' hard='${h}'`;
  console.log(`[${i}] ${match}`);
}

// URL parse check
try {
  const envUrl = new URL(fromEnv);
  console.log('\n✅ .env URI is valid URL');
  console.log('  Password in env:', envUrl.password ? '***present***' : 'EMPTY');
} catch (err) {
  console.log('\n❌ .env URI is NOT a valid URL:', err.message);
}

try {
  new URL(hardcoded);
  console.log('✅ Hardcoded URI is valid URL');
} catch (err) {
  console.log('❌ Hardcoded URI invalid:', err.message);
}