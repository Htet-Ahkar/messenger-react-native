import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  COLOR_FB_PRIMARY,
  COLOR_FB_SECONDARY,
  COLOR_WHITE,
} from '../../shared/constants/colors';
import {useNavigate} from 'react-router-native';
import Input from '../../shared/components/Input';
import {Button} from 'react-native-paper';
import {useMutation} from 'react-query';
import {NewUser} from '../../shared/auth/models';
import {register} from '../../shared/auth/requests';
import Loader from '../../shared/components/Loader';

const RegisterScreen = () => {
  const registerMutation = useMutation(
    (newUser: NewUser) => register(newUser),
    {
      onSuccess: () => {
        resetForm();
        navigate('/login');
      },
    },
  );

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = () => {
    if (!firstName || !lastName || !email || !password) return;

    registerMutation.mutate({firstName, lastName, email, password});
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>facebook</Text>

        {/* First Name */}
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Last Name */}
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        {/* Email */}
        <Input placeholder="Email" value={email} onChangeText={setEmail} />

        {/* Passwrod */}
        <Input
          secure
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.registerButtonContainer}>
          {registerMutation.isLoading ? (
            <Loader />
          ) : (
            <Button
              style={styles.registerButton}
              labelStyle={styles.registerButtonText}
              mode="contained"
              onPress={registerHandler}>
              Register
            </Button>
          )}
        </View>
      </View>

      <Button labelStyle={styles.signUpText} onPress={() => navigate('/login')}>
        Already a member? Log In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLOR_FB_PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  facebookText: {
    fontSize: 56,
    fontWeight: '700',
    color: COLOR_WHITE,
    marginBottom: 32,
  },
  registerButtonContainer: {
    marginTop: 16,
    width: '100%',
  },
  registerButton: {
    backgroundColor: COLOR_FB_SECONDARY,
    height: 48,
    borderRadius: 0,
  },
  registerButtonText: {
    paddingTop: 8,
    fontSize: 24,
  },
  signUpText: {
    color: COLOR_WHITE,
    fontSize: 16,
  },
});

export default RegisterScreen;
