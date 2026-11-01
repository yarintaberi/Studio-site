import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One markdown file per dress in src/content/dresses. A CMS can edit these later.
const dresses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dresses' }),
  schema: z.object({
    name: z.string(),
    nameHe: z.string(),
    category: z.enum(['bridal', 'evening']),
    cover: z.string(),
    photos: z.array(z.string()),
    fabric: z.string().optional(),
    details: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { dresses };
