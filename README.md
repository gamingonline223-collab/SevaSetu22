# Seva Setu - Issue Management System

A comprehensive web application for managing civic issues with role-based dashboards for administrators and workers. Built with React, TypeScript, and Firebase, featuring real-time updates, Google Maps integration, and QR code generation for issue reporting.

## 🚀 Features

### Admin Dashboard
- **User Management**: Create, update, and delete user accounts
- **Worker Management**: Manage worker accounts and assignments
- **Issue Management**: Assign issues to workers, update status, and track progress
- **Analytics**: View statistics and insights on issue resolution
- **Real-time Updates**: Live synchronization with Firestore database

### Worker Dashboard
- **Assigned Issues**: View all issues assigned to the logged-in worker
- **Interactive Maps**: Google Maps integration with color-coded markers based on priority
- **Issue Details**: Detailed view with location maps and coordinates
- **Status Updates**: Update issue status and add notes

### General Features
- **Firebase Authentication**: Secure login with role-based access control
- **Firestore Database**: Real-time data synchronization
- **Google Maps Integration**: Interactive maps for issue locations
- **QR Code Generation**: Easy issue reporting via QR codes
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript
- **Routing**: React Router DOM v6
- **Backend**: Firebase (Firestore, Authentication)
- **Maps**: Google Maps API (@react-google-maps/api)
- **QR Codes**: qrcode.react
- **Styling**: CSS3
- **Build Tool**: React Scripts (Create React App)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- Google Cloud account (for Maps API)
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd web_app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password provider)
3. Create a **Firestore Database**
4. Register a web app in your Firebase project
5. Copy your Firebase configuration

### 4. Google Maps Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Maps JavaScript API**
4. Create an API key in **Credentials**
5. Restrict the API key:
   - Application restrictions: HTTP referrers
   - Add your domain (e.g., `localhost:3000/*` for development)
   - API restrictions: Select "Maps JavaScript API"

### 5. Environment Variables

Create a `.env` file in the project root (this file is gitignored):

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Google Maps API Key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Note**: Never commit the `.env` file to version control. Use `.env.example` as a template.

### 6. Firestore Setup

#### Deploy Security Rules

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

#### Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

**Important**: Index creation can take 5-10 minutes. You'll receive an email when ready.

### 7. Start Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
web_app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── admin/           # Admin dashboard components
│   │   ├── common/          # Shared components
│   │   └── worker/          # Worker dashboard components
│   ├── contexts/            # React contexts (AuthContext)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page layouts
│   ├── services/            # Firebase and API services
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── firebase.json            # Firebase configuration
├── firestore.rules          # Firestore security rules
├── firestore.indexes.json   # Firestore indexes
├── .env                     # Environment variables (gitignored)
├── .env.example             # Example environment file
└── package.json
```

## 🔐 Security Rules

The Firestore security rules ensure:
- ✅ Admins have full access to all collections
- ✅ Workers can read all issues and update their assigned issues
- ✅ Users can read their own reported issues
- ✅ Everyone can create new issues

## 📱 Usage

### Admin Login
1. Navigate to `/login`
2. Sign in with admin credentials
3. Access admin dashboard to manage users, workers, and issues

### Worker Login
1. Navigate to `/login`
2. Sign in with worker credentials
3. View assigned issues on the dashboard
4. Click on markers to see issue details
5. Update issue status and add notes

## 🌐 Deployment

### Netlify Deployment

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Configure Environment Variables in Netlify**
   - Go to Site Settings → Environment Variables
   - Add all `REACT_APP_*` variables from your `.env` file

3. **Deploy**
   - Connect your Git repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy site

4. **Trigger Redeploy**
   - After adding environment variables, trigger a new deployment

### Firebase Hosting (Alternative)

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## 🐛 Troubleshooting

### Blank Screen on Deployment
- Ensure all environment variables are properly set in your hosting platform
- Check browser console for errors
- Verify Firebase configuration is correct

### Map Not Showing
- Verify `REACT_APP_GOOGLE_MAPS_API_KEY` is set in `.env`
- Restart development server after adding the API key
- Check that Maps JavaScript API is enabled in Google Cloud Console
- Verify API key restrictions allow your domain

### "The query requires an index" Error
- Firebase will provide a direct link to create the required index
- Alternatively, deploy indexes: `firebase deploy --only firestore:indexes`
- Wait 5-10 minutes for indexes to build

### Worker Dashboard Shows "No Issues Assigned"
- Verify the worker is assigned to issues in the admin panel
- Check that Firestore indexes are deployed and enabled
- Ensure Firestore security rules are deployed
- Verify the worker's UID matches the `assignedTo` field in Firestore

## 📊 Database Structure

### Issues Collection
```typescript
{
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo: string  // Worker UID
  reportedBy: {
    userId: string
    name: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  address: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## 🔄 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App (irreversible)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Note**: Remember to keep your `.env` file secure and never commit it to version control. All API keys and sensitive credentials should be stored in environment variables.