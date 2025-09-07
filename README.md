# Mini Mart Frontend

A modern React application built with Vite for Mini Mart e-commerce platform.

## 🚀 Features

- **Modern React 18** with hooks and functional components
- **Vite** for fast development and building
- **SCSS Modules** for component-scoped styling
- **React Router DOM** for client-side routing
- **Formik & Yup** for form handling and validation
- **Axios** for API communication
- **PropTypes** for component prop validation
- **Error Boundaries** for error handling
- **Custom Hooks** for reusable business logic

## 📁 Project Structure

```
src/
├── apis/              # API services and HTTP client
├── assets/            # Static assets (styles, icons, images)
│   ├── icons/
│   ├── images/
│   └── styles/
├── components/        # Reusable UI components
│   ├── Button/
│   ├── Layout/
│   └── ErrorBoundary/
├── constants/         # Application constants
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── pages/             # Page components
│   ├── Admin/
│   ├── HomePage/
│   └── Login/
├── routers/           # Route configurations
├── utils/             # Utility functions
├── validations/       # Form validation schemas
├── App.jsx
└── main.jsx
```

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minimart-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Development Guidelines

### Code Style
- Use functional components with hooks
- Implement PropTypes for all components
- Use SCSS modules for styling
- Follow the established folder structure
- Use absolute imports with @ alias

### Component Guidelines
- Keep components small and focused
- Use React.memo for performance optimization
- Extract business logic into custom hooks
- Use constants for static values
- Implement proper error handling

### Form Handling
- Use Formik for complex forms
- Validate with Yup schemas
- Extract validation schemas to separate files
- Handle loading and error states

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔗 API Integration

The application communicates with a Spring Boot backend through:
- `apiPublic` - For public endpoints (login, register)
- `apiPrivate` - For authenticated endpoints with automatic token handling

## 🎨 Styling

- SCSS modules for component-scoped styles
- Global styles in `assets/styles/`
- CSS variables for consistent theming
- Responsive design patterns

## 🔒 Authentication

- JWT token-based authentication
- Automatic token refresh
- Protected routes
- Cookie-based token storage

## 🚦 Error Handling

- Error boundaries for component errors
- API error handling with user feedback
- Form validation errors
- Network error handling

## 📱 Responsive Design

- Mobile-first approach
- Flexible layouts
- SCSS mixins for common patterns

## 🧪 Best Practices

- Component composition over inheritance
- Custom hooks for business logic
- Constants for magic numbers/strings
- PropTypes for type checking
- Error boundaries for error handling
- Memoization for performance
