import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function AddUser() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false); 
  
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    function handleAddUser() { // definisce la funzione 'handleAddUser' per gestire l'aggiunta di un nuovo utente
      setRefreshing(true)
      wait(20000).then(() => setRefreshing(false));
      fetch('http://172.20.10.4:3000/addUser', { // effettua una richiesta HTTP POST per aggiungere un nuovo utente al server
      method: 'POST', // specifica il metodo POST
      headers: { // specifica l'intestazione della richiesta
        'Content-Type': 'application/json' // specifica il tipo di contenuto come JSON
      },
        body: JSON.stringify({ nome: nome, gender: 'male', email: email, slug:nome, immagine:'picture.img', role: 'user' }) // specifica il corpo della richiesta come un oggetto JSON contenente il nome e l'email inseriti dall'utente
        })
        .then(response => response.json()) // trasforma la risposta in formato JSON
        .then(data => console.log(data)) // visualizza i dati ricevuti dal server nella console
        .catch(error => console.error(error)); // gestisce eventuali errori
        setRefreshing(false)
    }


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput style={{marginTop:50}} 
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Button
          title="Add User"
          onPress={handleAddUser}
        />
        <RefreshControl refreshing={refreshing}/>
      </View>
    );   
}