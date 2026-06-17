# Nuxt 3 Clean Architecture Skeleton

A production-ready Nuxt 3 application skeleton following Clean Architecture principles.

## 🎯 Project Goal

This is a complete CRUD application for managing users with a modern, scalable architecture.

## 🛠️ Tech Stack

- **Nuxt 3** - The Vue framework for production
- **TypeScript** - Strict mode enabled
- **Pinia** - State management
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Folder Structure

```
src/
├── app/
│   ├── features/
│   │   └── users/
│   │       ├── composables/
│   │       │   └── useUsers.ts               # Vue composable hook
│   │       │
│   │       ├── repositories/
│   │       │   └── user.repository.ts        # User data access layer
│   │       │
│   │       ├── stores/
│   │       │   └── user.store.ts             # Pinia state management
│   │       │
│   │       └── use-cases/
│   │           ├── get-users.ts          # Get all users use case
│   │           ├── create-user.ts        # Create user use case
│   │           ├── update-user.ts        # Update user use case
│   │           └── delete-user.ts        # Delete user use case  
│   │       
│   └── shared/
│       └── api.ts                    # Centralized HTTP service
│   
├── domain/
│   └── users
│       ├── models/
│       │   └── user.model.ts             # User domain model
│       │
│       └── interfaces/
│           └── user.repository.interface.ts  # Repository contract
│
├── components/
│   └── users/
│       ├── UserForm.vue              # Create/edit form
│       ├── UserTable.vue             # Users list table
│       └── UserRow.vue               # Table row component
│
├── pages/
│   └── users/
│       └── index.vue                 # Users management page
│
├── assets/
│   └── css/
│       └── main.css                  # Global styles
│
└── types/                            # TypeScript type definitions
    └── api.types.ts
```

## 🏗️ Clean Architecture Layers

### 1. **Presentation Layer** (Pages & Components)
- Vue components and pages
- Handles user interactions
- Uses composables for state management

### 2. **Pinia Store** (State Management)
- Manages application state
- Uses use cases for operations
- Handles loading and error states

### 3. **Use Cases** (Business Logic)
- Encapsulates business rules
- Independent from frameworks
- Receives dependencies through injection

### 4. **Repositories** (Data Access)
- Implements data access contracts
- Maps responses to domain models
- Communicates with HTTP service

### 5. **Infrastructure** (HTTP Service)
- Centralized Axios instance
- Request/response interceptors
- Error handling and logging

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 📝 API Configuration

The backend API base URL is configured in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: 'http://localhost:3001'
  }
}
```

Change this to your backend URL as needed.

## 📡 Available Endpoints

The application communicates with the following API endpoints:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## 🎨 UI Features

- Modern dashboard-like interface
- Responsive design (mobile-friendly)
- Form validation
- Loading states
- Error handling
- Success messages
- Delete confirmation modal
- Smooth transitions

## 📚 Development Guidelines

### SOLID Principles

- **Single Responsibility**: Each class/file has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Implementations can replace interfaces
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions

### Clean Architecture Rules

- Pages never call Axios directly
- Components never call Axios directly
- Components don't contain business logic
- Stores don't contain HTTP implementation details
- Repositories don't depend on Vue or Pinia
- Use cases encapsulate all business logic
- Every layer has a single responsibility

### Code Style

- TypeScript strict mode enabled
- No `any` types
- All comments in English
- Meaningful variable and function names
- Comprehensive documentation

## 🔧 Adding New Features

To add a new entity (e.g., Products):

1. Create domain model: `domain/models/product.model.ts`
2. Create repository interface: `domain/interfaces/product.repository.interface.ts`
3. Create repository implementation: `app/repositories/product.repository.ts`
4. Create use cases: `app/use-cases/products/`
5. Create Pinia store: `app/stores/product.store.ts`
6. Create composable: `app/composables/useProducts.ts`
7. Create components: `components/products/`
8. Create page: `pages/products/index.vue`

## 📖 Documentation

Every file includes detailed comments explaining:

- File purpose and responsibility
- Layer role in Clean Architecture
- Business logic and data flow
- Important decisions and patterns

## 🤝 Best Practices

- Always use TypeScript types
- Avoid prop drilling (use composables)
- Keep components pure and presentational
- Use composition API for reusable logic
- Test business logic (use cases)
- Handle errors gracefully
- Provide user feedback (loading, success, error states)

## 🎓 Learning Resources

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Pinia Documentation](https://pinia.vuejs.org)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using Nuxt 3 and Clean Architecture principles**
