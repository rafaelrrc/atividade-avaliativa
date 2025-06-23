import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function ProductFormScreen({ route, navigation }) {
  const { adicionarProduto } = route.params;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSalvar = () => {
    if (!nome || !descricao || !categoria || !valor) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoProduto = {
      nome,
      descricao,
      categoria,
      valor: parseFloat(valor),
      imagem: imagem || 'https://via.placeholder.com/100',
    };

    adicionarProduto(novoProduto);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do produto" />

      <Text style={styles.label}>Descrição *</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Descrição" />

      <Text style={styles.label}>Categoria *</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} placeholder="Categoria" />

      <Text style={styles.label}>Valor (R$) *</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        placeholder="Valor"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Imagem (URL)</Text>
      <TextInput
        style={styles.input}
        value={imagem}
        onChangeText={setImagem}
        placeholder="URL da imagem (opcional)"
      />

      <Button title="Salvar Produto" onPress={handleSalvar} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
