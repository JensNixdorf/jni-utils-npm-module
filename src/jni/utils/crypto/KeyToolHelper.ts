import { Engine } from "./JniCrypto";
import { Interface } from "readline";

export class KeyToolHelper {

    static keysExists(): boolean {
        try {
            new Engine();
            return true;
        }
        catch ( error ) {
            return false;
        }
    }

    static createKeys(passphrase: string): void{
        Engine.createSecrets(passphrase);
    }

    static encrypt( text: string): string {
        const encrypted = new Engine().shortEncryptToB64(text);
        return encrypted;
    }
    
    static decrypt( encrypted: string ): string {
        const decrypted = new Engine().shortDecryptFromB64( encrypted );
        return decrypted;
    }

    static headerLine(): void {
        console.info( `\n🔑  J N I   C R Y P T O  (${Engine.version})` );
        console.info( '-------------------------------\n' );
    }

    static clearScreen(): void {
        const lines = process.stdout.getWindowSize()[1];
        for(let i = 0; i < lines; i++) {
            console.log('\r\n');
        }
    }

    static pressAnyKeyToContinue( readline: Interface, callback: () => void ): void {
        console.info( '\nPress any key to continue...' );
        process.stdin.once('data', function () {
            readline.write('', { ctrl: true, name: 'u' });
            callback();
        });
    }
}