import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useMemo,
} from 'react';

import {useQuery} from 'react-query';
import SocketIOClient from 'socket.io-client';

import getFriends from '../helpers/friends';
import {getFriendRequests} from '../../../screens/people/requests';
import {AuthContext} from '../../auth/contexts/auth.context';
import {UserDetails} from '../../auth/models';
import {ActiveFriend, CallActivity, CallDetails, CallResponse} from '../models';

export interface IFriendsContext {
  friends: ActiveFriend[];
  friend: ActiveFriend;
  isLoading: boolean;
  callDetails: CallDetails | null;
  callActivity: CallActivity;
  setFriend: (friend: ActiveFriend) => void;
  setCallDetails: (callDetails: CallDetails | null) => void;
  setCallActivity: (callActivity: CallActivity) => void;
  startCall: (details: CallDetails) => void;
  respondToCall: (response: CallResponse) => void;
}

export const FriendsContext = createContext<IFriendsContext>({
  friends: [],
  friend: {} as ActiveFriend,
  isLoading: false,
  callDetails: null,
  callActivity: CallActivity.None,
  setFriend: () => null,
  setCallDetails: () => null,
  setCallActivity: () => null,
  startCall: () => null,
  respondToCall: () => null,
});

export const FriendsProvider = ({children}: {children: ReactNode}) => {
  const {isActive, jwt, isLoggedIn, userDetails} = useContext(AuthContext);

  const [friends, setFriends] = useState<ActiveFriend[]>([]);
  const [friend, setFriend] = useState<ActiveFriend>({} as ActiveFriend);
  const [isLoading, setIsLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<CallDetails | null>(null);
  const [callActivity, setCallActivity] = useState<CallActivity>(
    CallActivity.None,
  );

  const chatBaseUrl = `http://${'10.0.2.2'}:7000`;

  const chatSocket = useMemo(
    () =>
      SocketIOClient(chatBaseUrl, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, chatBaseUrl],
  );

  const startCall = (details: CallDetails) => {
    chatSocket.emit('startCall', details);
  };

  useQuery(
    'friendRequests',
    async () => {
      setIsLoading(true);

      const friendRequests = await getFriendRequests();

      const _friends = getFriends(
        friendRequests,
        (userDetails as UserDetails).id,
      );

      const activeFriends: ActiveFriend[] = _friends.map(f => ({
        ...f,
        isActive: false,
      }));

      setFriends(activeFriends);

      return _friends;
    },
    {
      enabled: isLoggedIn,
      onSettled: () => {
        setIsLoading(false);
      },
    },
  );

  const presenceBaseUrl = `http://${'10.0.2.2'}:6000`;

  const presenceSocket = useMemo(
    () =>
      SocketIOClient(presenceBaseUrl, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: jwt,
            },
          },
        },
      }),
    [jwt, presenceBaseUrl],
  );

  useEffect(() => {
    presenceSocket.emit('updateActiveStatus', isActive);

    presenceSocket.on(
      'friendActive',
      ({id, isActive: isFriendActive}: {id: number; isActive: boolean}) => {
        setFriends(prevFriends => {
          if (userDetails?.id === id) return prevFriends;

          const updatedFriends = [...prevFriends];
          const activeFriend = updatedFriends.find(f => f.id === id);

          if (!activeFriend) return prevFriends;

          activeFriend.isActive = isFriendActive; //! I don't like this kind of mutation

          return updatedFriends;
        });

        // This avoid mutation
        // setFriends(prevFriends =>
        //   prevFriends.map(f =>
        //     f.id === id ? {...f, isActive: isFriendActive} : f,
        //   ),
        // );
      },
    );

    return () => {
      presenceSocket.emit('updateActiveStatus', false);
      presenceSocket.off('friendActive');
    };
  }, [presenceSocket, isActive, userDetails]);

  const respondToCall = (response: CallResponse) => {
    if (!callDetails) return;

    if (response === CallResponse.Accepted) {
      chatSocket.emit('acceptCall', callDetails.friendId);
    } else {
      chatSocket.emit('declineCall', callDetails.friendId);
    }
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        friend,
        isLoading,
        callDetails,
        callActivity,
        setFriend,
        setCallDetails,
        setCallActivity,
        startCall,
        respondToCall,
      }}>
      {children}
    </FriendsContext.Provider>
  );
};
