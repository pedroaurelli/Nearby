import { View, Text } from 'react-native'
import { styles } from './styles'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'
import { Step } from '../Step'

export type indexProps = {
  prop: any
}

export function Steps () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Veja como funciona</Text>
      <Step title='Encontre estabelecimentos' description='Veja locais perto de você que são parceiros do nearby' icon={IconMapPin}/>
      <Step title='Ative o cupom com QR code' description='Escaneie o código no estabelecimento para usar o benefício' icon={IconQrcode}/>
      <Step title='Garanta vantagens perto de você' description='Ative cupons onde estiver, em diferente tipos de estabelecimento' icon={IconTicket}/>
    </View>
  )
}
