import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../redux/reducer';

const Home = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.users);

  const [dataList, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const APIurl = `https://6571d815d61ba6fcc013bf17.mockapi.io/user`;
      const response = await fetch(APIurl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response status is not OK (status code other than 200)
      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response data:', await response.text());
        throw new Error('fetch fail');
      }
  
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  const add = async () => {
    const userInfo = {
      id,
      name,
      email,
      address: [{ street, city, country }], // Wrap the address object in an array
      password: pass,
    };
    dispatch(addUser(userInfo));
    try {
      const APIurl = `https://6571d815d61ba6fcc013bf17.mockapi.io/user`;
      const response = await fetch(APIurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error('add fail');
      }
  
      const data = await response.json();
      setData(data);
      clearInputFields();
    } catch (error) {
      console.error('Error', error);
    }
  };
  

  const deletee = async (id) => {
    dispatch(deleteUser(id));

    try {
      const APIurl = `https://6571d815d61ba6fcc013bf17.mockapi.io/user/${id}`;
      const response = await fetch(APIurl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('delete fail');
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const updatee = async (id, name, pass, email, street, city, country) => {
    try {
      dispatch(
        updateUser(id, { name, password: pass, email, address: { street, city, country } })
      );

      const APIurl = `https://6571d815d61ba6fcc013bf17.mockapi.io/user/${id}`;
      const response = await fetch(APIurl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password: pass,
          email,
          address: { street, city, country },
        }),
      });

      if (!response.ok) {
        throw new Error('update fail');
      }

      const updatedData = await response.json();
      setData((prevData) => prevData.map((item) => (item.id === id ? updatedData : item)));
      clearInputFields();
    } catch (error) {
      console.error('Error', error);
    }
  };

  const clearInputFields = () => {
    setId('');
    setName('');
    setPass('');
    setEmail('');
    setStreet('');
    setCity('');
    setCountry('');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Quản lý thông tin người dùng</Text>
      </View>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <Text style={styles.labelText}>UserName</Text>
            <TextInput
              placeholder="username"
              onChangeText={setName}
              style={styles.input}
              value={name}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              placeholder="email"
              onChangeText={setEmail}
              style={styles.input}
              value={email}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              placeholder="password"
              onChangeText={setPass}
              style={styles.input}
              value={pass}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.labelText}>Street</Text>
            <TextInput
              placeholder="street"
              onChangeText={setStreet}
              style={styles.input}
              value={street}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.labelText}>City</Text>
            <TextInput
              placeholder="city"
              onChangeText={setCity}
              style={styles.input}
              value={city}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.labelText}>Country</Text>
            <TextInput
              placeholder="country"
              onChangeText={setCountry}
              style={styles.input}
              value={country}
            />
          </View>

          <Pressable onPress={add} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          <FlatList
              data={dataList}
              renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View>
                 <Text>ID: {item.id}</Text>
                 <Text>UserName: {item.name}</Text>
                 <Text>Password: {item.password}</Text>
                 <Text>Emails: {item.email}</Text>
                 {/* Map over the address array to display all addresses */}
                 {item.address.map((address, index) => (
                     <View key={index}>
                        <Text>Street: {address.street}</Text>
                        <Text>City: {address.city}</Text>
                        <Text>Country: {address.country}</Text>
                      </View>
                   ))}
              </View>
             <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() => updatee(item.id, name, pass, email, street, city, country)}
                  style={styles.updateButton}
                >
                <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable onPress={() => deletee(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  )}
  keyExtractor={(item) => item.id.toString()}
/>
        </View>
      </ScrollView>

      <Pressable onPress={fetchData} style={styles.button}>
        <Text style={styles.buttonText}>View</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#3498db',
    padding: 15,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    marginRight: 10,
    width: 80,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3498db',
    width: 100,
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#2ecc71',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Home;
