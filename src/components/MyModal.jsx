/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View, Button, Text, Modal} from 'react-native';

export default function MyModal({visible, closeModal, deleteTask}) {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'lightblue',
            padding: 20,
            borderRadius: 10,
            width: 300,
          }}>
          <Text style={{fontSize: 18, marginBottom: 20}}>Are you sure?</Text>
          <Button
            title="Delete"
            color="red"
            onPress={() => {
              deleteTask(); // Call the passed `closeModal` function
            }}
          />
          <View style={{marginTop: 10}}>
            <Button
              title="Exit"
              color="midnightblue"
              onPress={() => {
                closeModal();
              }} // Close the modal on clicking "Exit"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
