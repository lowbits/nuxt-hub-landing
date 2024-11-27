import { existsSync, readFileSync, appendFileSync } from 'fs';
import { randomBytes } from 'crypto';

const envFile = '.env';
const secretKeyLine = 'SECRET_KEY=';

try {
    const envContent = existsSync(envFile) ? readFileSync(envFile, 'utf8') : '';

    if (!envContent.includes(secretKeyLine)) {
        const secretKey = randomBytes(32).toString('hex');
        const newLine = envContent ? '\n' : '';
        appendFileSync(envFile, `${newLine}${secretKeyLine}${secretKey}`);
        console.log('SECRET_KEY generated and added to .env');
    } else {
        console.log('SECRET_KEY already exists in .env');
    }
} catch (error) {
    console.error('Error setting up .env:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
}
