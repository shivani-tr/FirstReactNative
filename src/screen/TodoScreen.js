import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyModal from '../components/MyModal';

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [editedTodo, setEditedTodo] = useState(null);

  // Add new task
  const handleAddTodo = () => {
    if (todo === '') return;

    setTodoList([
      ...todoList,
      {id: Date.now().toString(), title: todo, completed: false},
    ]);
    setTodo('');
  };

  // Open modal for delete action
  const handleTodo = id => {
    setIsModalVisible(true);
    setTodoToDelete(id);
  };

  // Confirm delete task
  const confirmDeleteTodo = () => {
    const updatedTodoList = todoList.filter(todo => todo.id !== todoToDelete);
    setTodoList(updatedTodoList);
    setTodoToDelete(null);
    setIsModalVisible(false);
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Edit task
  const handleEditTodo = todo => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  // Update edited task
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

  //complete-incomplete checkbox feature
  const toggleTaskCompletion = id => {
    const updatedTodos = todoList.map(item => {
      if (item.id === id) {
        return {...item, completed: !item.completed};
      }
      return item;
    });

    // Reordering tasks
    const reorderedTodos = [
      ...updatedTodos.filter(item => !item.completed),
      ...updatedTodos.filter(item => item.completed),
    ];

    setTodoList(reorderedTodos);
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
        {/* Checkbox from react-native-community is not working so, made a custom styling */}
        <TouchableOpacity
          onPress={() => toggleTaskCompletion(item.id)}
          style={{
            height: 24,
            width: 24,
            borderWidth: 2,
            borderColor: '#FFF',
            borderRadius: 4,
            backgroundColor: item.completed ? '#FFF' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          {item.completed && (
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: '#ffffff',
                borderRadius: 2,
              }}
            />
          )}
        </TouchableOpacity>

        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            fontWeight: '700',
            flex: 1,
            textDecorationLine: item.completed ? 'line-through' : 'none',
          }}>
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

      {/* Render Todo List */}
      <FlatList
        data={todoList}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
      />

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
