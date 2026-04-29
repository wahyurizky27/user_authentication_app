# User Authentication App

A React Native authentication app built with Expo, React Context API, React Navigation, and AsyncStorage.

## Features

- Login screen
- Signup screen
- Home screen
- Authentication state using React Context API
- Persistent login using AsyncStorage
- Form validation
- Error messages
- Logout functionality
- Password visibility toggle
- Clean mobile UI

## Tech Stack

- React Native
- Expo
- React Context API
- React Navigation
- AsyncStorage
- Expo Vector Icons

## Prerequisites

Before running this project, make sure you have installed:

- Node.js
- npm
- Git
- Expo Go app on your mobile phone, or Android Studio emulator

You can check Node.js and npm by running:

```bash
node -v
npm -v
```

## Project Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/user-authentication-app.git
```

Go to the project directory:

```bash
cd user-authentication-app
```

Install all dependencies:

```bash
npm install
```

## Running the App with Expo

Start the Expo development server:

```bash
npm start
```

or:

```bash
npx expo start
```

After the Expo Metro Bundler opens, you can run the app using one of the following options.

### Option 1: Run on Android Emulator

Make sure your Android emulator is already running.

Then press:

```bash
a
```

Expo will open the app on the Android emulator.

### Option 2: Run on Physical Android or iPhone

1. Install **Expo Go** from Google Play Store or Apple App Store.
2. Run the project:

```bash
npm start
```

3. Scan the QR code shown in the terminal or browser using Expo Go.

For Android, scan the QR code directly from Expo Go.

For iPhone, scan the QR code using the Camera app.

### Option 3: Run on iOS Simulator

This option only works on macOS with Xcode installed.

Press:

```bash
i
```

## Clear Expo Cache

If the app does not load correctly or shows an old version, run:

```bash
npx expo start -c
```

## Project Structure

```bash
src/
├── context/
│   └── AuthContext.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   └── HomeScreen.js
├── styles/
│   └── theme.js
└── utils/
    └── validation.js
```

## How to Test the App

Because this app uses local storage, create an account first from the Signup screen.

Example account:

```text
Name: John Doe
Email: john@mail.com
Password: 123456
```

After successful signup, the app will navigate to the Home screen.

Then you can logout and login again using:

```text
Email: john@mail.com
Password: 123456
```

## Validation Rules

### Signup

- Name is required.
- Email is required.
- Email must use a valid format.
- Password is required.
- Password must be at least 6 characters.

### Login

- Email is required.
- Password is required.
- Email must use a valid format.
- Password must be at least 6 characters.
- Email and password must match a registered user.

## Notes

This project does not use a backend API. User registration and login data are stored locally using AsyncStorage for demo and assignment purposes.
