import React from 'react';

import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/shared/auth/contexts/auth.context';

import Screens from './src/screens';
import {QueryClient, QueryClientProvider} from 'react-query';
import {FriendsProvider} from './src/shared/friends/contexts/friends.context';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <FriendsProvider>
          <SafeAreaProvider>
            <PaperProvider>
              <Screens />
            </PaperProvider>
          </SafeAreaProvider>
        </FriendsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
