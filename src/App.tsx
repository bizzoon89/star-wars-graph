import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PeopleList from '@/features/people/PeopleList';

//  Initialize React Query client (for caching and request control)
const queryClient = new QueryClient();

/**
 * Root application component.
 * Initializes React Query provider and renders the main PeopleList feature.
 */

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen bg-gray-900 text-gray-100 p-6'>
        <h1 className='text-3xl font-bold text-center mb-8'>Star Wars Heroes Graph Viewer</h1>
        <PeopleList />
      </div>
    </QueryClientProvider>
  );
}
