import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implementar autenticação real
    router.replace('/(tabs)');
  };

  return (
    <View style = {styles.container}>
      <View style = {styles.logoContainer}>
        {/* Substitua a source abaixo pelo logo real depois */}
        <View style = {styles.logoCircle}>
          <Image
            source     = {require('../assets/images/will_estilos.png')}
            style      = {styles.logo}
            resizeMode = "contain"
          />
        </View>
        {/* <Text style={styles.title}>BARBEARIA</Text>
        <Text style={styles.title}>Will - Estilos</Text> */}
      </View>
      <View style = {styles.formContainer}>
        <View style = {styles.inputWrapper}>
          <Icon 
            name  = "mail" 
            type  = "feather" 
            color = "#A0A4B8" 
            size  = {20} 
            style = {styles.inputIcon} />
          <TextInput
            style                = {styles.input}
            placeholder          = "e-mail"
            placeholderTextColor = "#A0A4B8"
            value                = {username}
            onChangeText         = {setUsername}
          />
        </View>
        <View style = {styles.inputWrapper}>
          <Icon 
            name  = "lock" 
            type  = "feather" 
            color = "#A0A4B8" 
            size  = {20} 
            style = {styles.inputIcon} />
          <TextInput
            style                = {styles.input}
            placeholder          = "senha"
            placeholderTextColor = "#A0A4B8"
            secureTextEntry
            value                = {password}
            onChangeText         = {setPassword}
          />
        </View>
        <TouchableOpacity style = {styles.button} onPress = {handleLogin}>
          <Text style = {styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style = {styles.footerLinks}>
          <Text style = {styles.footerText}>©️Desenvolvido por Ewerton Virginio</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23293A',
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#262835',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  formContainer: {
    backgroundColor: '#262835',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23293A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#31384A',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#10ace7',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#10ace7',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footerLinks: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  footerText: {
    color: '#A0A4B8',
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
  },  
  text: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Quicksand_400Regular',
  },
}); 