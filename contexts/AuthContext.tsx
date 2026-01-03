import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database (localStorage)
const MOCK_USERS_KEY = 'mock_users_db';
const AUTH_TOKEN_KEY = 'auth_token';
const CURRENT_USER_KEY = 'current_user';

// Initialize with demo users
const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
  if (!existingUsers) {
    const demoUsers = [
      {
        id: '1',
        email: 'alumno@instituto.com',
        password: 'alumno123',
        name: 'María González',
        isAdmin: false,
        totalXP: 2450,
        enrolledCourses: ['1', '2', '3'],
        registeredAt: new Date('2025-01-15').toISOString(),
        subscriptionStatus: 'active',
      },
      {
        id: '2',
        email: 'admin@instituto.com',
        password: 'admin123',
        name: 'Dr. Carlos Ruiz',
        isAdmin: true,
        totalXP: 5000,
        enrolledCourses: ['1', '2', '3', '4', '5'],
        registeredAt: new Date('2024-06-01').toISOString(),
        subscriptionStatus: 'active',
      },
      {
        id: '3',
        email: 'estudiante@instituto.com',
        password: 'estudiante123',
        name: 'Juan Pérez',
        isAdmin: false,
        totalXP: 1200,
        enrolledCourses: ['1', '4'],
        registeredAt: new Date('2025-11-20').toISOString(),
        subscriptionStatus: 'inactive',
      },
    ];
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(demoUsers));
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeMockUsers();

    // Check for existing session
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user session:', error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);
          const foundUser = users.find(
            (u: any) => u.email === email && u.password === password
          );

          if (!foundUser) {
            reject(new Error('Email o contraseña incorrectos'));
            return;
          }

          // Remove password from user object
          const { password: _, ...userWithoutPassword } = foundUser;

          // Create mock token
          const token = `mock_token_${Date.now()}_${foundUser.id}`;

          // Save session
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

          setUser(userWithoutPassword);
          resolve();
        } catch (error) {
          reject(new Error('Error al procesar el inicio de sesión'));
        }
      }, 500); // Simulate network delay
    });
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);

          // Check if email already exists
          if (users.some((u: any) => u.email === email)) {
            reject(new Error('Este email ya está registrado'));
            return;
          }

          // Create new user
          const newUser = {
            id: `${Date.now()}`,
            email,
            password,
            name,
            isAdmin: false,
            totalXP: 0,
            enrolledCourses: [],
            registeredAt: new Date().toISOString(),
            subscriptionStatus: 'inactive',
          };

          users.push(newUser);
          localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

          resolve();
        } catch (error) {
          reject(new Error('Error al registrar usuario'));
        }
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  const getAllUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const usersData = localStorage.getItem(MOCK_USERS_KEY);
        if (!usersData) {
          resolve([]);
          return;
        }
        const users = JSON.parse(usersData);
        // Remove passwords
        const usersWithoutPasswords = users.map((u: any) => {
          const { password, ...rest } = u;
          return rest;
        });
        resolve(usersWithoutPasswords);
      }, 300);
    });
  };

  const updateUserSubscription = async (userId: string, status: 'active' | 'inactive'): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);
          const userIndex = users.findIndex((u: any) => u.id === userId);

          if (userIndex === -1) {
            reject(new Error('Usuario no encontrado'));
            return;
          }

          users[userIndex].subscriptionStatus = status;
          localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

          // Update current user session if it matches and is active
          if (user && user.id === userId) {
            const updatedUser = { ...user, subscriptionStatus: status };
            setUser(updatedUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
          }

          resolve();
        } catch (error) {
          reject(new Error('Error al actualizar suscripción'));
        }
      }, 300);
    });
  };

  const updateUserCourses = async (userId: string, courseIds: string[]): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);
          const userIndex = users.findIndex((u: any) => u.id === userId);

          if (userIndex === -1) {
            reject(new Error('Usuario no encontrado'));
            return;
          }

          users[userIndex].enrolledCourses = courseIds;
          localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

          // Update current user session if it matches
          if (user && user.id === userId) {
            const updatedUser = { ...user, enrolledCourses: courseIds };
            setUser(updatedUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
          }

          resolve();
        } catch (error) {
          reject(new Error('Error al actualizar cursos'));
        }
      }, 300);
    });
  };

  const adminCreateUser = async (userData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);

          if (users.some((u: any) => u.email === userData.email)) {
            reject(new Error('Este email ya está registrado'));
            return;
          }

          const newUser = {
            id: `${Date.now()}`,
            email: userData.email,
            password: userData.password, // In a real app, hash this!
            name: userData.name,
            isAdmin: userData.isAdmin || false,
            totalXP: 0,
            enrolledCourses: [],
            registeredAt: new Date().toISOString(),
            subscriptionStatus: userData.subscriptionStatus || 'inactive',
          };

          users.push(newUser);
          localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
          resolve();
        } catch (error) {
          reject(new Error('Error al crear usuario'));
        }
      }, 500);
    });
  };

  const adminUpdateUser = async (userId: string, userData: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const usersData = localStorage.getItem(MOCK_USERS_KEY);
          if (!usersData) {
            reject(new Error('Sistema de usuarios no inicializado'));
            return;
          }

          const users = JSON.parse(usersData);
          const userIndex = users.findIndex((u: any) => u.id === userId);

          if (userIndex === -1) {
            reject(new Error('Usuario no encontrado'));
            return;
          }

          // Update fields
          users[userIndex] = { ...users[userIndex], ...userData };

          // Don't update ID or enrolledCourses (handled separately) unless specifically needed, 
          // generally we just merge what is passed. 
          // Note: If updating email, should technically check for duplicates but skipping for mock simplicity unless requested.

          localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

          // If updating current user
          if (user && user.id === userId) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
          }

          resolve();
        } catch (error) {
          reject(new Error('Error al actualizar usuario'));
        }
      }, 300);
    });
  };

  return (
    <AuthContext.Provider
      value={{
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
        isAuthenticated: !!user,
      }}
    >
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
