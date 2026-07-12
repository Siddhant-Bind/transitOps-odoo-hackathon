import authService from '../services/auth.service.js';

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getMe(req, res, next) {
        try {
            const result = await authService.getMe(req.user.id, req.user.email);
            res.status(200).json({
                success: true,
                message: 'User details retrieved successfully',
                data: { user: result }
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            // JWT logout is stateless on the backend. Just instruct the client.
            res.status(200).json({
                success: true,
                message: 'Logout successful'
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
