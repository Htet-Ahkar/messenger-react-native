import {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';

import {Button} from 'react-native-paper';

import {AuthContext} from '../../auth/contexts/auth.context';
import {FriendsContext} from '../contexts/friends.context';
import Friend from './Friend';
import Loader from '../../components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  showMessage?: boolean;
};

const Friends = ({showMessage = false}: Props) => {
  const {onLogout} = useContext(AuthContext);
  const {friends, isLoading} = useContext(FriendsContext);

  if (isLoading) {
    return <Loader dark />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {friends.length > 0 ? (
        friends.map(friend => (
          <Friend key={friend.id} friend={friend} showMessage={showMessage} />
        ))
      ) : (
        <Text>No friends</Text>
      )}

      {/* TEMP */}
      {showMessage && <Button onPress={onLogout}>Sign Out</Button>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Friends;
