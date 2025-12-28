import { z } from 'zod';

export const configurarPreferenciasSchema = z.object({
  email: z.boolean().optional(),
  push: z.boolean().optional(),
  proyectos: z.boolean().optional(),
  inversiones: z.boolean().optional(),
  mensajes: z.boolean().optional(),
  sistema: z.boolean().optional(),
});

export class ConfigurarPreferenciasDto {
  email?: boolean = true;
  push?: boolean = true;
  proyectos?: boolean = true;
  inversiones?: boolean = true;
  mensajes?: boolean = true;
  sistema?: boolean = true;
}
