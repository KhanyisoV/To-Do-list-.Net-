
# 📝 To-Do List Console App (.NET)

A simple **C# .NET Console Application** built to practice **Object-Oriented Programming (OOP)** and **SOLID principles**.

This project is intentionally small and simple, focusing on **clean code**, **separation of concerns**, and **good design practices** rather than UI.

---

## 🚀 Features

- Add a new to-do item
- View all to-do items
- Mark a to-do item as completed
- Remove a to-do item
- Console-based (no UI framework required)

---

## 🧠 Learning Goals

This project is designed to help beginners understand:

### Object-Oriented Programming
- Classes & Objects
- Encapsulation
- Abstraction
- Composition

### SOLID Principles
- **S – Single Responsibility Principle**
- **O – Open/Closed Principle**
- **D – Dependency Inversion Principle**

---

## 🏗️ Architecture
System Architecture
┌─────────────────┐         HTTP/REST API          ┌─────────────────┐
│                 │    ←─────────────────────→    │                 │
│  React Frontend │                               │  ASP.NET Core   │
│   (Port 3000)   │                               │   (Port 5000)   │
│                 │                               │                 │
└─────────────────┘                               └─────────────────┘
        │                                                  │
        │                                                  │
        ▼                                                  ▼
┌─────────────────┐                               ┌─────────────────┐
│  Axios API      │                               │   Controllers   │
│  Client         │                               │                 │
└─────────────────┘                               └─────────────────┘
                                                          │
                                                          ▼
                                                   ┌─────────────────┐
                                                   │    Services     │
                                                   │   (Business     │
                                                   │     Logic)      │
                                                   └─────────────────┘
                                                          │
                                                          ▼
                                                   ┌─────────────────┐
                                                   │  In-Memory      │
                                                   │  Data Store     │
                                                   └─────────────────┘
Frontend Architecture (React)
src/
├── components/
│   └── TodoList.jsx          # Main component with all UI logic
├── services/
│   └── todoApi.js            # API client service
└── App.js                    # Root component
Component Hierarchy:
App
└── TodoList
    ├── Header (with Progress Card)
    ├── Add Todo Card
    ├── Tasks List
    │   └── TaskCard (multiple instances)
    └── Footer
Backend Architecture (ASP.NET Core)
ToDoApp/
├── Controllers/
│   └── ToDoItemController.cs     # API endpoints
├── Services/
│   └── ToDoService.cs            # Business logic
├── Interfaces/
│   └── IToDoServices.cs          # Service contract
├── Models/
│   └── ToDoItem.cs               # Domain model
└── Program.cs                    # Application configuration
Design Pattern: Repository Pattern with Dependency Injection
🛠️ Tech Stack
Frontend

React 18.x - UI library
Lucide React - Icon library
Axios - HTTP client
CSS3 - Styling with animations

Backend

ASP.NET Core 6.0+ - Web API framework
C# - Programming language
In-Memory Storage - Data persistence

Development Tools

Node.js & npm - Frontend package management
.NET SDK - Backend development
Visual Studio Code / Visual Studio - IDEs

📁 Project Structure
TaskFlow/
│
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── TodoList.jsx
│   │   ├── services/
│   │   │   └── todoApi.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
└── backend/                     # ASP.NET Core API
    ├── Controllers/
    │   └── ToDoItemController.cs
    ├── Services/
    │   └── ToDoService.cs
    ├── Interfaces/
    │   └── IToDoServices.cs
    ├── Models/
    │   └── ToDoItem.cs
    ├── Program.cs
    └── ToDoApp.csproj
🚀 Getting Started
##Prerequisites

Node.js (v14 or higher)
.NET SDK (6.0 or higher)
npm or yarn

##Installation
1. Clone the Repository
bashgit clone https://github.com/yourusername/taskflow.git
cd taskflow
2. Backend Setup
bash# Navigate to backend directory
cd backend

# Restore dependencies
dotnet restore

# Run the API
dotnet run

# The API will start at http://localhost:5000
Verify Backend: Open http://localhost:5000/api/ToDoItem in your browser
3. Frontend Setup
bash# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

# The app will open at http://localhost:3000
Running Both Servers Simultaneously
Terminal 1 (Backend):
bashcd backend
dotnet run
Terminal 2 (Frontend):
bashcd frontend
npm start
📡 API Documentation
Base URL
http://localhost:5000/api/ToDoItem
Endpoints
1. Get All Tasks
httpGET /api/ToDoItem
Response:
json[
  {
    "id": 1,
    "name": "Complete project",
    "description": "Finish the todo app",
    "isCompleted": false,
    "dateCreated": "2025-01-06T10:00:00Z",
    "dateCompleted": "0001-01-01T00:00:00Z"
  }
]
2. Get Task by ID
httpGET /api/ToDoItem/{id}
Response:
json{
  "id": 1,
  "name": "Complete project",
  "description": "Finish the todo app",
  "isCompleted": false,
  "dateCreated": "2025-01-06T10:00:00Z",
  "dateCompleted": "0001-01-01T00:00:00Z"
}
3. Create Task
httpPOST /api/ToDoItem
Request Body:
json{
  "name": "New task",
  "description": "Task description",
  "isCompleted": false
}
Response: 201 Created with created task object
4. Update Task
httpPUT /api/ToDoItem/{id}
Request Body:
json{
  "name": "Updated task",
  "description": "Updated description",
  "isCompleted": true
}
Response: 200 OK with updated task object
5. Delete Task
httpDELETE /api/ToDoItem/{id}
Response: 204 No Content
Error Responses
json{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.4",
  "title": "Not Found",
  "status": 404
}
## 🎨 Design Decisions
Frontend Design
1. Black and White Theme

Chose a minimalist black and white color scheme for a clean, professional look
High contrast ensures excellent readability
Timeless design that won't feel dated

2. Responsive Layout

Used CSS clamp() function for fluid typography
Implemented mobile-first approach
Action buttons always visible on mobile for better UX

3. Animations

Subtle animations enhance user experience without being distracting
Floating header icon creates visual interest
Confetti celebration provides positive feedback
Smooth transitions on all interactive elements

4. Component Structure

Single-file component for simplicity in this small app
Separate TaskCard component for reusability
Inline styles in <style> tag for easy portability

Backend Design
1. Repository Pattern

Separates data access logic from business logic
Makes the code more testable and maintainable
Easy to swap storage implementation (e.g., add database later)

2. Dependency Injection

Promotes loose coupling between components
Facilitates unit testing with mock services
Follows SOLID principles

3. Domain Model

ToDoItem class encapsulates business rules
Methods like MarkAsCompleted() ensure data integrity
Private setters protect internal state

4. In-Memory Storage

Simple solution for MVP and development
Fast performance for small datasets
Easy to migrate to database later

##API Design
1. RESTful Architecture

Standard HTTP methods (GET, POST, PUT, DELETE)
Resource-based URLs
Appropriate status codes

2. CORS Configuration

Allows React app to communicate with API
Configured for development environment
Should be restricted in production

3. JSON Serialization

Camel case naming convention for JavaScript compatibility
Case-insensitive deserialization for flexibility

## 🔄 Data Flow
Creating a Task
User Input → React Component → Axios Client → API Controller 
→ Service Layer → In-Memory Store → Response → Update UI
Completing a Task
Click Checkbox → Toggle Handler → PUT Request → Controller 
→ Service.UpdateToDoItem() → Update State → Response 
→ UI Update (strikethrough, move to completed section)
## 🧪 Testing the Application
Manual Testing Checklist

 Create a new task with name only
 Create a task with name and description
 Mark a task as complete
 Unmark a completed task
 Delete a task
 Create multiple tasks and verify progress bar
 Complete all tasks and verify celebration animation
 Test on mobile device/responsive mode
 Verify Enter key creates task
 Verify hover effects on all buttons
 Test with long task names and descriptions

## 🚧 Future Enhancements
Features

 Database integration (SQL Server / PostgreSQL)
 User authentication and authorization
 Task categories and tags
 Due dates and reminders
 Task priority levels
 Search and filter functionality
 Drag and drop reordering
 Task attachments
 Dark mode toggle
 Multiple task lists

## Technical Improvements

 Unit tests for both frontend and backend
 Integration tests
 Docker containerization
 CI/CD pipeline
 API versioning
 Logging and monitoring
 Error boundary in React
 Offline support with Service Workers
 Performance optimization
 Accessibility improvements (ARIA labels)

