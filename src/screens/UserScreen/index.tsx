import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { LOGIN, LOGOUT } from '../../redux/User/userSlice';
import { auth } from '../../services/firebase';
import ModalScreen from '../ModalScreen';
import styles from './style';

function Index() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userEmail = useSelector((state: RootState) => state.user.email);
  const userToken = useSelector((state: RootState) => state.user.token);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        dispatch(LOGIN({
          email: firebaseUser.email || '',
          token: token || ''
        }));
        setModalVisible(false); 
      } else {
        dispatch(LOGOUT());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const handleLoginPress = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer}>
      <View>
        <View>
          <TouchableWithoutFeedback onPress={handleLoginPress}>
            <View style={styles.childContainers}>
              <FontAwesome style={styles.icons} name={isLoggedIn ? 'sign-out' : 'sign-in'} />
              <Text style={styles.userText}>{isLoggedIn ? userEmail : 'Giriş Yap'}</Text>
              <Entypo style={styles.userIcon} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.subContainer}>
          <TouchableWithoutFeedback onPress={() => alert('Canlı Destek')}>
            <View style={styles.childContainers}>
              <Ionicons style={styles.icons} name="chatbubbles-sharp" />
              <Text style={styles.text}>Canlı Destek</Text>
              <Entypo style={styles.userIcon} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => alert('Adresler')}>
            <View style={styles.childContainers}>
              <Ionicons style={styles.icons} name="location" />
              <Text style={styles.text}>Adreslerim</Text>
              <Entypo style={styles.userIcon} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => alert('Favoriler')}>
            <View style={styles.childContainers}>
              <Ionicons style={styles.icons} name="heart" />
              <Text style={styles.text}>Favori Ürünlerim</Text>
              <Entypo style={styles.userIcon} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => alert('Yardım')}>
            <View style={styles.childContainers}>
              <AntDesign style={styles.icons} name="questioncircleo" />
              <Text style={styles.text}>Yardım</Text>
              <Entypo style={styles.userIcon} name="chevron-right" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.lang}>Language - Dil</Text>
        <TouchableWithoutFeedback onPress={() => alert('Dil ayarları')}>
          <View style={styles.childContainers}>
            <Text style={styles.langText}>Dil Ayarları</Text>
            <Entypo style={styles.userIcon} name="chevron-right" />
          </View>
        </TouchableWithoutFeedback>

        <Text style={styles.lang}>Versiyon</Text>
        <View style={styles.childContainers}>
          <Text style={styles.langText}>2.19.1</Text>
        </View>
      </View>
      <ModalScreen visible={modalVisible} setVisible={setModalVisible} />
    </ScrollView>
  );
}

export default Index;
