import { View } from 'react-native'
import { Welcome, Step } from '@/components'
import { IconMapPin, IconQrcode, IconTicket } from '@tabler/icons-react-native'

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />
      <Step title='Encontre estabelecimentos' description='Veja locais perto de você que são parceiros do nearby' icon={IconMapPin}/>
      <Step title='Ative o cupom com QR code' description='Escaneie o código no estabelecimento para usar o benefício' icon={IconQrcode}/>
      <Step title='Garanta vantagens perto de você' description='Ative cupons onde estiver, em diferente tipos de estabelecimento' icon={IconTicket}/>
    </View>
  )
}
