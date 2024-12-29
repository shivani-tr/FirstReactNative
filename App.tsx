import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import TodoScreen from './src/screen/TodoScreen';

function App(): React.JSX.Element {
  return (
    <>
      <SafeAreaView>
        <View>
          <TodoScreen />
        </View>
      </SafeAreaView>
    </>
  );
}

export default App;

// const styles = StyleSheet.create({});
