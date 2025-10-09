// src/index.ts
/**
 * Main entry point for RingSignature
 */

import { RingSignature } from './ringsignature';
import minimist from 'minimist';

interface Args {
    /**
     * Enable verbose mode for detailed output
     */
    verbose?: boolean;
    /**
     * Input file path
     */
    input?: string;
    /**
     * Output file path
     */
    output?: string;
}

const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main execution function
 */
async function main(): Promise<void> {
    try {
        // Create RingSignature instance with verbose mode
        const app = new RingSignature({
            verbose: args.verbose || false
        });

        // Log start message if verbose mode is enabled
        if (args.verbose) {
            console.log('Starting RingSignature processing...');
        }

        // Execute RingSignature processing
        const result = await app.execute();
        
        // Log output file path if provided
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        // Log completion message
        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        // Log error and exit with non-zero status code
        console.error('Error:', error);
        process.exit(1);
    }
}

// Check if this is the main module and run main function
if (require.main === module) {
    main();
}