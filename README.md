# Al-Suwaihli Club Platform

A comprehensive web platform for the Al-Suwaihli Sports, Cultural, and Social Club in Misrata, Libya. This platform serves as both a public-facing website and an administrative control panel for managing club activities, members, and content.

## 🎯 Project Purpose

The Al-Suwaihli Club Platform is designed to modernize and streamline club operations through:

### **Public Website Features**
- **Club Information**: Display club history, mission, and values
- **Sports Activities**: Showcase various sports teams, schedules, and achievements
- **Cultural Events**: Promote cultural programs and community activities
- **Social Engagement**: Share news, announcements, and community updates
- **Member Portal**: Allow members to access club services and information
- **Multi-language Support**: Full Arabic and English localization

### **Administrative Control Panel**
- **Content Management**: Create, edit, and publish content across the website
- **Member Management**: Handle member registrations, profiles, and permissions
- **Event Planning**: Organize and manage sports events, cultural programs, and social activities
- **Financial Oversight**: Track membership fees, event costs, and club finances
- **User Role Management**: Assign different permission levels to staff and volunteers
- **Analytics Dashboard**: Monitor website traffic and engagement metrics

## 🏗️ Architecture & Features

### **Multi-language Support**
- **Primary Languages**: Arabic (RTL) and English (LTR)
- **Dynamic Content**: All content can be managed in both languages
- **Localized URLs**: Clean URL structure for each language (`/ar/`, `/en/`)
- **Cultural Adaptation**: Proper Arabic typography and layout support

### **Responsive Design**
- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Desktop Compatible**: Full-featured desktop experience
- **Cross-Browser Support**: Works across all modern browsers
- **Accessibility**: WCAG compliant for inclusive user experience

### **Role-Based Access Control**
The platform implements a hierarchical permission system:

#### **Super Administrator**
- **Full System Control**: Complete access to all features and settings
- **User Management**: Create, modify, and delete all user accounts
- **System Configuration**: Modify core settings and integrations
- **Backup & Security**: Manage data backups and security protocols

#### **Content Managers**
- **Website Content**: Manage pages, articles, and media content
- **Event Management**: Create and manage club events and activities
- **News & Announcements**: Publish club news and updates
- **Media Library**: Upload and organize photos, videos, and documents

#### **Member Coordinators**
- **Member Registration**: Process new member applications
- **Member Profiles**: Update member information and status
- **Communication**: Send newsletters and notifications to members
- **Membership Reports**: Generate membership statistics and reports

#### **Sports Coordinators**
- **Team Management**: Manage sports teams and player rosters
- **Schedule Management**: Create match schedules and training sessions
- **Results Tracking**: Record match results and statistics
- **Sports News**: Publish sports-related content and updates

#### **Financial Officers**
- **Payment Tracking**: Monitor membership fees and payments
- **Expense Management**: Track club expenses and budgets
- **Financial Reports**: Generate financial statements and reports
- **Invoice Management**: Create and send invoices to members

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15.4.6 with React 19
- **Styling**: Tailwind CSS 4.1.12 with custom components
- **UI Components**: Radix UI for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Animations**: Custom CSS animations and transitions

### **Internationalization**
- **Library**: next-intl for robust i18n support
- **Features**: Dynamic locale routing, message interpolation, date/time formatting
- **RTL Support**: Full right-to-left layout support for Arabic

### **State Management**
- **Server State**: TanStack Query for server state management
- **Client State**: React hooks and context for local state
- **Form Handling**: React Hook Form with Zod validation

### **Database & Backend**
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL for reliable data storage
- **API**: Hono.js for lightweight API routes

### **Development Tools**
- **Language**: TypeScript for type safety
- **Package Manager**: Bun for fast package management
- **Linting**: ESLint for code quality
- **Styling**: PostCSS for CSS processing

## 📁 Project Structure

\`\`\`
├── messages/              # Internationalization messages
│   ├── ar.json           # Arabic translations
│   └── en.json           # English translations
├── public/               # Static assets
│   ├── assets/           # Images and media files
│   └── Al-Swihli_Misratah.png # Club logo
├── src/
│   ├── app/
│   │   └── [locale]/     # Localized routes
│   ├── components/
│   │   ├── providers/    # React context providers
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization configuration
│   ├── lib/              # Utility functions
│   ├── middleware.ts     # Next.js middleware for i18n
│   └── routes.ts         # Route definitions and permissions
\`\`\`

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ or Bun
- PostgreSQL database
- Git

### **Installation**

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd al-suwaihli-club-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   bun install
   # or
   npm install
   \`\`\`

3. **Environment setup**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials and settings
   \`\`\`

4. **Database setup**
   \`\`\`bash
   bun run db:push
   # or
   npm run db:push
   \`\`\`

5. **Start development server**
   \`\`\`bash
   bun dev
   # or
   npm run dev
   \`\`\`

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint

## 🌐 Localization

The platform supports dynamic language switching:

- **Arabic**: `http://localhost:3000/ar`
- **English**: `http://localhost:3000/en`

### **Adding Translations**
1. Update `messages/ar.json` for Arabic content
2. Update `messages/en.json` for English content
3. Use the `useTranslations` hook in components

## 🔐 Authentication & Authorization

The platform uses a role-based access control system:

- **Public Routes**: Accessible to all visitors
- **Member Routes**: Require user authentication
- **Admin Routes**: Require administrative privileges
- **Protected API**: Secure API endpoints with proper authorization

## 📊 Admin Dashboard Features

### **Dashboard Overview**
- Member statistics and growth metrics
- Recent activities and notifications
- Quick action buttons for common tasks
- System health and performance indicators

### **Content Management**
- WYSIWYG editor for rich content creation
- Media library with drag-and-drop upload
- SEO optimization tools
- Content scheduling and publishing

### **Member Management**
- Advanced member search and filtering
- Bulk operations for member data
- Membership renewal tracking
- Communication tools for member outreach

### **Event Management**
- Calendar view for event scheduling
- Registration management for events
- Automated email notifications
- Event analytics and reporting

## 🎨 Design System

The platform follows a consistent design system:

- **Typography**: Almarai font family for Arabic and English
- **Color Scheme**: Club brand colors with accessibility compliance
- **Components**: Modular, reusable UI components
- **Responsive Grid**: Flexible layout system for all screen sizes

## 🔧 Development Guidelines

### **Code Standards**
- TypeScript strict mode enabled
- ESLint and Prettier for code formatting
- Component-driven development approach
- Comprehensive error handling

### **Performance**
- Server-side rendering (SSR) for optimal loading
- Image optimization and lazy loading
- Code splitting and bundle optimization
- Caching strategies for better performance

### **Security**
- Input validation and sanitization
- CSRF protection
- Rate limiting on API endpoints
- Secure authentication flow

## 📈 Future Enhancements

- **Mobile App**: React Native mobile application
- **Payment Gateway**: Online payment processing
- **Live Streaming**: Integration for live event streaming
- **Advanced Analytics**: Detailed user behavior analytics
- **Social Integration**: Social media platform integration
- **Email Marketing**: Advanced email marketing tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Submit a pull request

## 📄 License

This project is proprietary to Al-Suwaihli Sports, Cultural, and Social Club.

## 📞 Support

For technical support or questions about the platform:
- **Email**: [club-email@example.com]
- **Phone**: [club-phone-number]
- **Address**: Al-Suwaihli Club, Misrata, Libya

---

**Al-Suwaihli Club Platform** - Modernizing club management for the digital age.
