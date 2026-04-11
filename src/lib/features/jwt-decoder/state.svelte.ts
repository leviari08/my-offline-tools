const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJhZG1pbiI6dHJ1ZX0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

import jwt from 'jsonwebtoken';

function verifyWithJsonWebToken(token: string, secret: string): boolean {
	try {
		if (!token || !secret) return false;
		jwt.verify(token, secret);
		return true;
	} catch (e) {
		return false;
	}
}

class JwtDecoderState {
	encodedToken = $state(DEFAULT_JWT);
	secret = $state('');
	isVerified = $state<boolean | null>(null);

	decoded = $derived.by(() => {
		try {
			if (!this.encodedToken) return null;
			const decoded = jwt.decode(this.encodedToken, { complete: true });
			if (!decoded) return null;
			return {
				header: decoded.header,
				payload: decoded.payload,
				signature: decoded.signature
			};
		} catch (e) {
			return null;
		}
	});

	runVerification() {
		if (!this.encodedToken || !this.secret) {
			this.isVerified = null;
			return;
		}

		this.isVerified = verifyWithJsonWebToken(this.encodedToken, this.secret);
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
