import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILENAME = "known_phrases.json";
const READABLE_FOLDER = "live_readable";
const READABLE_SUFFIX = ".readable.json";

/**
 * Aggregates labels by locale from live_metadata.json and all referenced JSON files
 * @param {string} masterFilePath - absolute or relative path to live_metadata.json
 */
async function aggregateLabels(masterFilePath) {
    const finalLabels = new Set(); // { locale: [labels...] }

    try {
        // Resolve master file relative to script location
        const masterPath = path.resolve(__dirname, masterFilePath);

        // 1️⃣ Read live_metadata.json
        const masterDataRaw = await readFile(masterPath, 'utf-8');
        const masterData = JSON.parse(masterDataRaw);

        for (const item of masterData) {
            if (!item.url) continue;

            // 2️⃣ Resolve URL relative to master file
            const jsonPath = path.resolve(path.dirname(masterPath), item.url);

            // 3️⃣ Read each referenced JSON
            console.log("working on", jsonPath)
            let contentRaw = await readFile(jsonPath, 'utf-8');
            contentRaw = contentRaw.replace(/^\uFEFF/, '').trim();
            const content = JSON.parse(contentRaw);

            // 4️⃣ Extract grids
            const grids = content.grids || [];
            for (const grid of grids) {
                const elements = grid.gridElements || [];
                for (const el of elements) {
                    const labelObj = el.label || {};
                    for (let text of Object.values(labelObj)) {
                        text = normalizeText(text);
                        if (text) {
                            finalLabels.add(text);
                        }
                    }
                }
            }
        }

        return Array.from(finalLabels).sort();
    } catch (err) {
        console.error('Error aggregating labels:');
    }
}

// Example usage
(async () => {
    // live_metadata.json is assumed to be in the parent folder of scripts/
    const masterFile = '../live_metadata.json';
    const result = await aggregateLabels(masterFile);

    fs.writeFileSync(path.join(__dirname, "..", OUTPUT_FILENAME), JSON.stringify(result));
    fs.writeFileSync(path.join(__dirname, "..", READABLE_FOLDER, OUTPUT_FILENAME + READABLE_SUFFIX), JSON.stringify(result, null, 2));
})();

/**
 * Normalize a string for hashing / known phrases
 * - trims leading/trailing whitespace
 * - lowercases everything
 * - unifies accents / diacritics
 * - removes duplicate spaces
 * - keeps only letters and numbers (Unicode-aware)
 * @param {string} text
 * @returns {string} normalized text
 */
function normalizeText(text) {
    if (typeof text !== 'string') return '';

    // 1. Canonical Unicode form (compatibility + width normalization)
    let normalized = text
        .normalize('NFKC')
        .trim()
        .toLowerCase();

    // 2. Decompose characters so accents become removable marks
    normalized = normalized
        .normalize('NFKD')
        .replace(/\p{M}/gu, '');

    // 3. Keep only letters, numbers, and spaces (Unicode-aware)
    // \p{L} = any kind of letter, \p{N} = any kind of number
    // u flag = Unicode
    normalized = normalized.replace(/[^\p{L}\p{N}\s]/gu, '');

    // 4. Replace multiple spaces with single space
    normalized = normalized.replace(/\s+/g, ' ');

    // 5. Trim again just in case
    normalized = normalized.trim();

    return normalized;
}