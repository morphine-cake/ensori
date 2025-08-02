# Firebase Setup Guide for Ensori

This guide will help you set up Firebase for your Ensori todo app to enable user authentication and data persistence.

## Prerequisites

- A Google account
- Node.js and npm installed
- The Ensori project cloned and dependencies installed

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "ensori-todo-app")
4. Choose whether to enable Google Analytics (optional but recommended)
5. Click "Create project"

## Step 2: Set Up Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following sign-in providers:
   - **Email/Password**: Click on it and toggle "Enable"
   - **Google**: Click on it, toggle "Enable", and add your project's domain (e.g., `localhost` for development, your production domain for deployment)

## Step 3: Set Up Firestore Database

1. In your Firebase project console, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (you can configure security rules later)
4. Select a location for your database (choose the one closest to your users)

## Step 4: Get Your Firebase Configuration

1. In your Firebase project console, click on the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on "Web" icon `</>`
5. Register your app with a nickname (e.g., "Ensori Web App")
6. Copy the Firebase configuration object

## Step 5: Configure Environment Variables

1. In your Ensori project root, create a file called `.env.local`
2. Add your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Important**: Replace all the placeholder values with your actual Firebase configuration values.

## Step 6: Configure Firestore Security Rules (Recommended)

1. Go to "Firestore Database" in your Firebase console
2. Click on the "Rules" tab
3. Replace the default rules with the following secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own todos
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

4. Click "Publish"

## Step 7: Test Your Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. You should see a beautiful landing page with a "Get Started" button

4. Click "Get Started" and try:
   - Creating a new account with email/password
   - Signing in with Google
   - Adding some todo items
   - Logging out and back in to verify data persistence

## Features You Now Have

✅ **User Authentication**

- Email/password sign up and login
- Google Sign-In
- Password reset functionality
- Secure user sessions

✅ **User-Specific Data**

- Each user has their own private todo list
- Real-time data sync across devices
- Automatic backup and persistence

✅ **Daily Workflow System**

- Automatic reset of completed tasks at midnight (per user)
- Preserves ongoing and todo items
- User-specific daily reset timing

✅ **Security**

- Users can only access their own data
- Secure authentication
- Protected API endpoints

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"

- Make sure your `.env.local` file is in the project root
- Verify all environment variables are correctly named with `NEXT_PUBLIC_` prefix
- Restart your development server after adding environment variables

### "Missing or insufficient permissions"

- Check your Firestore security rules
- Make sure you're authenticated when trying to access data
- Verify the user ID matches in your security rules

### Google Sign-In not working

- Make sure you've enabled Google as a sign-in provider in Firebase Authentication
- Add your domain (localhost for development) to the authorized domains list

## Production Deployment

When deploying to production:

1. Add your production domain to Firebase Authentication authorized domains
2. Update your `.env.local` with production environment variables
3. Consider upgrading Firestore to production mode with proper security rules
4. Set up proper CORS settings if needed

## Next Steps

Your Ensori app now has full user authentication and data persistence! Users can:

- Create accounts and sign in securely
- Have their own private todo lists
- Sync data across multiple devices
- Enjoy the daily workflow system with automatic task reset

The app will automatically handle user sessions, data syncing, and provide a smooth user experience across all devices.
