
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockAuth } from '../lib/firebaseClient';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock auth state listener
    const unsubscribe = mockAuth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await mockAuth.signInWithPopup();
      setUser(result.user);
      console.log('User signed in:', result.user);
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await mockAuth.signOut();
      setUser(null);
      console.log('User signed out');
    } catch (err) {
      setError('Failed to sign out');
      console.error('Sign out error:', err);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
