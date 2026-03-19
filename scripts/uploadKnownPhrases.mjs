import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Reconstruct __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:5555/tts/known-phrases';
const INPUT_FILE = 'known_phrases.json';

async function uploadPhrases() {
    try {
        // Resolve the path to the root directory
        const filePath = path.resolve(__dirname, '..', INPUT_FILE);

        console.log(`Reading phrases from: ${filePath}`);

        const fileContent = await fs.readFile(filePath, 'utf-8');
        const phrases = JSON.parse(fileContent);

        if (!Array.isArray(phrases)) {
            throw new Error('JSON file must contain an array of strings.');
        }

        console.log(`Sending ${phrases.length} phrases to the server...`);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phrases),
        });

        // Handle empty responses or non-JSON errors gracefully
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