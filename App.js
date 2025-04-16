
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Linking, AccessibilityInfo } from "react-native";
import Constants from "expo-constants";

const API_KEY = "b584db0c57994fb3b5ec5fee8d82695c";
const NEWS_URL = `https://newsapi.org/v2/everything?q=brasil&language=pt&apiKey=${API_KEY}`;


export default function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fazendo requisição...");
    fetch(NEWS_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setNews(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erro na requisição:", err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      accessible={true}
      accessibilityLabel={`Notícia: ${item.title}`}
      onPress={() => item.url && Linking.openURL(item.url)}
    >
      {item.urlToImage ? (
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
      ) : null}
      <Text style={styles.title}>{item.title}</Text>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header} accessibilityRole="header">Últimas Notícias</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#c00" />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          accessibilityRole="list"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#c00",
  },
  card: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
