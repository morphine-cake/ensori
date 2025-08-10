# 🔧 Google OAuth 403 Error Fix

## Problem
Users are getting "Erişim engellendi: Bu istek Google'ın politikaları tarafından engellendi" (Access blocked: This request was blocked by Google's policies) with error code 403: disallowed_useragent.

## Root Cause
The error occurs because:
1. The domain `ensori.today` is not properly configured in Google OAuth settings
2. Google is blocking certain user agents/browsers
3. OAuth popup method may be restricted in some environments

## 🚀 Solution Steps

### 1. Update Google Cloud Console OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services > Credentials**
4. Find your **OAuth 2.0 Client ID** (Web application)
5. Click **Edit** (pencil icon)
6. Add the following to **Authorized JavaScript Origins**:
   ```
   https://ensori.today
   https://www.ensori.today
   ```
7. Add the following to **Authorized Redirect URIs**:
   ```
   https://ensori.today/__/auth/handler
   https://www.ensori.today/__/auth/handler
   ```
8. Click **Save**

### 2. Update Firebase Authentication Settings

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication > Settings**
4. Click on **Authorized Domains** tab
5. Add the following domains if not already present:
   ```
   ensori.today
   www.ensori.today
   ```
6. Click **Add Domain** and **Save**

### 3. Update OAuth Consent Screen (if needed)

1. In Google Cloud Console, go to **APIs & Services > OAuth Consent Screen**
2. Ensure your app is properly configured:
   - **App Name**: Ensori Todo App
   - **User Support Email**: Your email
   - **App Domain**: https://ensori.today
   - **Developer Contact**: Your email
3. In **Scopes**, ensure you have:
   - `email`
   - `profile`
   - `openid`

### 4. Test Different Browsers

The error might be browser-specific. Test with:
- ✅ Chrome (desktop)
- ✅ Firefox (desktop)
- ✅ Safari (desktop/mobile)
- ✅ Edge
- ⚠️ Mobile browsers (may have restrictions)
- ⚠️ In-app browsers (Instagram, Facebook, etc.)

## 🔄 Code Changes Made

The AuthContext has been updated to:
1. **Fallback to redirect method** when popup is blocked
2. **Handle disallowed_useragent errors** gracefully
3. **Add proper scopes** for email and profile
4. **Better error handling** with console logging

## 🧪 Testing

After making the OAuth configuration changes:

1. **Clear browser cache** and cookies for ensori.today
2. **Try signing in** from different browsers
3. **Check browser console** for any error messages
4. **Test on mobile devices** and different networks

## ⚡ Quick Fix for Users

If users continue to experience issues, they can try:
1. **Use a different browser** (Chrome recommended)
2. **Disable ad blockers** temporarily
3. **Allow popups** for ensori.today
4. **Try incognito/private mode**
5. **Clear browser cache and cookies**

## 🔍 Monitoring

Monitor authentication errors by checking:
1. **Firebase Console > Authentication > Usage**
2. **Google Cloud Console > APIs & Services > Metrics**
3. **Browser developer console** for client-side errors

---

## Environment Variables Check

Ensure these environment variables are properly set in your deployment:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

The auth domain should match your Firebase project: `your-project.firebaseapp.com`