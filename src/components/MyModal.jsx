/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {View, Button, Text, Modal} from 'react-native';

export default function MyModal({
  btn1Title = 'Delete',
  btn2Title = 'Exit',
  visible,
  closeModal,
  deleteTask, //deleting
}) {
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
            title={btn1Title}
            color="red"
            onPress={() => {
              deleteTask();
            }}
          />
          <View style={{marginTop: 10}}>
            <Button
              title={btn2Title}
              color="midnightblue"
              onPress={() => {
                closeModal();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
