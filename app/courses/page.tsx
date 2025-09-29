import { Suspense } from 'react';
import { searchCourses } from '@/lib/mockDb';
import CourseCard from '@/components/CourseCard';
import CourseFilters from '@/components/CourseFilters';

interface CoursesPageProps {
  searchParams: Promise<{
    query?: string;
    level?: string;
    language?: string;
    mentor?: string;
  }>;
}

export const metadata = {
  title: 'All Courses - CourseHub',
  description: 'Browse our complete catalog of online courses taught by expert mentors.',
};

async function CoursesList({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const courses = await searchCourses(
    params.query || '',
    {
      level: params.level as 'beginner' | 'intermediate' | 'advanced' | undefined,
      language: params.language,
      mentor: params.mentor,
    }
  );

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or browse all courses.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function CoursesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-6 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CoursesPage({ searchParams }: CoursesPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-gray-600">
            Discover courses that match your learning goals and skill level.
          </p>
        </div>

        <div className="mb-8">
          <Suspense fallback={<div className="h-32 bg-gray-300 rounded-lg animate-pulse"></div>}>
            <CourseFilters />
          </Suspense>
        </div>

        <div className="mb-6">
          <Suspense fallback={<div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>}>
            <ResultsCount searchParams={searchParams} />
          </Suspense>
        </div>

        <Suspense fallback={<CoursesLoading />}>
          <CoursesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ResultsCount({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const courses = await searchCourses(
    params.query || '',
    {
      level: params.level as 'beginner' | 'intermediate' | 'advanced' | undefined,
      language: params.language,
      mentor: params.mentor,
    }
  );

  return (
    <p className="text-gray-600">
      Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
    </p>
  );
}
