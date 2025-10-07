import { z } from 'zod';

export const demoFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters')
    .trim(),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .toLowerCase()
    .trim(),
  
  phone: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\d\s\-\+\(\)]*$/, 'Phone number contains invalid characters')
    .optional()
    .or(z.literal('')),
  
  organization: z
    .string()
    .max(200, 'Organization name must be less than 200 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  
  organizationType: z
    .string()
    .max(50, 'Organization type must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  
  surveyNeeds: z
    .string()
    .max(1000, 'Survey needs must be less than 1000 characters')
    .trim()
    .optional()
    .or(z.literal('')),
});

export type DemoFormSchema = z.infer<typeof demoFormSchema>;


