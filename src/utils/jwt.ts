"use server";
import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET || 'fallback_secret_key_at_least_32_chars';
const key = new TextEncoder().encode(secret);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(key);
}

export async function decrypt(input: any): Promise<any> {
    try {
        if (!input || typeof input !== 'string' || input.split('.').length !== 3) {
            return null;
        }
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
