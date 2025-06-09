import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Provider as PaperProvider,
  BottomNavigation as Screens,
  Text,
} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ChatsScreen from './src/screens/chats';
import {NativeRouter, Route, Routes} from 'react-router-native';
import ChatScreen from './src/screens/chat';

interface NavRoute {
  key: string;
  title: string;
  focusedIcon: string;
}

const ChatsRoute = () => <ChatsScreen />;

const CallsRoute = () => <Text>Calls</Text>;

const PeopleRoute = () => <Text>People</Text>;

const StoriesRoute = () => <Text>Stories</Text>;

function App(): React.JSX.Element {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<NavRoute[]>([
    {
      key: 'chats',
      title: 'Chats',
      focusedIcon: 'chat',
    },
    {key: 'calls', title: 'Calls', focusedIcon: 'video'},
    {key: 'people', title: 'People', focusedIcon: 'account'},
    {key: 'stories', title: 'Stories', focusedIcon: 'book'},
  ]);

  const renderScene = Screens.SceneMap({
    chats: ChatsRoute,
    calls: CallsRoute,
    people: PeopleRoute,
    stories: StoriesRoute,
  });

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NativeRouter>
          <SafeAreaView style={styles.container}>
            <Routes>
              {/* Screens */}
              <Route
                path="/"
                element={
                  <Screens
                    navigationState={{index, routes}}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                  />
                }
              />

              {/* Chat */}
              <Route path="/chat/:chatId" element={<ChatScreen />} />
            </Routes>
          </SafeAreaView>
        </NativeRouter>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
