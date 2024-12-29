import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// const dummyData = [
//   {
//     id: '01',
//     title: 'Sleep',
//   },
//   {
//     id: '02',
//     title: 'Watch Death note',
//   },
// ];

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleAddTodo = () => {
    setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
    setTodo('');
  };

  const handleDeleteTodo = id => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
    setTodo('');
  };

  const renderTodo = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: '#1e90ff',
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{color: '#ffffff', fontSize: 20, fontWeight: 700, flex: 1}}>
          {item.title}
        </Text>

        <Icon
          name="pencil"
          color="#FFF"
          size={28}
          style={{paddingHorizontal: 10}}
        />
        <Icon
          name="remove"
          color="#FFF"
          size={28}
          style={{paddingHorizontal: 10}}
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        elevation: 3,
      }}>
      <TextInput
        style={{
          marginTop: 12,
          borderWidth: 2,
          borderColor: '#1e90ff',
          borderRadius: 6,
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={userText => setTodo(userText)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#000000',
          borderRadius: 6,
          paddingVertical: 8,
          marginVertical: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handleAddTodo()}>
        <Text
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Add
        </Text>
      </TouchableOpacity>

      {/* Rendering todolist */}
      <FlatList data={todoList} renderItem={renderTodo} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
