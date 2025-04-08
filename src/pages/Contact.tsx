import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    subject: '',
    message: ''
  });

  const generateMessageId = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates 4-digit number
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: null });

    try {
      const db = getFirestore();
      const messageId = generateMessageId();
      const messageRef = doc(db, 'users', user?.uid || 'anonymous', 'contact', messageId);
      
      await setDoc(messageRef, {
        ...formData,
        timestamp: new Date(),
        status: 'pending'
      });

      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully!'
      });

      // Reset form
      setFormData(prev => ({
        ...prev,
        name: '',
        subject: '',
        message: ''
      }));

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign in Required</CardTitle>
            <CardDescription>Please sign in to contact us</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl border-t-4 border-t-[#3b1c4d]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#3b1c4d] to-[#6b4d8d]">
              Contact Us
            </CardTitle>
            <CardDescription className="text-center">
              We'd love to hear from you
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitStatus.message && (
              <Alert 
                variant={submitStatus.type === 'success' ? 'default' : 'destructive'}
                className={`mb-4 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : ''}`}
              >
                {submitStatus.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{submitStatus.message}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Your message"
                  rows={5}
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#3b1c4d] hover:bg-[#281f2c] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;