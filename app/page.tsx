import { getCourses } from '@/lib/mockDb';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  const courses = await getCourses();
  const featuredCourses = courses.slice(0, 6); // Show first 6 courses as featured

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn from Expert Mentors
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover high-quality online courses and advance your skills with our comprehensive catalog of expert-led training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Teach on CourseHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Find Your Perfect Course
          </h2>
          <Suspense fallback={<div className="h-12 bg-gray-300 rounded-md animate-pulse"></div>}>
            <SearchBar placeholder="Search courses by title, mentor, or topic..." />
          </Suspense>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked courses from our expert mentors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {courses.length}+
              </div>
              <div className="text-xl text-gray-600">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {courses.reduce((sum, course) => sum + course.studentsCount, 0).toLocaleString()}+
              </div>
              <div className="text-xl text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                4.8
              </div>
              <div className="text-xl text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are already advancing their careers with our courses.
          </p>
          <Link
            href="/courses"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
