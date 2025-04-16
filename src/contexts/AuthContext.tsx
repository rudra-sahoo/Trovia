import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  uid: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  accessToken: string | null;
  userId: string | null;
  userName: string | null;
  userPicture: string | null;
  login: (credentials: {
    email: string;
    token: string;
    uid: string;
    name: string;
    picture: string;
  }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  accessToken: null,
  userId: null,
  userName: null,
  userPicture: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);

  useEffect(() => {
    // Load all stored values
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
    const picture = localStorage.getItem('userPicture');
    
    if (email?.endsWith('@vitapstudent.ac.in') && token) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setAccessToken(token);
      setUserId(uid);
      setUserName(name);
      setUserPicture(picture);
    }
  }, []);

  const login = ({ email, token, uid, name, picture }: {
    email: string;
    token: string;
    uid: string;
    name: string;
    picture: string;
  }) => {
    // Update domain check to be case insensitive
    if (!email?.toLowerCase().endsWith('vitapstudent.ac.in')) {
      console.error('Invalid email domain:', email);
      throw new Error('Please use your VIT-AP student email (@vitapstudent.ac.in)');
    }

    console.log('Login credentials:', { email, uid, name }); // Debug log

    setIsAuthenticated(true);
    setUserEmail(email);
    setAccessToken(token);
    setUserId(uid);
    setUserName(name);
    setUserPicture(picture);

    // Store each field separately
    localStorage.setItem('userEmail', email);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userId', uid);
    localStorage.setItem('userName', name);
    localStorage.setItem('userPicture', picture);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setAccessToken(null);
    setUserId(null);
    setUserName(null);
    setUserPicture(null);
    
    // Clear all stored values
    localStorage.removeItem('userEmail');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPicture');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userEmail, 
      accessToken,
      userId,
      userName,
      userPicture,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);