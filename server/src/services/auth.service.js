import authRepository from '../repositories/auth.repository.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
    async login(email, password) {
        const user = await authRepository.getUserByEmail(email);
        
        if (!user) {
            throw new AppError('Incorrect email or password', 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        
        if (!isPasswordValid) {
            throw new AppError('Incorrect email or password', 401);
        }

        const payload = {
            id: user.user_id,
            email: user.email,
            role: user.role_name,
            full_name: user.full_name
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'supersecret_fallback_key', {
            expiresIn: process.env.JWT_EXPIRES_IN || '24h'
        });

        return {
            user: payload,
            token
        };
    }
    
    async getMe(userId, email) {
        // Here we could query the database again if needed, 
        // but for now, the token payload is enough as per hackathon optimized plan.
        const user = await authRepository.getUserByEmail(email);
        if(!user){
            throw new AppError('User not found', 404);
        }
        return {
            id: user.user_id,
            email: user.email,
            role: user.role_name,
            full_name: user.full_name
        };
    }
}

export default new AuthService();
