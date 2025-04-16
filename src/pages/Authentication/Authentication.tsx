import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const nonce = Math.random().toString(36).substring(2);
      sessionStorage.setItem('auth_nonce', nonce);

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&response_type=id_token` +
        `&redirect_uri=${window.location.origin}/auth/callback` +
        `&scope=email profile` +
        `&hd=vitapstudent.ac.in` + // This ensures only VIT-AP domains
        `&nonce=${nonce}` +
        `&prompt=select_account`;

      console.log('Auth URL:', googleAuthUrl); // Debug log

      const popup = window.open(
        googleAuthUrl,
        'Google Login',
        'width=500,height=600,left=0,top=0'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      const result = await new Promise<{idToken: string, email: string}>(
        (resolve, reject) => {
          const messageHandler = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data.type === 'GOOGLE_AUTH') {
              window.removeEventListener('message', messageHandler);
              if (event.data.error) {
                reject(new Error(event.data.error));
              } else {
                resolve({
                  idToken: event.data.idToken,
                  email: event.data.email
                });
              }
            }
          };
          window.addEventListener('message', messageHandler);
        }
      );

      // Send ID token to backend for verification and JWT creation
      const response = await fetch('https://firm-bluegill-engaged.ngrok-free.app/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idToken: result.idToken,
          email: result.email 
        })
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      if (data.success) {
        // Data structure from backend: { success: true, accessToken, user: userData }
        login({
          email: data.user.email,
          token: data.accessToken, // Changed from data.token to data.accessToken
          uid: data.user.uid,
          name: data.user.name,
          picture: data.user.profilePicture // Changed from picture to profilePicture
        });
        
        navigate('/', { replace: true });
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent rendering the auth page if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md transform transition-all duration-300 ease-in-out hover:scale-105">
        <Card className="shadow-xl border-t-4 border-t-[#3b1c4d]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b1c4d] to-[#6b4d8d]">
              Welcome to Trovia
            </CardTitle>
            <CardDescription className="text-center">
              Sign in with your VIT-AP Google account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {isLoading ? (
                'Signing in...'
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                  </svg>
                  Continue with VIT-AP Google
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Authentication;