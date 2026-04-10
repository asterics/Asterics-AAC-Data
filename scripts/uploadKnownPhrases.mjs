import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.APP_URL || 'http://localhost:5555';
const INPUT_FILE = 'known_phrases.json';

// --api-key=<value> arg takes precedence over API_KEY env var
function resolveApiKey() {
    const arg = process.argv.find(a => a.startsWith('--api-key='));
    if (arg) return arg.slice('--api-key='.length);
    if (process.env.API_KEY) return process.env.API_KEY;
    return null;
}

async function getJwtToken(apiKey) {
    const response = await fetch(`${BASE_URL}/api/v1/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
    });
    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(`Authentication failed (${response.status}): ${err.error || response.statusText}`);
    }
    const { token } = await response.json();
    return token;
}

async function uploadPhrases() {
    try {
        const apiKey = resolveApiKey();
        if (!apiKey) {
            console.error('Error: No API key provided. Use --api-key=<key> or set the API_KEY environment variable. You can also use npm run phrases-upload -- --api-key=sk_adm_yourkey');
            process.exit(1);
        }

        console.log('Authenticating...');
        const token = await getJwtToken(apiKey);
        console.log('Authenticated.');

        const filePath = path.resolve(__dirname, '..', INPUT_FILE);
        console.log(`Reading phrases from: ${filePath}`);

        const fileContent = await fs.readFile(filePath, 'utf-8');
        const phrases = JSON.parse(fileContent);

        if (!Array.isArray(phrases)) {
            throw new Error('JSON file must contain an array of strings.');
        }

        console.log(`Sending ${phrases.length} phrases to the server...`);

        const response = await fetch(`${BASE_URL}/api/v1/tts/known-phrases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(phrases),
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok) {
            console.log('Success:', result.message || 'Phrases uploaded.');
        } else {
            console.error('Server Error:', result.error || response.statusText);
            process.exit(1);
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: ${INPUT_FILE} not found in the root directory.`);
        } else {
            console.error('Script Failed:', error.message);
        }
        process.exit(1);
    }
}

await uploadPhrases();