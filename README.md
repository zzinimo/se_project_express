## Technologies & Techniques Used

### Core Technologies

#### **Node.js & Express.js**

- **Express.js Framework**: RESTful API server built with Express.js for handling HTTP requests
- **Middleware Implementation**: Custom middleware for user authentication simulation and request processing
- **Router Module Pattern**: Modular routing system using Express Router for clean code organization
- **JSON Parsing**: Built-in Express middleware for parsing JSON request bodies

#### **Database & ODM**

- **MongoDB**: NoSQL document database for storing user and clothing item data
- **Mongoose ODM**: Object Document Mapping for MongoDB with schema validation and data modeling
- **Schema Design**: Well-structured schemas with validation rules, references, and default values
- **Database Relationships**: ObjectId references between users and clothing items for relational data

### Data Modeling & Validation

#### **Mongoose Schemas**

- **User Schema** ([`models/user.js`](models/user.js)): Name and avatar URL validation
- **Clothing Item Schema** ([`models/clothingItem.js`](models/clothingItem.js)): Complete item modeling with weather categories, ownership, and likes
- **Field Validation**: String length validation, required fields, and enum constraints
- **URL Validation**: Using validator.js for robust URL format checking
- **Date Handling**: Automatic timestamp creation with `createdAt` field

#### **Advanced Schema Features**

- **Array Fields**: Likes system using arrays of ObjectId references
- **Enum Validation**: Weather category validation with predefined values (`hot`, `warm`, `cold`)
- **Default Values**: Automatic array initialization and timestamp generation
- **Cross-References**: Bidirectional relationships between users and items

### API Architecture & Design Patterns

#### **RESTful API Design**

- **Resource-Based URLs**: Clean endpoint structure following REST conventions
- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE methods
- **Status Codes**: Appropriate HTTP status codes for different scenarios
- **JSON Responses**: Consistent JSON response format across all endpoints

#### **MVC Architecture**

- **Controllers** ([`controllers/`](controllers/)): Business logic separation for users, clothing items, and likes
- **Models** ([`models/`](models/)): Data layer with Mongoose schemas
- **Routes** ([`routes/`](routes/)): Route definitions and middleware application
- **Utilities** ([`utils/errors.js`](utils/errors.js)): Centralized error code management

#### **Modular Route Organization**

- **Main Router** ([`routes/index.js`](routes/index.js)): Central route aggregation
- **Feature-Specific Routers**: Separate routers for users, items, and likes functionality
- **Middleware Chain**: Request processing pipeline with authentication middleware

### Error Handling & Validation

#### **Comprehensive Error Management**

- **Custom Error Codes** ([`utils/errors.js`](utils/errors.js)): Standardized error status codes
- **Validation Error Handling**: Mongoose validation error processing
- **Database Error Handling**: Proper handling of cast errors and document not found errors
- **Fallback Error Responses**: Default error handling for unexpected scenarios

#### **Input Validation Strategies**

- **Schema-Level Validation**: Mongoose built-in validation rules
- **Third-Party Validation**: Validator.js for URL format validation
- **Parameter Validation**: Route parameter validation and sanitization
- **Request Body Validation**: JSON payload validation

### Development Tools & Quality Assurance

#### **Code Quality & Linting**

- **ESLint Configuration** ([`.eslintrc.js`](.eslintrc.js)): Airbnb style guide with custom rules
- **Prettier Integration**: Code formatting consistency
- **EditorConfig** ([`.editorconfig`](.editorconfig)): Cross-editor coding style consistency
- **Custom Linting Rules**: Console usage restrictions and underscore dangle allowances

#### **Development Environment**

- **Nodemon**: Hot-reload development server for rapid development
- **Environment Variables**: Port configuration through process.env
- **NPM Scripts**: Automated tasks for starting, development, and linting

#### **Version Control & Collaboration**

- **Git Integration**: Comprehensive .gitignore for Node.js projects
- **GitHub Workflows** ([`.github/workflows/tests.yml`](.github/workflows/tests.yml)): Automated CI/CD pipeline
- **Sprint Management** ([`sprint.txt`](sprint.txt)): Project milestone tracking

### Testing & Continuous Integration

#### **Automated Testing Pipeline**

- **GitHub Actions**: Automated testing on push to main branch
- **MongoDB Integration**: Test database setup with MongoDB GitHub Action
- **Multi-Sprint Support**: Dynamic testing based on sprint number (12 or 13)
- **Endpoint Testing**: Comprehensive API endpoint validation

#### **Test Configuration**

- **Sprint Validation** ([`.github/bin/check-sprint.sh`](.github/bin/check-sprint.sh)): Automated sprint number validation
- **Test Environment Setup**: MongoDB service configuration for testing
- **Port Management**: Wait-port integration for service readiness checks

### Security & Best Practices

#### **Security Measures**

- **Input Sanitization**: Mongoose built-in protection against injection attacks
- **URL Validation**: Preventing malicious URL injection in avatar and image fields
- **Error Message Security**: Controlled error message exposure

#### **Code Organization Best Practices**

- **Separation of Concerns**: Clear separation between routes, controllers, and models
- **DRY Principle**: Reusable error handling and validation logic
- **Consistent Naming**: Standardized naming conventions across the codebase
- **Module Exports**: Proper module.exports pattern for Node.js

### Data Operations & CRUD Functionality

#### **Advanced MongoDB Operations**

- **Array Operations**: `$addToSet` and `$pull` operators for likes functionality
- **Query Chaining**: `.orFail()` method for error handling
- **Document Updates**: `findByIdAndUpdate` with options for atomic operations
- **Bulk Operations**: Efficient data retrieval with `.find({})`

#### **API Endpoints Structure**

```
GET /users              - Retrieve all users
GET /users/:userId      - Retrieve specific user
POST /users             - Create new user
GET /items              - Retrieve all clothing items
POST /items             - Create new clothing item
DELETE /items/:itemId   - Delete clothing item
PUT /items/:itemId/likes    - Like clothing item
DELETE /items/:itemId/likes - Unlike clothing item
```

## Running the Project

### Prerequisites

- Node.js (version 20.x recommended)
- MongoDB (version 4.4+)
- npm or yarn package manager

### Installation & Setup

```bash
# Install dependencies
npm install

# Start MongoDB service (varies by OS)
# MongoDB should be running on mongodb://127.0.0.1:27017/

# Launch the server
npm run start

# Launch with hot reload for development
npm run dev
```

### Available Scripts

- `npm run start` — Launch the production server
- `npm run dev` — Launch development server with hot reload
- `npm run lint` — Run ESLint code quality checks

### Testing

Before committing your code, make sure you edit the file [`sprint.txt`](sprint.txt) in the root folder. The file should contain the number of the sprint you're currently working on (12 or 13).

### Project Structure

```
├── controllers/         # Business logic layer
├── models/             # Database schemas and models
├── routes/             # API route definitions
├── utils/              # Utility functions and constants
├── .github/            # CI/CD workflows and scripts
└── app.js              # Main application entry point
```

This project demonstrates modern Node.js backend development practices with emphasis on code quality, testing, and maintainable architecture.
