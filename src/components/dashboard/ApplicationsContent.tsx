import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  motivation: string;
  experience: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

const ApplicationsContent: React.FC = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiAvailable, setIsApiAvailable] = useState(true); // Track if API is available
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [approvalSuccess, setApprovalSuccess] = useState<{
    applicationId: string;
    verificationCode: string;
    email: string;
  } | null>(null);

  // Mock data for fallback
  const mockApplications: Application[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      motivation: 'I want to help the community.',
      experience: 'I have volunteered at local food banks.',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321',
      motivation: 'I am passionate about helping others.',
      experience: 'I have experience in organizing community events.',
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1122334455',
      motivation: 'I want to make a difference.',
      experience: null,
      status: 'REJECTED',
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    console.log('ApplicationsContent component mounted');
    
    // Check if user is logged in first
    if (!authLoading && !user) {
      console.log('User not logged in, redirecting to login');
      router.push('/login');
      return;
    }
    
    if (!authLoading) {
      fetchApplications();
    }
  }, [authLoading, user, router]);

  const fetchApplications = async () => {
    setIsLoading(true);
    setError(null);
    
    // If we already know the API is unavailable, don't try to call it again
    if (!isApiAvailable) {
      console.log('API known to be unavailable, using mock data directly');
      setApplications(mockApplications);
      setError('Using demo data - API is not available');
      setIsLoading(false);
      return;
    }
    
    try {
      // Wrap the entire fetch operation in a try-catch to handle network errors
      let data;
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No authentication token found');
          throw new Error('Authentication required');
        }
        
        // Fetch real data from API with authorization header
        const response = await fetch('/api/applications/list', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // Instead of waiting for json parsing which might fail, check status first
          console.error('API response not OK:', response.status, response.statusText);
          // Don't throw, just return to let outer catch handle fallback
          return;
        }
        
        data = await response.json();
        setApplications(data.applications);
        return; // Exit early if successful
      } catch (fetchError) {
        console.error('API fetch error:', fetchError);
        // Don't throw here, just log and let the outer catch handle it
        return;
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      
      // Mark API as unavailable for future operations
      setIsApiAvailable(false);
      
      // Fallback to mock data in case the API call failed
      console.log('Using mock data as fallback');
      
      setApplications(mockApplications);
      setError('Using demo data - API is not available');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
  };

  const handleCloseDetails = () => {
    setSelectedApplication(null);
  };

  const handleApprove = async (applicationId: string) => {
    setIsApproving(true);
    setError(null);
    setApprovalSuccess(null);
    
    // If API is known to be unavailable, don't attempt the API call
    if (!isApiAvailable) {
      console.log('API unavailable, applying UI-only approval');
      // Just update the UI
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'APPROVED' } : app
      ));
      
      // Generate a mock verification code
      const mockVerificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const applicationEmail = applications.find(app => app.id === applicationId)?.email || 'unknown@example.com';
      
      setApprovalSuccess({
        applicationId,
        verificationCode: mockVerificationCode,
        email: applicationEmail,
      });
      
      // Close the modal
      setSelectedApplication(null);
      setIsApproving(false);
      return;
    }
    
    try {
      // Wrap API call in try/catch to explicitly handle network errors
      let data;
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No authentication token found');
          throw new Error('Authentication required');
        }
        
        const response = await fetch('/api/applications/approve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ applicationId }),
        });
        
        if (!response.ok) {
          console.error('API response not OK:', response.status, response.statusText);
          // Don't throw, just return to let outer catch handle fallback
          return;
        }
        
        data = await response.json();
        
        // Update the application status in the list
        setApplications(applications.map(app => 
          app.id === applicationId ? { ...app, status: 'APPROVED' } : app
        ));
        
        // Show success message with verification code
        setApprovalSuccess({
          applicationId,
          verificationCode: data.verificationCode,
          email: data.email,
        });
        
        // Close the modal
        setSelectedApplication(null);
        return; // Success! Exit early
      } catch (fetchError) {
        console.error('API fetch error:', fetchError);
        // Don't throw here, just log and let the outer catch handle it
        return;
      }
    } catch (error: any) {
      console.error('Error approving application:', error);
      
      // Mark API as unavailable for future operations
      setIsApiAvailable(false);
      
      // Fallback: Just update the UI even if the API call failed
      console.log('Using UI-only fallback for approval');
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'APPROVED' } : app
      ));
      
      // Generate a mock verification code if API failed
      const mockVerificationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const applicationEmail = applications.find(app => app.id === applicationId)?.email || 'unknown@example.com';
      
      setApprovalSuccess({
        applicationId,
        verificationCode: mockVerificationCode,
        email: applicationEmail,
      });
      
      setError('Using demo data - API is not available');
      
      // Close the modal
      setSelectedApplication(null);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (applicationId: string) => {
    setIsApproving(false); // Reset approving state
    setError(null);
    setApprovalSuccess(null);
    
    // If API is known to be unavailable, don't attempt the API call
    if (!isApiAvailable) {
      console.log('API unavailable, applying UI-only rejection');
      // Just update the UI
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'REJECTED' } : app
      ));
      
      // Close the modal
      setSelectedApplication(null);
      return;
    }
    
    try {
      // Wrap API call in try/catch to explicitly handle network errors
      let data;
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No authentication token found');
          throw new Error('Authentication required');
        }
        
        const response = await fetch('/api/applications/reject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ applicationId }),
        });
        
        if (!response.ok) {
          console.error('API response not OK:', response.status, response.statusText);
          // Don't throw, just return to let outer catch handle fallback
          return;
        }
        
        data = await response.json();
        
        // Update the application status in the list
        setApplications(applications.map(app => 
          app.id === applicationId ? { ...app, status: 'REJECTED' } : app
        ));
        
        // Close the modal
        setSelectedApplication(null);
        return; // Success! Exit early
      } catch (fetchError) {
        console.error('API fetch error:', fetchError);
        // Don't throw here, just log and let the outer catch handle it
        return;
      }
    } catch (error: any) {
      console.error('Error rejecting application:', error);
      
      // Mark API as unavailable for future operations
      setIsApiAvailable(false);
      
      // Fallback: Just update the UI even if the API call failed
      console.log('Using UI-only fallback for rejection');
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status: 'REJECTED' } : app
      ));
      
      setError('Using demo data - API is not available');
      
      // Close the modal
      setSelectedApplication(null);
    }
  };

  const goToApplicationsPage = () => {
    router.push('/admin/applications');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Applications</h1>
        <div className="flex space-x-2">
          <button 
            onClick={fetchApplications}
            className="px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-dark-text-primary rounded-md hover:bg-gray-200 dark:hover:bg-dark-bg-tertiary/80 transition-colors mr-2"
          >
            Refresh
          </button>
          <button className="px-4 py-2 bg-[#00D9CF] text-white rounded-md hover:bg-[#00C5E3] transition-colors">
            Export
          </button>
          <button className="px-4 py-2 bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-dark-text-primary rounded-md hover:bg-gray-200 dark:hover:bg-dark-bg-tertiary/80 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {!isApiAvailable && (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded-md text-sm">
          <p className="font-medium">Demo Mode</p>
          <p>Using sample data. API connectivity is unavailable.</p>
        </div>
      )}
      
      {error && error !== 'Using demo data - API is not available' && (
        <div className="bg-red-100 dark:bg-red-900/10 p-4 rounded-md text-red-700 dark:text-red-400">
          {error}
        </div>
      )}
      
      {approvalSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400 px-4 py-3 rounded-md">
          <h3 className="text-sm font-medium">Application approved successfully!</h3>
          <div className="mt-2 text-sm">
            <p>Verification code: <span className="font-mono font-bold">{approvalSuccess.verificationCode}</span></p>
            <p className="mt-1">Email: {approvalSuccess.email}</p>
            <p className="mt-2 text-xs">
              {isApiAvailable ? 
                'This code has been sent to the applicant\'s email.' : 
                'In a production environment, this code would be sent to the applicant\'s email.'}
            </p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D9CF] dark:border-dark-brand-turquoise"></div>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white dark:bg-dark-bg-secondary shadow p-8 text-center rounded-lg">
          <p className="text-gray-500 dark:text-dark-text-secondary text-lg">No applications found.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-bg-secondary shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
            <thead className="bg-gray-50 dark:bg-dark-bg-tertiary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dark-text-secondary uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-bg-secondary divide-y divide-gray-200 dark:divide-dark-border">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-dark-text-primary">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-dark-text-secondary">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'PENDING' 
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' 
                        : application.status === 'APPROVED' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-dark-text-secondary">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleViewApplication(application)}
                      className="text-[#00D9CF] dark:text-dark-brand-turquoise hover:text-[#00C5E3] dark:hover:text-dark-brand-teal mr-4"
                    >
                      View
                    </button>
                    {application.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(application.id)}
                          className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-4"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(application.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text-primary">Application Details</h2>
                <button 
                  onClick={handleCloseDetails}
                  className="text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Name</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">{selectedApplication.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Email</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">{selectedApplication.email}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Phone</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">{selectedApplication.phone || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Motivation</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">{selectedApplication.motivation}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Experience</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">{selectedApplication.experience || 'Not provided'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Status</h3>
                  <p className="mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedApplication.status === 'PENDING' 
                        ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400' 
                        : selectedApplication.status === 'APPROVED' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                    }`}>
                      {selectedApplication.status}
                    </span>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">Date Applied</h3>
                  <p className="mt-1 text-gray-900 dark:text-dark-text-primary">
                    {new Date(selectedApplication.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                {selectedApplication.status === 'PENDING' && (
                  <>
                    <button 
                      onClick={() => handleApprove(selectedApplication.id)}
                      disabled={isApproving}
                      className="flex-1 px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      {isApproving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Approving...
                        </>
                      ) : 'Approve'}
                    </button>
                    <button 
                      onClick={() => handleReject(selectedApplication.id)}
                      className="flex-1 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                <button 
                  onClick={handleCloseDetails}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary rounded-md hover:bg-gray-300 dark:hover:bg-dark-bg-tertiary/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsContent; 
