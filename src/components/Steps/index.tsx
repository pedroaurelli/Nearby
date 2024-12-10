import { View, Text } from 'react-native'
import { styles } from './styles'

export type indexProps = {
  prop: any
}

export function Steps () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boas vindas ao Nearby</Text>
    </View>
  )
}
