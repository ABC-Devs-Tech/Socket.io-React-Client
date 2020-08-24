import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messeges/Messages';
import Input from '../Input/Input';

import './Chat.css';
import UsersList from '../UsersList/UsersList';

let socket;
const SOCKET_ENDPOINT = 'https://abc-realtime-chat-app.herokuapp.com/';

const Chat = ({ location }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        // on mount
        const { name, room } = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        localStorage.setItem('room', room.trim().replace(/ /g, '_').toLowerCase())

        socket = io(SOCKET_ENDPOINT);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        // // on unmount
        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [SOCKET_ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            // console.log("socket.on('message'", message);
            setMessages(messages => [...messages, message]);
        });
        const currRoom = localStorage.getItem('room');
        socket.on('roomData', ({room, users:{users}}) => {
            console.log({users});
            console.log('currentRoom', currRoom);
            console.log('incomming room', room);
            if(currRoom == room){
                setUsers(users);
            }
        })
    }, []);
    // Function for sending messages 
    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages); 
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
            <UsersList users={users} />
        </div>
    )
}

export default Chat;