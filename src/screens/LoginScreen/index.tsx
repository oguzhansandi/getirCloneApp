import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH } from '../../services/firebase';
import { ActivityIndicator, Button, KeyboardAvoidingView, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from './style';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();


    const signIn = async () =>{
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert('Giriş Yapıldı')
        }catch(err) {
            console.log(err);
            alert('Griş Hatası : ' + err.message)
        } finally{
            setLoading(false);
        }
    }

    const signUp = async () =>{
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response)
            alert('Mail adresinizi kontrol ediniz!')
        }catch(err: any){
            console.log(err)
            alert('Kayıt Hatası : ' + err.message)
        } finally{
            setLoading(false)
        }
    }

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
        <TextInput 
            style={styles.input}
            value={email}
            placeholder='Email' 
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput 
            style={styles.input}
            value={password}
            placeholder='Password'  
            autoCapitalize='none'
            onChangeText={(password) => setPassword(password)}
        />
        { loading ? <ActivityIndicator size="large" color= '#0000ff' />
        : <>
            <Button title='Giriş Yap' onPress={signIn}/>
            <Button title='Hesap Oluştur' onPress={signUp}/>
        </>
        }
        </KeyboardAvoidingView>
    </View>
  )
}

export default Index;
