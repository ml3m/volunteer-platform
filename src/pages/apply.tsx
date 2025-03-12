import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

const ApplyAsVolunteer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [motivation, setMotivation] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, motivation, experience }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application submission failed');
      }

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg-primary py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="h-16 relative mx-auto w-64">
            <Image 
              src="/images/oraluirobert_logo.png" 
              alt="Logo" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 px-4 py-6 rounded-md">
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="mb-4">Thank you for applying to be a volunteer. We will review your application and contact you via email.</p>
            <Link href="/" className="font-medium text-[#00D9CF] dark:text-dark-brand-turquoise hover:text-[#00C5E3] dark:hover:text-dark-brand-teal">
              Return to home page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg-primary py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md bg-white dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-primary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="h-16 relative mx-auto w-64">
            <Image 
              src="/images/oraluirobert_logo.png" 
              alt="Logo" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary">
            Apply as Volunteer
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[#00D9CF] dark:text-dark-brand-turquoise hover:text-[#00C5E3] dark:hover:text-dark-brand-teal">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-border placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text-primary dark:bg-dark-bg-tertiary rounded-t-md focus:outline-none focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise focus:border-[#00D9CF] dark:focus:border-dark-brand-turquoise focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-border placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text-primary dark:bg-dark-bg-tertiary focus:outline-none focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise focus:border-[#00D9CF] dark:focus:border-dark-brand-turquoise focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-border placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text-primary dark:bg-dark-bg-tertiary focus:outline-none focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise focus:border-[#00D9CF] dark:focus:border-dark-brand-turquoise focus:z-10 sm:text-sm"
                placeholder="Phone number (optional)"
              />
            </div>
            <div>
              <label htmlFor="motivation" className="sr-only">Motivation</label>
              <textarea
                id="motivation"
                name="motivation"
                required
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={4}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-border placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text-primary dark:bg-dark-bg-tertiary focus:outline-none focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise focus:border-[#00D9CF] dark:focus:border-dark-brand-turquoise focus:z-10 sm:text-sm"
                placeholder="Why do you want to volunteer with us?"
              />
            </div>
            <div>
              <label htmlFor="experience" className="sr-only">Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={4}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-border placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-dark-text-primary dark:bg-dark-bg-tertiary rounded-b-md focus:outline-none focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise focus:border-[#00D9CF] dark:focus:border-dark-brand-turquoise focus:z-10 sm:text-sm"
                placeholder="Describe any relevant experience (optional)"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#00D9CF] dark:bg-dark-brand-turquoise hover:bg-[#00C5E3] dark:hover:bg-dark-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D9CF] dark:focus:ring-dark-brand-turquoise disabled:opacity-70"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyAsVolunteer; 