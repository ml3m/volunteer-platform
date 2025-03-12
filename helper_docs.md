## How to Mark Future Tabs for Different Roles

To restrict future tabs to specific roles, follow these steps:

1. **Update the Role-Based Access Map**:
   ```typescript
   // In both Sidebar.tsx and DashboardLayout.tsx
   const roleBasedAccessMap: Record<ContentType, string[]> = {
     // Existing tabs
     existingTab: ['ADMIN', 'VOLUNTEER'],
     
     // Add your new tab
     newFeature: ['ADMIN', 'COORDINATOR'], // Only admins and coordinators can access
   };
   ```

2. **Add the New Type to ContentType**:
   ```typescript
   type ContentType = 'dashboard' | 'volunteers' | /* existing types */ | 'newFeature';
   ```

3. **Add the Tab to the Sidebar**:
   ```typescript
   {hasAccess('newFeature') && (
     <NavItem 
       icon={<NewFeatureIcon className="w-5 h-5" />} 
       label="New Feature" 
       contentType="newFeature"
       active={activeContent === 'newFeature'}
       onNavigate={handleNavigation}
       hasAccess={hasAccess('newFeature')}
     />
   )}
   ```

4. **Create the Component and Add it to DashboardLayout**:
   ```typescript
   // In the renderContent function
   case 'newFeature':
     return <NewFeatureContent />;
   ```

5. **Add Role-Based Protection to Component Level** (recommended):
   ```typescript
   // In your new component
   useEffect(() => {
     if (!authLoading && user && user.role !== 'ADMIN' && user.role !== 'COORDINATOR') {
       setAccessDenied(true);
       setTimeout(() => {
         router.push('/');
       }, 3000);
       return;
     }
     
     // Continue with component initialization
   }, [authLoading, user, router]);
   ```

This multi-layered approach ensures that:
1. Users only see tabs they have access to
2. They can't navigate to restricted content through the sidebar
3. They can't access restricted content directly through URLs
4. The components themselves verify user roles as a final security layer

With these changes, the Applications tab is now only visible to administrators, and you have a framework to easily add role-based restrictions to any future tabs.
