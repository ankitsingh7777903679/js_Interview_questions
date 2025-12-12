# Copilot Instructions for JS Interview Questions Project

## Project Architecture

This is a **monorepo** containing:
- **Root level**: Legacy/demo Express.js code (index.js, mongoDB.js, mongoose.js) used for learning/interview practice
- **`server/`**: Production Express REST API with MongoDB/Mongoose
- **`client/`**: React (v19) + Vite frontend with Tailwind CSS v4 and Flowbite React

**Critical**: The root level and `server/` are **separate applications**. Use `server/` for production enquiry management, root level for learning/demos.

## Dual Directory Structure Pattern

**Server-side convention**: Two parallel structures exist:
- `app/` (root level) - Legacy structure, uses lowercase routes/controllers
- `server/App/` - Production structure, uses PascalCase naming

When working on enquiry features, use `server/App/` with PascalCase convention (Controllers, models).

## Database & Environment

- **Connection**: Mongoose connects using `process.env.DBURL` and `process.env.PORT` from `.env` file
- **Pattern**: Connection happens before server starts (see [server/index.js](server/index.js#L14-L19))
- **Models location**: `server/App/models/` with PascalCase filenames (e.g., `enquiry.model.js`)
- **Schema convention**: Uses `mongoose.Schema` with explicit validation rules, no timestamps by default

## API Structure

### Backend Routing Pattern
```javascript
// server/index.js mounts all API routes at base path
app.use('/api/website/enquiry', enquiryRouter)

// Controller exports object with named functions
module.exports = { enquiryInsert }

// Routes use direct function references
enquiryRouter.post('/insert', enquiryInsert)
```

**Full endpoint becomes**: `POST /api/website/enquiry/insert`

### Frontend API Integration
- **Base URL**: Hardcoded as `http://localhost:8000` (see [Enquiry.jsx](client/src/Enquiry.jsx#L17))
- **HTTP Client**: axios for all API calls
- No environment variables for API URL currently

## Development Workflow

### Starting the Applications
```bash
# Terminal 1 - Backend (port 8000)
cd server
npm start              # Uses nodemon for auto-reload

# Terminal 2 - Frontend (port 5173)
cd client
npm run dev            # Vite dev server with HMR

# Root level demos (port 3000)
npm start              # index.js
npm run p1             # mongoDB.js (native driver)
npm run mongoose       # mongoose.js (Mongoose demos)
```

### Client-Side Conventions
- **Main entry**: [main.jsx](client/src/main.jsx) renders `<Enquiry />` component directly (not App.jsx currently)
- **Styling**: Tailwind CSS v4 with Flowbite React components (Button, TextInput, Table, etc.)
- **Form handling**: Manual form data extraction via `e.target.name.value` pattern
- **Vite config**: Uses Tailwind v4 plugin syntax `@tailwindcss/vite`

## Code Patterns to Follow

### Controller Response Format
```javascript
// Success
res.send({ status: 1, message: "Success message" })

// Error  
res.send({ status: 0, message: "Error message", error: err })
```

### Model Definition
```javascript
let Schema = mongoose.Schema;
let modelSchema = new Schema({
    fieldName: { type: String, required: true, unique: true }
})
let Model = mongoose.model('collectionName', modelSchema)
module.exports = Model
```

### Frontend Form Submission
```javascript
let saveData = (e) => {
    e.preventDefault();
    let formData = {
        field: e.target.fieldName.value
    }
    axios.post(`http://localhost:8000/api/...`, formData).then((res)=> {
        console.log(res.data);
    })
}
```

## Key Files

- [server/index.js](server/index.js) - Production server entry point with MongoDB connection
- [server/App/Controllers/web/enquiryContoller.js](server/App/Controllers/web/enquiryContoller.js) - Enquiry business logic
- [server/App/models/enquiry.model.js](server/App/models/enquiry.model.js) - Enquiry schema
- [client/src/Enquiry.jsx](client/src/Enquiry.jsx) - Main UI with form and list view
- [client/vite.config.js](client/vite.config.js) - Vite + Tailwind + Flowbite plugin setup

## Common Tasks

**Adding a new API endpoint**:
1. Add method to controller in `server/App/Controllers/web/`
2. Export it from module.exports object
3. Add route in `server/App/routes/web/` 
4. Import and use in controller

**Adding a new model field**:
1. Update schema in `server/App/models/`
2. Ensure validation rules (required, unique, type)
3. Update controller to handle new field

**Adding UI components**:
1. Use Flowbite React components from "flowbite-react"
2. Style with Tailwind utility classes
3. Place reusable components in `client/src/components/`
