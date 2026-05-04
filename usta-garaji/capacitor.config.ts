import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.garagetycoon.app',
  appName: 'Araba Tamircisi',
  webDir: 'dist',

  // Server settings
  server: {
    cleartext: false,
  },

  // Android specific settings
  android: {
    allowMixedContent: false,
  },

  // iOS specific settings
  ios: {
    // Content inset adjustment
    contentInset: 'automatic',
    // Scroll behavior
    scrollEnabled: true,
  },

  // Plugins configuration
  plugins: {
    // Splash Screen
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#0f0f1a',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Status Bar
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0f0f1a',
    },

    // Local Notifications (for daily rewards reminders)
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#3B82F6',
    },

    // Push Notifications
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
