const { clerkMiddleware, requireAuth, getAuth } = require('@clerk/express');
const AppError = require('../utils/AppError');
const userRepo = require('../repositories/user.repo');

module.exports = [
  clerkMiddleware(),
  requireAuth(),
  async (req, res, next) => {
    try {
      const auth = getAuth(req);
      const clerkUserId = auth?.userId;

      if (!clerkUserId) throw new AppError('Unauthorized', 401);

      let user = await userRepo.findByClerkId(clerkUserId);

      if (!user) {
        const claims = req.auth?.sessionClaims || {};
        const email = claims.email || claims.email_address || `${clerkUserId}@placeholder.local`;
        const name =
          claims.name ||
          [claims.first_name, claims.last_name].filter(Boolean).join(' ') ||
          'New User';

        user = await userRepo.createFromClerk({
          clerkUserId,
          name,
          email,
          role: 'DRIVER'
        });
      }

      req.user = {
        id: user.id,
        clerkUserId: user.clerk_user_id,
        email: user.email,
        role: user.role,
        name: user.name
      };

      next();
    } catch (err) {
      next(err);
    }
  }
];