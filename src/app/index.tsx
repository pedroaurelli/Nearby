import { View } from 'react-native'
import { Welcome, Step, Button, Steps } from '@/components'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
import { router } from 'expo-router'

export default function Index() {
  const handlePress = () => {
    router.navigate('/home')
  }

  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Steps />

      <Button onPress={handlePress}>
        <Button.Title>
          Começar
        </Button.Title>
      </Button>
    </View>
  )
}
