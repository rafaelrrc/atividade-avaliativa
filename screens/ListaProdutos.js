import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function ProductListScreen({ navigation }) {
  const [produtos, setProdutos] = useState([
    {
      id: '1',
      nome: 'Produto Exemplo',
      descricao: 'Descrição do produto',
      categoria: 'Categoria A',
      valor: 100.0,
      imagem: 'https://via.placeholder.com/100',
    },
  ]);

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
        onPress={() => navigation.navigate('Novo Produto', { adicionarProduto: (produto) => {
            setProdutos([...produtos, { ...produto, id: (produtos.length + 1).toString() }]);
          }
        })}
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
