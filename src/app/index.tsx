import "react-native-gesture-handler";

import Game from '@/components/Game';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Game />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({

})