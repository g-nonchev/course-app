import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Course } from '@/lib/mockDb';

interface LegacyCoursesPageProps {
  courses: Course[];
}

// This is a legacy page using Pages Router with getServerSideProps
// Demonstrating server-side rendering with mock data
export default function LegacyCoursesPage({ courses }: LegacyCoursesPageProps) {
  const levelColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <Head>
        <title>Legacy Courses - CourseHub</title>
        <meta name="description" content="Legacy courses page using Pages Router with getServerSideProps" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  CourseHub
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Modern Courses
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Legacy Page
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      This page uses the legacy Pages Router with <code className="bg-yellow-100 px-1 rounded">getServerSideProps</code>.
                      The modern App Router version is available at <Link href="/courses" className="underline font-medium">/courses</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">Legacy Courses</h1>
            <p className="text-gray-600">
              Server-side rendered courses using getServerSideProps (Pages Router)
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{course.language}</span>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>by {course.mentor}</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      {course.studentsCount} students
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                  </div>
                  
                  <div className="mt-4">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-center block hover:bg-blue-700 transition-colors"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              This page demonstrates server-side rendering with getServerSideProps.
              <br />
              <Link href="/courses" className="text-blue-600 hover:text-blue-800 underline">
                View the modern App Router version
              </Link>
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">CourseHub</h3>
              <p className="text-gray-300 mb-4">
                Your gateway to quality online education.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 CourseHub. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Server-side rendering with getServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Import the mock database helper
    const { getCourses } = await import('@/lib/mockDb');
    
    // Fetch courses on the server
    const courses = await getCourses();
    
    return {
      props: {
        courses,
      },
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // Return empty courses array if there's an error
    return {
      props: {
        courses: [],
      },
    };
  }
};
