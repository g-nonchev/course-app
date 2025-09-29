import { NextRequest, NextResponse } from 'next/server';
import { getCourses, createCourse, searchCourses } from '@/lib/mockDb';
import { createCourseSchema, courseFiltersSchema } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const level = searchParams.get('level') || undefined;
    const language = searchParams.get('language') || undefined;
    const mentor = searchParams.get('mentor') || undefined;

    courseFiltersSchema.parse({
      query,
      level: level as 'beginner' | 'intermediate' | 'advanced' | undefined,
      language,
      mentor,
    });

    let courses;
    if (query || level || language || mentor) {
      courses = await searchCourses(query, {
        level: level as 'beginner' | 'intermediate' | 'advanced' | undefined,
        language,
        mentor,
      });
    } else {
      courses = await getCourses();
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = createCourseSchema.parse(body);
    
    const newCourse = await createCourse(validatedData);
    
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
