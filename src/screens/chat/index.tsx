import {StyleSheet, Text, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigate, useParams} from 'react-router-native';

const ChatScreen = () => {
  const {chatId} = useParams();
  const navigate = useNavigate();

  console.log('test');

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate('/')} />
      </Appbar.Header>

      <View style={styles.chatContainer}>
        <Text>ChatId: {chatId}</Text>
      </View>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
  },
});

export default ChatScreen;
