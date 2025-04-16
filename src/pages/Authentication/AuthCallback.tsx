import { useEffect } from 'react';

const AuthCallback = () => {
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const idToken = hashParams.get('id_token');
    const error = hashParams.get('error');

    if (accessToken && idToken) {
      fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      .then(data => {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH',
            accessToken,
            idToken,
            email: data.email,
            error: null,
          },
          window.location.origin
        );
      })
      .catch(error => {
        console.error('Auth error:', error);
        window.opener.postMessage({
          type: 'GOOGLE_AUTH',
          error: 'Failed to fetch user info'
        }, window.location.origin);
      });
    } else if (idToken) {
      // Decode the ID token
      const [, payload] = idToken.split('.');
      const decodedData = JSON.parse(atob(payload));
      
      // Verify email domain
      if (!decodedData.email?.toLowerCase().endsWith('vitapstudent.ac.in')) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH',
            error: 'Please use your VIT-AP student email (@vitapstudent.ac.in)',
          },
          window.location.origin
        );
        window.close();
        return;
      }

      // Only send what backend needs
      window.opener.postMessage(
        {
          type: 'GOOGLE_AUTH',
          idToken,
          email: decodedData.email,
          error: null,
        },
        window.location.origin
      );
      window.close();
    } else if (error) {
      window.opener.postMessage(
        {
          type: 'GOOGLE_AUTH',
          error: 'Authentication failed',
        },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return null;
};

export default AuthCallback;