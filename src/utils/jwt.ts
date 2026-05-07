import { jwtVerify, SignJWT } from 'jose';
import { createSecretKey } from 'crypto';
import env from '../../env.ts';

export interface JWTPayload {
    [key: string]: unknown;
    id: string;
    email: string;
    username: string;
}

export const generateToken = (payload: JWTPayload) => {
    const secretKey = generateSecretKey();

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
        .sign(secretKey);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const secretKey = generateSecretKey();
    const { payload } = await jwtVerify(token, secretKey);

    return payload as JWTPayload;
};

const generateSecretKey = () => {
    const secret = env.JWT_SECRET;
    return createSecretKey(secret, 'utf-8');
};
