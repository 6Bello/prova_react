import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView } from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => { // definisce un effetto collaterale che verrà eseguito all'avvio del componente
    fetch('http://192.168.1.181:3000/getUsers') // effettua una richiesta HTTP GET per ottenere l'elenco degli utenti dal server
    .then(response => response.json()) // trasforma la risposta in formato JSON
    .then(data => setUsers(data)) // aggiorna lo stato 'users' con l'elenco degli utenti ottenuto dal server
    .catch(error => console.error(error)); // gestisce eventuali errori
    }, []); // specifica un array vuoto di dipendenze per eseguire l'effetto solo una volta all'avvio del componente

    function handleAddUser() { // definisce la funzione 'handleAddUser' per gestire l'aggiunta di un nuovo utente
      fetch('http://192.168.1.181:3000/addUser', { // effettua una richiesta HTTP POST per aggiungere un nuovo utente al server
      method: 'POST', // specifica il metodo POST
      headers: { // specifica l'intestazione della richiesta
      'Content-Type': 'application/json' // specifica il tipo di contenuto come JSON
      },
      body: JSON.stringify({ nome: nome, gender: 'male', email: email, slug:nome, immagine:'picture.img', role: 'user' }) // specifica il corpo della richiesta come un oggetto JSON contenente il nome e l'email inseriti dall'utente
      })
      .then(response => response.json()) // trasforma la risposta in formato JSON
      .then(data => console.log(data)) // visualizza i dati ricevuti dal server nella console
      .catch(error => console.error(error)); // gestisce eventuali errori
    }


  return (
    <ScrollView>
      <View>
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
        {users.map(user => (
          <View key={user.id}>
            <Text style={{fontSize:10}}>{user.nome}</Text>
            <Text>{user.email}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}