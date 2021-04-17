import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import Db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      confirmPassword: '',
      isModalVisible: false
    };
  }

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>
                Registration
              </Text>
              <TextInput
                style={styles.formTextInput}
                placeholder="first name"
                placeholderTextColor = "#8ed4b7"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="last name"
                placeholderTextColor = "#8ed4b7"
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="address"
                placeholderTextColor = "#8ed4b7"
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="contact"
                placeholderTextColor = "#8ed4b7"
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="email"
                keyboardType="email-address"
                placeholderTextColor = "#8ed4b7"
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="password"
                placeholderTextColor = "#8ed4b7"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder="confirm password"
                placeholderTextColor = "#8ed4b7"
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />
              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => { this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword) }}>
                  <Text style={styles.registerButtonText}>
                    Register
                    </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.cancelButton} onPress={() => {
                  this.setState({ isModalVisible: false })
                }}>
                  <Text style={{ color: '#8ed4b7' }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  userSignUp = (emaiId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert('Password does not match \n Check your password');
    } else
      firebase
        .auth()
        .createUserWithEmailAndPassword(emaiId, password)
        .then(() => {
          Db.collection("users").add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            address: this.state.address,
            emailId: this.state.emailId,
            isBookRequestActive: false,
          })
          Db.collection(this.state.emailId).add({})
          return alert('User added successfully', '', [{
            text: 'ok', onPress: () => {
              this.setState({
                isModalVisible: false
              })
            }
          }])
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
  }



userLogin = (emaiId, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(emaiId, password)
    .then(() => {
      this.props.navigation.navigate('HomeScreen');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage);
    });
  
}

render() {
  return (
    <View style={styles.container}>
    {this.showModal()}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{height: 300, width: 300}} source = {require('../assets/ListImage.png')}/>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>To Do List App</Text>
      </View>
      <View>
        <TextInput
          style={styles.loginBox}
          placeholder="abc@gmail.com"
          placeholderTextColor = "#8ed4b7"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({ emailId: text });
          }}
        />
        <TextInput
          style={styles.loginBox}
          placeholder="Enter Password"
          placeholderTextColor = "#8ed4b7"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20, marginTop: 20 }]}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({isModalVisible: true})
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#569ab3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 65,
    fontWeight: '400',
    paddingBottom: 30,
    color: '#8ed4b7'
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 2,
    borderColor: '#8ed4b7',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    color: '#8ed4b7'
  },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#8ed4b7',
    margin: 50
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#536d78",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: 'center',
    borderColor: '#8ed4b7',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    color: '#8ed4b7'
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#8ed4b7',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  registerButtonText: {
    color: '#8ed4b7',
    fontSize: 15,
    fontWeight: 'bold'
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: "#8ed4b7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10
  },
  buttonText: {
    color: '#ffff',
    fontWeight: '200',
    fontSize: 20
  }
});