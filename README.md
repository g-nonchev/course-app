# CourseHub - Mini Course Platform

A complete Next.js course platform built with App Router, TypeScript, Tailwind CSS, and next-auth.

## Features

### ✅ Core Functionality
- **Home Page**: Hero section with featured courses and search functionality
- **Courses Page**: Browse all courses with search and filtering capabilities
- **Course Detail Page**: Individual course pages with reviews and enrollment
- **Dashboard**: Protected mentor area for creating new courses
- **Authentication**: Login system with role-based access control
- **Reviews System**: Students can leave reviews and ratings for courses

### ✅ Technical Implementation
- **Next.js App Router**: Modern routing with server components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Responsive, modern UI design
- **next-auth**: Authentication with credentials provider
- **Zod**: Form validation and API schema validation
- **Mock Database**: File-based JSON storage for demo purposes

### ✅ Bonus Features
- **Legacy Page**: `/pages/legacy-courses.tsx` with `getServerSideProps`
- **Middleware Protection**: Automatic redirects for protected routes
- **SEO Optimized**: OpenGraph and Twitter meta tags
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Image Optimization**: Next.js Image component with external image support

## Project Structure

```
course-app/
├── app/                          # App Router pages
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   ├── courses/              # Course API endpoints
│   │   └── reviews/              # Review API endpoints
│   ├── courses/                  # Course pages
│   │   ├── [slug]/              # Dynamic course pages
│   │   └── page.tsx             # Courses listing
│   ├── dashboard/               # Protected dashboard
│   ├── login/                   # Authentication page
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── CourseCard.tsx           # Course display card
│   ├── SearchBar.tsx            # Search functionality
│   ├── ProtectedClient.tsx      # Auth wrapper component
│   ├── CourseFilters.tsx        # Course filtering
│   ├── ReviewsList.tsx          # Reviews display
│   └── AddReviewForm.tsx        # Review submission form
├── lib/                         # Utility libraries
│   ├── auth.ts                  # NextAuth configuration
│   ├── mockDb.ts                # File-based database helper
│   └── validation.ts            # Zod schemas
├── data/                        # Mock data files
│   ├── courses.json             # Course data
│   ├── reviews.json             # Review data
│   └── users.json               # User data
├── pages/                       # Legacy Pages Router
│   └── legacy-courses.tsx       # SSR example with getServerSideProps
├── types/                       # TypeScript definitions
│   └── next-auth.d.ts           # NextAuth type extensions
└── middleware.ts                # Route protection middleware
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

The application includes pre-configured demo accounts:

- **Student**: `alice@example.com` / `password123`
- **Mentor**: `john@example.com` / `mentor123`
- **Admin**: `admin@example.com` / `admin123`

## API Endpoints

### Courses
- `GET /api/courses` - List all courses (supports query parameters for search/filter)
- `POST /api/courses` - Create a new course (requires authentication)
- `GET /api/courses/[id]` - Get single course by ID

### Reviews
- `POST /api/reviews` - Create a new review (requires authentication)

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

## Key Features Explained

### Authentication & Authorization
- Uses next-auth with credentials provider
- Role-based access control (student, mentor, admin)
- Middleware protection for dashboard routes
- Session management with JWT

### Mock Database
- File-based JSON storage for demo purposes
- Atomic read/write operations using Node.js fs/promises
- Server-only database helper functions
- Easy to replace with real database (Prisma setup included)

### Form Validation
- Client-side validation with Zod schemas
- Server-side API validation
- Real-time error feedback
- Type-safe form handling

### SEO & Performance
- Server-side rendering for better SEO
- Next.js Image optimization
- OpenGraph and Twitter meta tags
- Responsive design with Tailwind CSS

## Development Notes

### Adding New Features
1. **New API Routes**: Add to `app/api/` directory
2. **New Pages**: Add to `app/` directory following App Router conventions
3. **New Components**: Add to `components/` directory
4. **Database Changes**: Update schemas in `lib/validation.ts` and mock data

### Database Migration
The current setup uses mock JSON files. To migrate to a real database:

1. Install Prisma: `npm install prisma @prisma/client`
2. Initialize Prisma: `npx prisma init`
3. Define schema in `prisma/schema.prisma`
4. Replace mock database calls with Prisma queries
5. Run migrations: `npx prisma migrate dev`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent color scheme (blue primary)
- Use semantic HTML elements for accessibility

## Production Deployment

### Environment Setup
```env
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://yourdomain.com
```

### Build & Deploy
```bash
npm run build
npm start
```

### Recommended Hosting
- **Vercel**: Optimized for Next.js applications
- **Netlify**: Great for static and serverless deployments
- **Railway**: Simple full-stack deployment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS