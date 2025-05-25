
// Note: This is a mock implementation since we can't modify package.json to install Firebase
// In a real implementation, you would:
// 1. npm install firebase
// 2. Set up environment variables in .env.local
// 3. Initialize Firebase with your project config

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Mock Firebase implementation for demonstration
export const mockFirebaseConfig: FirebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "vertika-demo.firebaseapp.com",
  projectId: "vertika-demo",
  storageBucket: "vertika-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Mock auth functions
export const mockAuth = {
  currentUser: null,
  signInWithPopup: async () => ({ user: { uid: 'mock-user', email: 'user@example.com' } }),
  signOut: async () => {},
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Mock auth state change
    callback(null);
    return () => {};
  }
};

// Mock firestore functions
export const mockFirestore = {
  collection: (path: string) => ({
    doc: (id: string) => ({
      get: async () => ({ exists: true, data: () => ({}) }),
      set: async (data: any) => {},
      update: async (data: any) => {}
    }),
    where: (field: string, op: string, value: any) => ({
      orderBy: (field: string, direction?: string) => ({
        limit: (count: number) => ({
          get: async () => ({ docs: [] })
        })
      })
    }),
    add: async (data: any) => ({ id: 'mock-doc-id' })
  })
};

// Mock storage functions
export const mockStorage = {
  ref: (path: string) => ({
    put: async (file: File) => ({ 
      ref: { getDownloadURL: async () => 'https://mock-download-url.com' }
    })
  })
};

export const getAuth = () => mockAuth;
export const getFirestore = () => mockFirestore;
export const getStorage = () => mockStorage;
