import { authService } from '@/services/authService.js';
import { userService } from '@/services/userService.js';
import { roleService } from '@/services/roleService.js';
import { auditService } from '@/services/auditService.js';
import { databaseAdminService } from '@/services/databaseAdminService.js';
import { ROLE_TEMPLATES } from '@/constants/permissions.js';
import { hashPassword } from '@/utils/crypto.js';
import { nowISO } from '@/utils/id.js';
import { ok, fail } from '@/utils/result.js';

export const authLogic = {
  // Ensure roles exist. Idempotent; safe to call on boot.
  async ensureSeeded() {
    try {
      // Universal install step: make sure the active provider's collections/
      // tables exist before we seed into them. On `local` this creates the blob
      // arrays; on lazy backends (mongo/firebase) it's a reachability check; on
      // supabase it surfaces any tables that still need their one-time SQL.
      try { await databaseAdminService.ensureSchema({ coreOnly: true }); }
      catch { /* never block boot on a migration probe */ }

      const roles = await roleService.list();
      if (!roles.length) {
        for (const tpl of Object.values(ROLE_TEMPLATES)) {
          if (tpl.code === 'custom') continue;
          await roleService.create({
            id: `role_${tpl.code}`,
            code: tpl.code,
            name: tpl.name,
            description: tpl.description,
            permissions: tpl.permissions,
            all: !!tpl.all,
            inheritsHierarchy: true,
            system: true,
            status: 'Active',
            createdAt: nowISO(),
          });
        }
      }
      return ok({ seeded: true });
    } catch (e) {
      return fail(e);
    }
  },

  async bootstrapAdmin({ name, email, password }) {
    try {
      const users = await userService.list();
      if (users.length > 0) {
        return fail('System is already bootstrapped. Super admin already exists.');
      }
      if (!email || !password || !name) {
        return fail('Name, email, and password are required.');
      }

      // 1. Create Supabase Auth user (required for remote providers)
      console.log('[Bootstrap] create auth user start');
      console.log('[Bootstrap] signup email:', email);
      console.log('[Bootstrap] signup password length:', password.length);
      let userId = 'user_superadmin';
      let emailConfirmed = false;
      try {
        const authUser = await authService.signUp(email.toLowerCase(), password);
        console.log('[Bootstrap] signup success, authUser:', JSON.stringify(authUser));
        if (authUser && authUser.id) {
          userId = authUser.id;
          emailConfirmed = !!authUser.email_confirmed_at;
          console.log('[Bootstrap] auth user id:', userId, 'email_confirmed_at:', authUser.email_confirmed_at);
        }
      } catch (authErr) {
        console.warn('[Bootstrap] create auth user failed:', authErr.message);
        return fail(`Failed to create auth account: ${authErr.message}. Ensure Supabase Auth sign-ups are enabled (Settings → Authentication → Sign up).`);
      }

      // 2. If email confirmation is required, don't attempt auto-login
      if (!emailConfirmed) {
        console.log('[Bootstrap] email confirmation required — skipping auto-login');
        return ok({
          user: { id: userId, email, name },
          emailConfirmationRequired: true,
          message: 'Account created successfully. Please confirm your email before logging in.',
        });
      }

      // 3. Create application user record
      console.log('[Bootstrap] create application user start');
      const { salt, hash } = await hashPassword(password);
      const user = await userService.create({
        id: userId,
        name,
        email: email.toLowerCase(),
        username: email.split('@')[0].toLowerCase(),
        roleCode: 'super_admin',
        status: 'Active',
        extraRoles: [],
        grants: [],
        denies: [],
        salt,
        passwordHash: hash,
        createdAt: nowISO(),
      });
      console.log('[Bootstrap] application user created:', user?.id);

      // 4. Auto-login to verify credentials
      console.log('[Bootstrap] auto login start');
      console.log('[Bootstrap] signin email:', email);
      console.log('[Bootstrap] signin password length:', password.length);
      const signInResult = await this.login(email.toLowerCase(), password);
      console.log('[Bootstrap] signin result ok:', signInResult?.ok);
      if (!signInResult.ok) {
        console.warn('[Bootstrap] auto login failed:', signInResult.error);
        return fail(`Bootstrap succeeded, but sign in failed: ${signInResult.error}`);
      }
      console.log('[Bootstrap] auto login succeeded');
      return ok({ session: signInResult.data.session, user: signInResult.data.user });
    } catch (e) {
      console.error('[Bootstrap] bootstrapAdmin error:', e);
      return fail(e);
    }
  },

  async login(identifier, password) {
    try {
      const { session, user } = await authService.signIn(identifier, password);
      await auditService.record({ action: 'auth.login', user, details: `Signed in (${identifier})` });
      return ok({ session, user });
    } catch (e) {
      return fail(e);
    }
  },

  async logout(user) {
    await authService.signOut();
    await auditService.record({ action: 'auth.logout', user, details: 'Signed out' });
    return ok(true);
  },

  async restore() {
    try {
      const result = await authService.getSession();
      return ok(result); // null when no active session
    } catch (e) {
      return fail(e);
    }
  },

  async forgotPassword(identifier) {
    try {
      return ok(await authService.requestPasswordReset(identifier));
    } catch (e) {
      return fail(e);
    }
  },
};

export default authLogic;
