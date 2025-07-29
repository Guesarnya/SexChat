import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get("window");

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: message, sender: 'me' },
      ]);
      setMessage("");
      setIsLoading(true);

      try {
        const response = await fetch('https://sexchat.onrender.com/chat/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.text();

        if (data) {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: data, sender: 'bot' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching response from the API:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={require('./assets/eee.jpg')}
      style={styles.container}
    >
      <View style={styles.Content}>
        <ScrollView contentContainerStyle={styles.messageList}>
          {messages.map((msg, index) => (
            <View key={index} style={[styles.messageContainer, msg.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Написать сообщение..."
            placeholderTextColor="#C8D0DC"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            style={[styles.ButtonOfSend, isLoading && styles.disabledButton]}
            onPress={handleSend}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.send}>Отправить</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  Content: {
    backgroundColor: 'white',
    height: height * 0.9,
    width: width * 0.7,
    borderRadius: 40,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  messageList: {
    padding: 20,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#F2F2F2',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFC',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  input: {
    flex: 1, 
    minHeight: 44, 
    maxHeight: 120, 
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F2F2F2',
    borderRadius: 28,
    fontSize: 16,
    fontFamily: 'Body Large/Font', 
    marginRight: 8, 
    textAlignVertical: 'center',
  },
  ButtonOfSend: {
    borderRadius: 10, 
    backgroundColor: '#1C1B1F',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    width: 165
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  send: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  }
});
