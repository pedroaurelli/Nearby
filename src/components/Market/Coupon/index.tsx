import { Text, View } from 'react-native'
import { styles } from './styles'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '../../../styles/colors'

export type CouponProps = {
  code: string
}

export function Coupon (props: CouponProps) {
  const { code } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilize esse cupom</Text>

      <View style={styles.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={styles.code}>{code}</Text>
      </View>
    </View>
  )
}
