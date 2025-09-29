import { promises as fs } from 'fs';
import path from 'path';

// Server-only file-based database helper
// Note: This is for demo purposes only - in production, use a proper database

const DATA_DIR = path.join(process.cwd(), 'data');

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  mentor: string;
  duration: string;
  price: number;
  rating: number;
  studentsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'mentor' | 'admin';
}

// Atomic read operations
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Atomic write operations
async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// Course operations
export async function getCourses(): Promise<Course[]> {
  return readJsonFile<Course>('courses.json');
}

export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find(course => course.id === id) || null;
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find(course => course.slug === slug) || null;
}

export async function createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
  const courses = await getCourses();
  const newCourse: Course = {
    ...courseData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  courses.push(newCourse);
  await writeJsonFile('courses.json', courses);
  return newCourse;
}

// Review operations
export async function getReviews(): Promise<Review[]> {
  return readJsonFile<Review>('reviews.json');
}

export async function getReviewsByCourseId(courseId: string): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter(review => review.courseId === courseId);
}

export async function createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const reviews = await getReviews();
  const newReview: Review = {
    ...reviewData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  reviews.push(newReview);
  await writeJsonFile('reviews.json', reviews);
  return newReview;
}

// User operations
export async function getUsers(): Promise<User[]> {
  return readJsonFile<User>('users.json');
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(user => user.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(user => user.id === id) || null;
}

// Search and filter operations
export async function searchCourses(query: string, filters?: {
  level?: string;
  language?: string;
  mentor?: string;
}): Promise<Course[]> {
  const courses = await getCourses();
  
  let filteredCourses = courses;
  
  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.mentor.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply filters
  if (filters?.level) {
    filteredCourses = filteredCourses.filter(course => course.level === filters.level);
  }
  
  if (filters?.language) {
    filteredCourses = filteredCourses.filter(course => course.language === filters.language);
  }
  
  if (filters?.mentor) {
    filteredCourses = filteredCourses.filter(course => 
      course.mentor.toLowerCase().includes(filters.mentor!.toLowerCase())
    );
  }
  
  return filteredCourses;
}
