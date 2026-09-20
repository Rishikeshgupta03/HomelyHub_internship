# 🏠 HomelyHub

**HomelyHub** is a full-stack accommodation and rental platform built
with **React, Node.js, Express, MongoDB, and AI/LLM integration**.

The application allows users to discover and search accommodations, view
property details, manage profiles, make bookings, and use AI-powered
features such as automatic property-description generation and
personalized trip planning.

> **Note:** The current project includes a simulated payment/order
> verification flow. It does not contain a production payment-gateway
> integration such as Razorpay or Stripe.

------------------------------------------------------------------------

## ✨ Features

### 👤 Authentication & User Management

-   User signup and login
-   JWT-based authentication
-   JWT stored in an HTTP-only cookie
-   Protected routes
-   Logout
-   Update profile
-   Update password
-   Forgot-password flow
-   Password reset using an emailed token
-   Default avatar generation

### 🏡 Accommodation Management

-   Browse available properties
-   Search properties
-   Filter properties
-   Pagination
-   Property details
-   Property types and room types
-   Guest-capacity filtering
-   Amenities
-   Property image uploads
-   Owner accommodation management
-   URL-friendly property slugs

### 📅 Booking

-   Select check-in and check-out dates
-   Guest selection
-   Night calculation
-   Price calculation
-   Availability checking
-   Booking creation
-   User booking history
-   Booking details

### 🤖 AI / Generative AI

HomelyHub integrates a pre-trained LLM through the **Groq API**.

#### AI Property Description Generator

Hosts can provide structured property information and receive a
natural-language property description.

Input includes: - Property name - Property type - Room type - Maximum
guests - Amenities - Price - Location - Additional information

The application uses prompt instructions to: - Keep the description
professional and natural - Use only supplied property information -
Avoid inventing amenities or facilities - Return a concise 3--4 sentence
description - Avoid headings, bullet points and emojis

#### AI Trip Planner

Users can provide: - Destination - Total budget - Number of days -
Number of people - Interests

The LLM generates a structured day-by-day itinerary containing: - Trip
summary - Daily titles - Morning, afternoon and evening activities -
Travel tips

The backend then calculates an approximate accommodation budget per
night and searches MongoDB for properties matching the destination,
budget and guest count.

### 🗺️ Maps

-   Leaflet integration
-   React Leaflet
-   OpenStreetMap
-   Nominatim-based geocoding
-   Property location display

### 🖼️ Image Management

-   ImageKit integration
-   Property images are uploaded to ImageKit
-   MongoDB stores image URLs and file identifiers instead of image
    binaries

### 📧 Email

-   Nodemailer for sending email
-   Mailgen for generating formatted email content
-   Password-reset email workflow

------------------------------------------------------------------------

## 🧱 Architecture

``` text
                         HOMELYHUB
                             │
              ┌──────────────┴──────────────┐
              │                             │
          Frontend                       Backend
          React + Vite                   Node.js
              │                           Express
              │                             │
       Redux Toolkit                 Controllers
              │                             │
            Axios                    REST API Routes
              │                             │
              └──────────── API ────────────┘
                                            │
                       ┌────────────────────┼───────────────────┐
                       │                    │                   │
                    MongoDB              Groq API           ImageKit
                   + Mongoose             + LLM              Images
                       │                    │
                  User/Property/       AI Description/
                     Booking          Trip Planning
```

------------------------------------------------------------------------

## 🛠️ Technology Stack

### Frontend

  Technology            Purpose
  --------------------- -----------------------------------
  React 18              User interface
  Vite                  Development server and build tool
  Redux Toolkit         Global state management
  React Redux           Redux integration
  React Router          Client-side routing
  Axios                 API communication
  Ant Design            UI components
  TanStack React Form   Form handling
  React Datepicker      Date selection
  Moment.js             Date calculations
  React Hot Toast       Notifications
  Leaflet               Maps
  React Leaflet         Leaflet integration with React
  GSAP                  Animations
  Lucide React          Icons
  qs                    Query-string serialization

### Backend

  Technology      Purpose
  --------------- ---------------------------
  Node.js         Backend runtime
  Express         REST API framework
  MongoDB         Database
  Mongoose        MongoDB ODM
  JWT             Authentication
  bcrypt          Password hashing
  cookie-parser   Cookie handling
  dotenv          Environment configuration
  Groq SDK        LLM API integration
  ImageKit        Image storage
  Nodemailer      Email delivery
  Mailgen         Email generation
  validator       Input validation
  slugify         URL-friendly slugs

### AI

``` text
Groq API
   ↓
openai/gpt-oss-120b
   ↓
AI Property Description
AI Trip Planner
```

The project **uses inference from a pre-trained model**. It does not
train or fine-tune the LLM.

------------------------------------------------------------------------

## 📂 Project Structure

``` text
HomelyHub/
│
├── Backend/
│   ├── src/
│   │   ├── Models/
│   │   │   ├── bookingModel.js
│   │   │   ├── propertyModel.js
│   │   │   └── userModel.js
│   │   │
│   │   ├── ai/
│   │   │   ├── aiClient.js
│   │   │   ├── generateDescription.js
│   │   │   └── tripPlanner.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── bookingController.js
│   │   │   ├── propertyController.js
│   │   │   └── tripController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── bookingRouter.js
│   │   │   ├── propertyRouter.js
│   │   │   ├── tripRouter.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── utils/
│   │   │   ├── APIFeatures.js
│   │   │   ├── ImagekitIO.js
│   │   │   ├── db.js
│   │   │   ├── mail.js
│   │   │   └── token.js
│   │   │
│   │   └── index.js
│   │
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── ai/
│   │   │   ├── aiDescription.js
│   │   │   └── tripPlanner.js
│   │   │
│   │   ├── components/
│   │   │   ├── accomodation/
│   │   │   ├── aiTripPlanner/
│   │   │   ├── home/
│   │   │   ├── myBookings/
│   │   │   ├── payment/
│   │   │   ├── propertyListing/
│   │   │   └── user/
│   │   │
│   │   ├── store/
│   │   │   ├── Accomodation/
│   │   │   ├── Booking/
│   │   │   ├── Payment/
│   │   │   ├── Property/
│   │   │   ├── PropertyDetails/
│   │   │   └── User/
│   │   │
│   │   ├── utils/
│   │   │   └── axios.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

------------------------------------------------------------------------

## 🔄 Application Flow

### Authentication

``` text
User
 ↓
React Login/Signup Form
 ↓
Axios
 ↓
Express Route
 ↓
Auth Controller
 ↓
MongoDB
 ↓
bcrypt password verification
 ↓
JWT creation
 ↓
HTTP-only Cookie
 ↓
Authenticated User
```

### AI Property Description

``` text
Property Form
 ↓
React
 ↓
POST /api/v1/rent/user/generateDescription
 ↓
Express Controller
 ↓
Groq SDK
 ↓
openai/gpt-oss-120b
 ↓
Generated Description
 ↓
React UI
```

### AI Trip Planner

``` text
Destination + Budget + Days + People + Interests
                         ↓
                   Express API
                         ↓
                    Groq LLM
                         ↓
                Structured JSON Plan
                         ↓
             Calculate budget per night
                         ↓
                   MongoDB Search
                         ↓
        Trip Plan + Matching Properties
                         ↓
                      React
```

### Booking

``` text
Property
 ↓
Select Dates
 ↓
Calculate Number of Nights
 ↓
Calculate Total Price
 ↓
Create Order
 ↓
Verify Payment Flow
 ↓
Create Booking
 ↓
Booking History
```

------------------------------------------------------------------------

## 🔌 API Routes

Base URL:

``` text
/api/v1/rent
```

### User / Authentication

  ------------------------------------------------------------------------------
  Method                  Endpoint                       Description
  ----------------------- ------------------------------ -----------------------
  POST                    `/user/signup`                 Create a user

  POST                    `/user/login`                  Login

  GET                     `/user/logout`                 Logout

  GET                     `/user/me`                     Get current
                                                         authenticated user

  PATCH                   `/user/updateMe`               Update profile

  PATCH                   `/user/updateMyPassword`       Update password

  POST                    `/user/forgotPassword`         Request password reset

  PATCH                   `/user/resetPassword/:token`   Reset password

  POST                    `/user/generateDescription`    Generate AI property
                                                         description

  POST                    `/user/newAccommodation`       Create accommodation

  GET                     `/user/myAccommodation`        Get user's
                                                         accommodations
  ------------------------------------------------------------------------------

### Properties

  Method   Endpoint         Description
  -------- ---------------- ------------------------------
  GET      `/listing`       Get/search/filter properties
  GET      `/listing/:id`   Get property by ID

### Trip Planner

  Method   Endpoint   Description
  -------- ---------- -----------------------------------------------
  POST     `/trip`    Generate AI trip plan and matching properties

### Booking

  -------------------------------------------------------------------------------
  Method                  Endpoint                        Description
  ----------------------- ------------------------------- -----------------------
  GET                     `/user/booking`                 Get user's bookings

  GET                     `/user/booking/:bookingId`      Get booking details

  POST                    `/user/booking/create-order`    Create booking order

  POST                    `/user/booking/verifyPayment`   Verify the current
                                                          payment flow
  -------------------------------------------------------------------------------

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd HomelyHub
```

### 2. Install frontend dependencies

``` bash
cd Frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd Backend
npm install
```

### 4. Configure environment variables

Create:

``` text
Backend/.env
```

The backend reads the following configuration values:

``` env
PORT=8080
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

Groq_API_KEY=your_groq_api_key

IMAGEKIT_PUBLICKEY=your_imagekit_public_key
IMAGEKIT_PRIVATEKEY=your_imagekit_private_key
IMAGEKIT_URLENDPOINT=your_imagekit_url_endpoint

MAILTRAP_SMTP_HOST=your_mailtrap_host
MAILTRAP_SMTP_USER=your_mailtrap_username
MAILTRAP_SMTP_PASS=your_mailtrap_password
```

> Never commit `.env` or real API keys to GitHub.

### 5. Start the backend

From the `Backend` directory:

``` bash
node src/index.js
```

The included Vite configuration proxies `/api` requests to:

``` text
http://localhost:8080
```

so use `PORT=8080` for the backend during local development unless you
also update the Vite proxy configuration.

### 6. Start the frontend

From the `Frontend` directory:

``` bash
npm run dev
```

Vite will display the local development URL in the terminal.

------------------------------------------------------------------------

## 🔐 Environment Variables

  Variable                  Purpose
  ------------------------- ---------------------------
  `PORT`                    Backend server port
  `NODE_ENV`                Application environment
  `MONGODB_URI`             MongoDB connection string
  `JWT_SECRET`              JWT signing secret
  `JWT_EXPIRES_IN`          JWT token lifetime
  `JWT_COOKIE_EXPIRES_IN`   Cookie lifetime
  `Groq_API_KEY`            Groq API key
  `IMAGEKIT_PUBLICKEY`      ImageKit public key
  `IMAGEKIT_PRIVATEKEY`     ImageKit private key
  `IMAGEKIT_URLENDPOINT`    ImageKit URL endpoint
  `MAILTRAP_SMTP_HOST`      SMTP host
  `MAILTRAP_SMTP_USER`      SMTP username
  `MAILTRAP_SMTP_PASS`      SMTP password

------------------------------------------------------------------------

## 🧠 AI Design

### Property Description Generation

The backend builds a structured prompt from property information and
sends it to the LLM.

``` text
Property Data
     ↓
Prompt Construction
     ↓
System Instructions
     ↓
Groq Chat Completion
     ↓
LLM Response
     ↓
Description
```

The prompt explicitly instructs the model not to invent property
features.

### Trip Planning

The trip planner requests a JSON response with:

``` json
{
  "summary": "Trip summary",
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "activities": [
        "Morning: ...",
        "Afternoon: ...",
        "Evening: ..."
      ]
    }
  ],
  "tips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}
```

The backend parses this JSON and combines it with property results from
MongoDB.

> The current implementation uses prompt-based generation. It does not
> implement model training, fine-tuning, or a conventional RAG pipeline.

------------------------------------------------------------------------

## 🔒 Security

The application includes several security-oriented mechanisms:

-   Password hashing with bcrypt
-   JWT authentication
-   HTTP-only JWT cookies
-   JWT expiration
-   Password reset token hashing
-   Password reset token expiration
-   Protected API routes
-   Input filtering for profile updates
-   Password excluded from normal user queries
-   Environment variables for secrets

------------------------------------------------------------------------

## 🚧 Current Limitations

The current project is primarily a learning/full-stack project and has
areas that can be extended for production use.

### Payment

The current payment flow is simulated. A production payment provider
such as Razorpay or Stripe could be integrated with server-side
signature/webhook verification.

### AI Grounding

The trip planner relies on the LLM's generated recommendations. A future
version could use a trusted Places/Maps API to verify and ground
recommended locations.

### Booking Concurrency

Production deployment should use stronger transactional/concurrency
controls to prevent two users from successfully booking overlapping
dates at the same time.

### Testing

Automated unit, integration and end-to-end tests can be added.

### Validation

Additional server-side validation, rate limiting and centralized error
handling can further strengthen the API.

------------------------------------------------------------------------

## 📌 Future Improvements

-   Real payment gateway integration
-   Google/Map Places integration
-   AI recommendations grounded with external travel data
-   Reviews and ratings
-   Favorites/wishlist
-   Host dashboard
-   Admin dashboard
-   Advanced property filtering
-   Booking cancellation/refund workflow
-   Automated testing
-   API documentation with Swagger/OpenAPI
-   Rate limiting and improved security
-   Deployment with CI/CD
-   Docker-based deployment

------------------------------------------------------------------------

## 📸 Project Preview

A project screenshot is included in:

``` text
Frontend/public/readme/wsa-homelyhub-app-screenshot.jpg
```

![HomelyHub
Preview](Frontend/public/readme/wsa-homelyhub-app-screenshot.jpg)

------------------------------------------------------------------------

## 📚 Learning Outcomes

This project provided practical experience with:

-   Full-stack JavaScript development
-   React component architecture
-   Redux Toolkit state management
-   REST API design
-   Express middleware
-   MongoDB and Mongoose
-   JWT authentication
-   Password security
-   File/image management
-   Email workflows
-   Date and booking logic
-   Map and geocoding integration
-   LLM API integration
-   Prompt engineering
-   Structured AI output
-   Frontend-backend integration

------------------------------------------------------------------------

## 👨‍💻 Project Highlights

**HomelyHub** demonstrates a combination of:

``` text
Full-Stack Development
        +
Authentication & Security
        +
Database Management
        +
Booking System
        +
Maps & Image Services
        +
Generative AI
```

The project is designed to demonstrate how modern web technologies and
AI services can be combined to build a practical accommodation platform.

------------------------------------------------------------------------

## 📄 License

This project is intended for educational and portfolio purposes.
