# Administrative Notas App

This is a Next.js application for managing student grades, teachers, and courses. It provides a complete system for school administration, including user authentication, role management, and a comprehensive database structure.

## Project Structure

The project is organized into the following main directories:

-   **/src/app**: Contains the core application logic, including pages and API routes.
    -   **/src/app/(auth)/**: Authentication-related pages like login and registration.
    -   **/src/app/(home)/**: The main pages of the application after authentication.
    -   **/src/app/api/**: All the backend API routes for the application.
-   **/src/components**: Reusable React components used throughout the application.
-   **/src/lib**: Utility functions and libraries, including database connection setup.
-   **/src/styles**: Global styles and CSS configurations.
-   **/public**: Static assets like images and fonts.

## Key Technologies

-   **Framework**: [Next.js](https://nextjs.org/) - A React framework for building server-side rendered and static web applications.
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) - A complete open-source authentication solution for Next.js applications.
-   **Database**: [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/) - A collection of accessible and unstyled UI components.
-   **Form Management**: [React Hook Form](https://react-hook-form.com/) - A library for managing forms in React.
-   **Schema Validation**: [Zod](https://zod.dev/) - A TypeScript-first schema declaration and validation library.

## Database

The database schema is defined in the `tables.sql` file and includes the following tables:

-   `periodos_escolares`: School periods (e.g., 2023-2024).
-   `anos`: Academic years (e.g., 1st Year, 2nd Year).
-   `secciones`: Class sections (e.g., A, B, C).
-   `lapsos`: Grading periods (e.g., First Term, Second Term).
-   `materias`: School subjects (e.g., Math, History).
-   `usuarios`: Application users with login credentials.
-   `roles`: User roles (e.g., Administrator, Teacher).
-   `usuario_roles`: A join table for assigning roles to users.
-   `docentes`: Teachers, linked to the `usuarios` table.
-   `estudiantes`: Students.
-   `inscripciones`: Student enrollments in a school period.
-   `cursos`: Courses, linking subjects, teachers, and academic years.
-   `evaluaciones`: Evaluations for each course.
-   `notas`: Student grades for each evaluation.

## Authentication

Authentication is handled by NextAuth.js, with a credentials-based provider. The system supports two roles: `Admin` and `Docente` (Teacher). The authentication logic is defined in `src/auth.ts` and the API route is located at `src/app/api/auth/[...nextauth]/route.ts`.

## API Endpoints

The application exposes the following API endpoints:

-   `POST /api/auth/callback/credentials`: Handles user login.
-   `GET /api/auth/session`: Retrieves the current user session.
-   `GET /api/anos`: Retrieves the list of academic years.
-   `GET /api/estudiantes`: Retrieves the list of students.
-   `GET /api/materias`: Retrieves the list of subjects.
-   `GET /api/notas`: Retrieves student grades.
-   `GET /api/promedio`: Calculates and retrieves student averages.
-   `GET /api/secciones`: Retrieves the list of class sections.

## Available Pages

The application includes the following pages:

-   `/login`: The login page for users.
-   `/register`: The user registration page.
--   `/`: The main dashboard page.
-   `/años`: A page for managing academic years and sections.
-   `/estudiantes`: A page for managing students.
-   `/estudiantes/create`: A page for creating new students.
-   `/mis-materias`: A page for teachers to view their assigned subjects.

## Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```
# Database connection string
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth.js secret
NEXTAUTH_SECRET="your-nextauth-secret"
```

## Getting Started

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/administrative-notas-app.git
    ```
2.  **Install the dependencies:**
    ```bash
    pnpm install
    ```
3.  **Set up the database:**
    -   Make sure you have PostgreSQL installed and running.
    -   Create a new database and run the `tables.sql` script to create the tables.
4.  **Configure the environment variables:**
    -   Create a `.env.local` file and add the required environment variables.
5.  **Run the development server:**
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.