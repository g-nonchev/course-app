import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required').max(100, 'Slug must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be less than 1000 characters'),
  thumbnail: z.string().url('Thumbnail must be a valid URL'),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Level must be beginner, intermediate, or advanced'
  }),
  language: z.string().min(1, 'Language is required'),
  mentor: z.string().min(1, 'Mentor name is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  rating: z.number().min(0).max(5).default(0),
  studentsCount: z.number().min(0).default(0),
});

export const updateCourseSchema = createCourseSchema.partial();

export const createReviewSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  userName: z.string().min(1, 'User name is required'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().min(1, 'Comment is required').max(500, 'Comment must be less than 500 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'mentor', 'admin'], {
    message: 'Role must be student, mentor, or admin'
  }).default('student'),
});

export const courseFiltersSchema = z.object({
  query: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Level must be beginner, intermediate, or advanced'
  }).optional(),
  language: z.string().optional(),
  mentor: z.string().optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CourseFilters = z.infer<typeof courseFiltersSchema>;
