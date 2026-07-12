# EcoSphere Backend — Phase 1 (Database + Auth + Master Data)

Foundation backend for the EcoSphere ESG Management Platform. Built with
Node.js, Express, MongoDB (Mongoose), and JWT auth.

## What's in this phase

- `server.js` + `config/db.js` — Express app + MongoDB connection
- All 19 Mongoose models from the Shared Contract (Section 0), so later
  phases (2/3/4) can build directly on top without touching `models/`
- Auth: register, login, `GET /api/auth/me`, JWT middleware, role-check middleware
- Full CRUD (role-gated) for: Department, Category, EmissionFactor, Badge, Reward
- `seed.js` — creates 1 admin user, 3 departments, 2 categories
- Centralized error handling, consistent `{ success, data | error }` response shape

Everything else in the contract (CarbonTransaction, Challenges, Audits, Reports,
etc.) has model files ready but no routes/controllers yet — that's Phase 2/3/4.

## 1. Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/ecosphere
JWT_SECRET=replace_this_with_a_long_random_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

- `MONGO_URI` — point this at a local `mongod` instance or a MongoDB Atlas
  connection string. Either works; nothing else needs to change.
- `JWT_SECRET` — any long random string.
- `CLIENT_URL` — used for CORS; set to your frontend's dev URL.

## 2. Run

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start        # plain node
```

You should see:

```
MongoDB connected: 127.0.0.1/ecosphere
EcoSphere backend running in development mode on port 5000
```

## 3. Seed the database

```bash
npm run seed
```

Creates:
- Admin user: `admin@ecosphere.com` / `Admin@123`
- Departments: Human Resources (`HR`), Engineering (`ENG`), Operations (`OPS`)
- Categories: "Community Outreach" (CSR type), "Green Commute" (Challenge type)

The script is safe to re-run — it only deletes the specific seeded records
before recreating them, so it won't touch other data.

## 4. Test the API

### Health check

```bash
curl http://localhost:5000/api/health
```

### Login as seeded admin

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ecosphere.com","password":"Admin@123"}'
```

Copy the `data.token` from the response — use it as `TOKEN` below.

### Get current user

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Register a new (non-admin) user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@ecosphere.com","password":"Password123"}'
```

### List departments (any authenticated user)

```bash
curl http://localhost:5000/api/departments \
  -H "Authorization: Bearer TOKEN"
```

### Create a department (Admin only)

```bash
curl -X POST http://localhost:5000/api/departments \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Finance","code":"FIN"}'
```

Trying this with a non-Admin token returns `403` with
`{ "success": false, "error": "Role 'Employee' is not authorized to access this resource" }`.

### Update / delete a department (Admin only)

```bash
curl -X PUT http://localhost:5000/api/departments/<id> \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"employeeCount": 12}'

curl -X DELETE http://localhost:5000/api/departments/<id> \
  -H "Authorization: Bearer TOKEN"
```

The same CRUD pattern (`GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`)
applies identically to `/api/categories`, `/api/emission-factors`, `/api/badges`,
and `/api/rewards`.

## 5. Response shape

Every endpoint responds with:

```json
{ "success": true, "data": { ... } }
```

or on error:

```json
{ "success": false, "error": "message here" }
```

List endpoints also include a `count` field alongside `data`.

## 6. Folder structure

```
backend/
├── server.js
├── config/db.js
├── models/            # all 19 Mongoose schemas from Section 0
├── controllers/        # authController.js, crudFactory.js, + 5 resource controllers
├── routes/              # authRoutes.js + 5 resource route files
├── middleware/          # auth.js, roleCheck.js, errorHandler.js, asyncHandler.js
├── utils/                # errorResponse.js, scoring.js (stub), notify.js (stub)
├── seed.js
├── .env.example
└── package.json
```

## Notes for Phase 2/3/4 owners

- Don't rename any model fields, routes, or folders — everything here matches
  Section 0 verbatim.
- `controllers/crudFactory.js` is a reusable generic CRUD generator — feel free
  to reuse it for your own straightforward CRUD resources instead of writing
  boilerplate from scratch.
- `utils/scoring.js` and `utils/notify.js` are stubs matching the contract's
  folder structure; fill in real logic in Phase 4.
- Auth: send `Authorization: Bearer <token>` on every protected request. Roles
  are `Admin`, `DeptHead`, `Employee`. Use `middleware/roleCheck(['Admin'])`
  (or any role array) to gate new routes.
