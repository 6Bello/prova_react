import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Users(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); 

    
    const onRefresh = () => { // definisce la funzione 'onRefresh' per gestire il refresh della lista
        setRefreshing(true)
        fetch(`http://172.20.10.4:3000/getUsers?usersLength=${users.length + 5}`) // imposta usersLength a 5
        .then(response => response.json())
        .then(data => {
            setUsers(data)
            setRefreshing(false)
        })
        .catch(error => console.error(error));
    }

    
    useEffect(() => { // definisce un effetto collaterale che verrà eseguito all'avvio del componente
        fetch('http://172.20.10.4:3000/getUsers') // effettua una richiesta HTTP GET per ottenere l'elenco degli utenti dal server
        .then(response => response.json()) // trasforma la risposta in formato JSON
        .then(data => setUsers(data)) // aggiorna lo stato 'users' con l'elenco degli utenti ottenuto dal server
        .catch(error => console.error(error)); // gestisce eventuali errori
    }, []); // specifica un array vuoto di dipendenze per eseguire l'effetto solo una volta all'avvio del componente

    const user = ({ item }) => 
    <View>
        <Text style={{ color: "black", textAlign: 'center', }}>{item.nome}</Text> 
        <Text style={{ color: "grey", textAlign: 'center', }}>{item.email}</Text>   
    </View>

    return (
        <View style={styles.List}>   
            <FlatList  data={users} onRefresh={onRefresh} refreshing={refreshing} renderItem={user}/>
        </View>
      );
}

const styles = StyleSheet.create({
    List: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});