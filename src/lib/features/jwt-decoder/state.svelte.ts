import { decodeJwt, decodeProtectedHeader, jwtVerify } from 'jose';

const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NzYzNTEiLCJuYW1lIjoiVGVzbGEiLCJraW5nIjp0cnVlLCJpYXQiOjE3NzUwMDg4MDB9.0PkDmDZ1G5iiRkyFl14G63Jd2G1qDzpYWfsnIzUODHA';
const DEFAULT_SECRET = 'a-string-secret-at-least-256-bits-long';

async function verifyWithJose(token: string, secret: string): Promise<boolean> {
	try {
		if (!token || !secret) return false;
		const secretUint8 = new TextEncoder().encode(secret);
		await jwtVerify(token, secretUint8);
		return true;
	} catch (e) {
		return false;
	}
}

class JwtDecoderState {
	encodedToken = $state(DEFAULT_JWT);
	secret = $state(DEFAULT_SECRET);
	isVerified = $state<boolean | null>(null);

	decoded = $derived.by(() => {
		try {
			if (!this.encodedToken) return null;
			// Extract header and payload using jose's light decoders
			const header = decodeProtectedHeader(this.encodedToken);
			const payload = decodeJwt(this.encodedToken);
			const parts = this.encodedToken.split('.');
			return {
				header,
				payload,
				signature: parts[2] || ''
			};
		} catch (e) {
			return null;
		}
	});

	async runVerification() {
		if (!this.encodedToken || !this.secret) {
			this.isVerified = null;
			return;
		}

		this.isVerified = await verifyWithJose(this.encodedToken, this.secret);
	}

	setToken(token: string) {
		this.encodedToken = token;
	}

	loadSample() {
		this.encodedToken = DEFAULT_JWT;
	}

	clear() {
		this.encodedToken = '';
		this.isVerified = null;
	}
}

export const jwtDecoderState = new JwtDecoderState();
