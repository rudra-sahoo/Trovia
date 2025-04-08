import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Spinner } from '../components/ui/spinner';
import { useAuth } from '../contexts/AuthContext';

const Authentication: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAndNavigate = async () => {
      if (user?.email?.endsWith('vitapstudent.ac.in')) {
        navigate('/');
      } else if (user) {
        // If user exists but email doesn't match, sign them out
        await auth.signOut();
        localStorage.clear();
        sessionStorage.clear();
        setError('Only VIT-AP student email addresses (@vitapstudent.ac.in) are allowed to sign in.');
      }
    };

    checkAndNavigate();
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const email = result.user.email;
      if (!email || !email.endsWith('vitapstudent.ac.in')) {
        // Revoke the token
        if (result.credential) {
          await GoogleAuthProvider.credentialFromResult(result)?.delete();
        }
        // Sign out the user
        await auth.signOut();
        // Clear any stored data
        localStorage.clear();
        sessionStorage.clear();
        // Set error message
        setError('Only VIT-AP student email addresses (@vitapstudent.ac.in) are allowed to sign in.');
        return;
      }
      
      navigate('/');
    } catch (error: any) {
      console.error('Authentication error:', error);
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked by your browser. Please allow pop-ups for this site.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with the same email address but different sign-in credentials.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
              <Alert variant="destructive" className="w-full animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Signing in...
                </>
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