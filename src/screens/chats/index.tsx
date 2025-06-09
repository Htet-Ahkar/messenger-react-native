import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useNavigate} from 'react-router-native';

const friends = [
  {id: 1, name: 'Jhon'},
  {id: 2, name: 'Larry'},
  {id: 3, name: 'Berry'},
];
const ChatsScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      {friends.map(friend => (
        <Pressable
          key={friend.id}
          onPress={() => navigate(`/chat/${friend.id}`)}>
          <View style={styles.friend}>
            <Avatar.Image
              size={72}
              style={styles.profilePic}
              source={{
                uri: `https://randomuser.me/api/portraits/men/${friend.id}.jpg`,
              }}
            />

            <View>
              <Text>{friend.name}</Text>
              <Text>This was the last message | Sun</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  friend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePic: {
    marginRight: 8,
  },
});

export default ChatsScreen;
