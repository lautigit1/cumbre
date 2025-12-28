import { z } from 'zod';

/**
 * Schema de validación para refresh token
 */
export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, 'El refresh token es requerido'),
});

export type RefreshTokenDto = z.infer<typeof refreshTokenSchema>;
