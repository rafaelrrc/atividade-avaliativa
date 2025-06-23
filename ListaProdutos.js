import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductListScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@produtos');
      if (jsonValue != null) {
        setProdutos(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Erro ao carregar produtos', e);
    }
  };

  const salvarProdutos = async (produtosAtualizados) => {
    try {
      const jsonValue = JSON.stringify(produtosAtualizados);
      await AsyncStorage.setItem('@produtos', jsonValue);
    } catch (e) {
      console.log('Erro ao salvar produtos', e);
    }
  };

  const adicionarProduto = (produto) => {
    const produtosAtualizados = [...produtos, { ...produto, id: Date.now().toString() }];
    setProdutos(produtosAtualizados);
    salvarProdutos(produtosAtualizados);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.categoria}>Categoria: {item.categoria}</Text>
        <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nenhum produto cadastrado.</Text>}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Novo Produto', { adicionarProduto })}
      >
        <Text style={styles.buttonText}>Cadastrar Novo Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8,
  },
  image: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  nome: { fontSize: 18, fontWeight: 'bold' },
  descricao: { fontSize: 14, color: '#555' },
  categoria: { fontSize: 12, color: '#888' },
  valor: { fontSize: 16, color: '#009900', fontWeight: 'bold' },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
