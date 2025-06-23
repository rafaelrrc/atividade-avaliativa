import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (usuario.trim() !== '' && senha.trim() !== '') {
      navigation.navigate('Produtos');
    } else {
      alert('Preencha usuário e senha.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuário"
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  },
  title: {
    fontSize: 24, marginBottom: 20
  },
  input: {
    width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5
  }
});
