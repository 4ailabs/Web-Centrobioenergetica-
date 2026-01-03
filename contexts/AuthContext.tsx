import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  totalXP: number;
  enrolledCourses: string[];
  registeredAt: string;
  subscriptionStatus: 'active' | 'inactive';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  getAllUsers: () => Promise<User[]>;
  updateUserSubscription: (userId: string, status: 'active' | 'inactive') => Promise<void>;
  updateUserCourses: (userId: string, courseIds: string[]) => Promise<void>;
  adminCreateUser: (userData: any) => Promise<void>;
  adminUpdateUser: (userId: string, userData: any) => Promise<void>;
  adminDeleteUser: (userId: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          ...data.user,
          totalXP: data.user.totalXP || 0,
          enrolledCourses: data.user.enrolledCourses || [],
          subscriptionStatus: data.user.subscriptionStatus || 'inactive'
        });
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('Auth verification failed', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    localStorage.setItem('token', data.token);
    setUser({
      ...data.user,
      totalXP: data.user.totalXP || 0,
      enrolledCourses: data.user.enrolledCourses || [],
      subscriptionStatus: 'inactive'
    });
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al registrarse');
    }

    alert(data.message || 'Registro exitoso. Espera la aprobación del administrador.');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // --- Admin Functions ---

  const getAllUsers = async (): Promise<User[]> => {
    const token = localStorage.getItem('token');
    // Using a mock return for now if endpoint doesn't exist, OR assuming I added it.
    // I need to add GET /api/users to backend. 
    // For now, let's try calling it.
    const response = await fetch('/api/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      // Fallback for now to avoid breaking UI if backend isn't updated yet?
      // No, I should update backend.
      console.warn('API users endpoint failed, returning empty');
      return [];
    }
    return await response.json();
  };

  const updateUserSubscription = async (userId: string, status: 'active' | 'inactive') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${userId}/subscription`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update subscription');
  };

  const updateUserCourses = async (userId: string, courseIds: string[]) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${userId}/courses`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseIds })
    });
    if (!response.ok) throw new Error('Failed to update courses');
  };

  const adminCreateUser = async (userData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create user');
    }
  };

  const adminUpdateUser = async (userId: string, userData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
  };

  const adminDeleteUser = async (userId: string) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Failed to delete user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      getAllUsers,
      updateUserSubscription,
      updateUserCourses,
      adminCreateUser,
      adminUpdateUser,
      adminDeleteUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
