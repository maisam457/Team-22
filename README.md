# Solution Overview

Team IMPACT is an organization that connects children with chronic disabilities to college sports teams, enriching their experiences and building lasting relationships. The main challenge is maintaining consistent engagement with alumni after they leave the program.

Our solution is a LinkedIn-style digital community platform where Team IMPACT members—children, athletes, and alumni—can connect, share, and support each other long-term.

### Key Features

- **Social Feed:** See ongoing events, updates, and posts from kids, athletes, and alumni. Members can share stories, achievements, and news, keeping everyone engaged and informed.
- **Direct Messaging:** Members can DM each other to maintain relationships and offer support.
- **Donation Requests:** Easily send and receive donation requests to support causes within the community.
- **AI-Powered Newsletters:** An AI feature analyzes the past 20 messages in each conversation and generates a monthly newsletter, automatically sent to alumni to keep them connected and informed.

This platform ensures that alumni remain active participants in the Team IMPACT community, fostering lasting bonds and ongoing engagement beyond their time in the program.

## Features

- **Personalized Feed**: AI-powered content curation based on shared interests, location, and relationships
- **Direct Messaging**: Real-time conversations between community members
- **Profile Management**: Comprehensive user profiles with interests, locations, and role-based access
- **Tag System**: Organize content by interests (sports, activities), diagnosis, and geography
- **Role-Based Access**: Support for Children, Athletes, and Alumni user types
- **Invite System**: Generate and share invitation links for new members

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React state with Zustand for complex state
- **Icons**: Lucide React
- **Data**: In-memory mock data (easily replaceable with database)
- **API**: Next.js route handlers with RESTful endpoints

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic for database schema management
- **Authentication**: Flask-based authentication system
- **API**: RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Python 3.8+ (for backend)
- PostgreSQL (for database)

### Frontend Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd team-impact-hub
```

2. Install frontend dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the frontend development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Installation

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

4. Install Python dependencies:

```bash
pip install -r requirements.txt
```

5. Set up environment variables:

Create a `.env` file in the repository root with:

```env
DATABASE_URL=your_database_url
FLASK_APP=main.py
FLASK_ENV=development
```

6. Initialize the database:

```bash
# Run database migrations
alembic upgrade head
```

7. Start the backend server:

```bash
python main.py
```

The backend API will be available at `http://localhost:5000`.

### Backend Dependencies

The backend uses the following Python packages (see `backend/requirements.txt`):

- **Flask 3.1.2** - Web framework
- **SQLAlchemy 2.0.43** - Database ORM
- **Alembic 1.16.5** - Database migrations
- **psycopg2-binary 2.9.10** - PostgreSQL adapter
- **Flask-CORS 6.0.1** - Cross-origin resource sharing
- **python-dotenv 1.1.1** - Environment variable management

## Project Structure

```
├── src/                   # Frontend (Next.js)
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API route handlers
│   │   │   ├── feed/route.ts         # Personalized feed
│   │   │   ├── posts/route.ts        # Create posts
│   │   │   ├── messages/route.ts     # Conversations
│   │   │   ├── users/me/route.ts     # User profile
│   │   │   └── invites/route.ts      # Invite system
│   │   ├── layout.tsx                # Root layout with navigation
│   │   ├── page.tsx                  # Feed/home page
│   │   ├── messages/page.tsx         # Direct messages
│   │   └── profile/page.tsx          # Profile management
│   ├── components/        # Reusable UI components
│   │   ├── Feed/                 # Feed-related components
│   │   ├── Messages/             # Messaging components
│   │   ├── Profile/              # Profile components
│   │   ├── Layout.tsx            # Main layout wrapper
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── Topbar.tsx           # Header with search
│   │   └── ui/                   # shadcn/ui components
│   ├── data/              # Mock data and seed files
│   │   ├── mockUsers.ts         # User data
│   │   ├── mockPosts.ts         # Posts data
│   │   ├── mockMessages.ts      # Messages data
│   │   └── mockTags.ts          # Tags and categories
│   └── lib/               # Utilities and types
│       ├── types.ts             # TypeScript definitions
│       ├── scoring.ts           # Personalization algorithm
│       └── utils.ts             # Helper functions
├── backend/               # Backend (Flask/Python)
│   ├── models/            # Database models
│   │   ├── child.py             # Child user model
│   │   ├── coach.py             # Coach user model
│   │   ├── student_athlete.py   # Student athlete model
│   │   ├── story.py             # Story model
│   │   └── conversations.py     # Messaging models
│   ├── logic/             # Business logic
│   │   └── alumni_transition.py # Alumni transition logic
│   ├── migrations/        # Database migrations
│   │   └── versions/            # Alembic migration files
│   ├── main.py           # Flask application entry point
│   ├── db.py             # Database configuration
│   ├── requirements.txt  # Python dependencies
│   └── alembic.ini       # Alembic configuration
```
