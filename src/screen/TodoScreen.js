import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyModal from '../components/MyModal';

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editedTodo, setEditedTodo] = useState(null);

  //new tasks gets appended
  const handleAddTodo = () => {
    setTodoList([...todoList, {id: Date.now().toString(), title: todo}]);
    setTodo('');
  };

  //modal for opens up for delete action
  const handleTodo = id => {
    setIsModalVisible(true);
    setTodoToDelete(id);
  };

  //task gets deleted
  const confirmDeleteTodo = () => {
    const updatedTodoList = todoList.filter(todo => todo.id !== todoToDelete);
    setTodoList(updatedTodoList);
    setTodoToDelete(null);
    setIsModalVisible(false);
  };

  //to close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //to edit task
  const handleEditTodo = todo => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  //to update edited task
  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map(item => {
      if (item.id === editedTodo.id) {
        return {...item, title: todo};
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo('');
  };

  const renderTodo = ({item}) => {
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
          style={{color: '#ffffff', fontSize: 20, fontWeight: '700', flex: 1}}>
          {item.title}
        </Text>

        <Icon
          name="pencil"
          color="#FFF"
          size={28}
          style={{paddingHorizontal: 10}}
          onPress={() => handleEditTodo(item)}
        />
        <Icon
          name="remove"
          color="#FFF"
          size={28}
          style={{paddingHorizontal: 10}}
          onPress={() => handleTodo(item.id)}
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

      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleUpdateTodo}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: '#000000',
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleAddTodo}>
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
      )}

      {/* Rendering todolist */}
      <FlatList data={todoList} renderItem={renderTodo} />

      {/* MyModal Component */}
      <MyModal
        btn1Title="Ok"
        btn2Title="Exit"
        visible={isModalVisible}
        deleteTask={confirmDeleteTodo}
        closeModal={closeModal}
      />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
