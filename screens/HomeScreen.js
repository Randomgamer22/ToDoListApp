import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
    FlatList,
    ListItem,
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Db from '../config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {

    constructor(props) {
        super();
        this.state = {
            currentDate: '',
            userID: firebase.auth().currentUser.email,
            markedDate: '',
            docId: '',
            isModalVisible: false,
            isSecondModalVisible: false,
            toDoListForCurrentDate: null,
            whatToDo: '',
            text: '',
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    getCurrentDate(separator = '') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        this.setState({
            currentDate: `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`
        })
    }

    getUserDetails = () => {
        Db.collection("users")
    }

    changeDates = () => {
        Db.collection(this.state.userID).doc(this.state.userID).update({
            userID: this.state.userID,
            currentDate: this.state.currentDate,
            markedDate: this.state.markedDate,
        })
    }

    addTask = () => {
        Db.collection(this.state.userID).doc(this.state.markedDate).update({
            [this.state.time]: this.state.whatToDo
        })
        this.setState({
            whatToDo: '',
            time: ''
        })
    }


    dayChanged(day) {
        console.log(day.dateString)
        this.setState({
            markedDate: day.dateString,
            isModalVisible: true
        })
        this.changeDates();
        this.getAllTasks();
    }

    goToAddTaskModal = () => {
        this.setState({
            isSecondModalVisible: true,
            isModalVisible: false
        })
    }

    getAllTasks = () => {
        Db.collection(this.state.userID)
            .doc(this.state.markedDate)
            .onSnapshot((snapshot) => {
                var allToDoListTasks = []
                snapshot.docs.map((doc) => {
                    var toDoList = doc.data();
                    toDoList['doc_id'] = doc.id;
                    allToDoListTasks.push(toDoList)
                })
                this.setState({
                    toDoListForCurrentDate: alltoDoListTasks,
                });
            });
    }


    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.whatToDo}
                subtitle={item.timeToBeDone}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                bottomDivider
            />
        );
    };

    keyExtractor = (item, index) => index.toString();

    showModal = () => {
        if (this.state.isModalVisible) {
            return (
                <Modal
                    animationType="slide"
                    presentationType="fullScreen"
                    visible={this.state.isModalVisible}
                    transparent={true}
                    onModalHide >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            {this.state.toDoListForCurrentDate.length === 0 ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>Press the add button to add new tasks</Text>
                                </View>
                            ) : (
                                <SwipableFlatList toDoListForCurrentDate={this.state.toDoListForCurrentDate} />
                            )}
                        </View>
                    </View>
                </Modal >
            )
        }
        if (this.state.isSecondModalVisible) {
            return (
                <Modal
                    animationType="slide"
                    presentationType="fullScreen"
                    visible={this.state.isSecondModalVisible}
                    transparent={true}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What to do."
                            placeholderTextColor="#8ed4b7"
                            onChangeText={(text) => {
                                this.setState({
                                    whatToDo: text
                                })
                            }}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Time."
                            placeholderTextColor="#8ed4b7"
                            onChangeText={(text) => {
                                this.setState({
                                    time: text
                                })
                            }}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.addTask}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )
        }
    }

    componentDidMount = () => {
        this.getCurrentDate('-');
        //this.changeDates();
    }

    componentWillUnmount = () => {
        //this.changeDates();
    }



    render() {
        return (
            <View style={styles.container}>
                {this.showModal()}
                <Calendar
                    current={this.state.currentDate}
                    hideExtraDays
                    markedDates={{
                        [this.state.currentDate]: { selected: true, marked: true, selectedColor: 'blue' }
                    }}
                    style={{
                        height: 500,
                        width: 500
                    }}
                    onDayPress={day => {
                        this.dayChanged(day)
                    }}
                />
                <Image source={require('../assets/HomeScreenImage.png')} style={{ height: 400, width: 400 }} />
                <TouchableOpacity style={styles.calendarButton}>
                    <Text style={styles.calendarButtonText}>
                        Go To Callender
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#569ab3',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    calendarButton: {
        borderWidth: 3,
        marginTop: 30,
        padding: 20,
        borderRadius: 5,
        borderColor: '#8ed4b7',
    },
    calendarButtonText: {
        fontSize: 40,
        color: '#8ed4b7'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#536d78',
        marginRight: 30,
        marginLeft: 30,
        marginTop: 80,
        marginBottom: 80,
    },
    textInput: {
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
    button: {
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
})