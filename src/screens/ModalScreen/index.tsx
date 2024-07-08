import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../redux/User/userSlice';
import styles from './style';


interface ModalScreenProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ModalScreen: React.FC<ModalScreenProps> = ({ visible, setVisible }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await response.user.getIdToken();
      dispatch(LOGIN({ email: response.user.email, token }));
      setVisible(false);
      navigation.navigate("HomePage");
    } catch (err) {
      console.log(err);
      alert('Giriş Hatası : ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Mail adresinizi kontrol ediniz!');
    } catch (err) {
      console.log(err);
      alert('Kayıt Hatası : ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              onChangeText={(password) => setPassword(password)}
            />
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
              <>
                <Button title="Giriş Yap" onPress={signIn} />
                <Button title="Hesap Oluştur" onPress={signUp} />
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
}

export default ModalScreen;
