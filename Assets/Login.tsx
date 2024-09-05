import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles/Styles';

interface FormState {
  user_id: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    user_id: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  // Login.tsx
const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
      console.log(data); // Debug: Check what data is returned from the backend
  
      if (data.success) {
        navigation.navigate('Main', {
          screen: 'Home',
          params: { user: data.user }, // Ensure full user object is passed, including Name
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('./Images/gail.png')}
            />

            <Text style={styles.title}>
              Sign in to <Text style={{ color: '#075eec' }}>GAIL</Text>
            </Text>

            <Text style={styles.subtitle}>Get access to your Profile</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>User ID</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                clearButtonMode="while-editing"
                keyboardType="default"
                onChangeText={(user_id) => setForm({ ...form, user_id })}
                placeholder="User-ID"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.user_id}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                spellCheck={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
