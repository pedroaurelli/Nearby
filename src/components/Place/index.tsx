import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { styles } from './styles'
import { IconTicket } from '@tabler/icons-react-native'
import { colors } from '../../styles/colors'
import { MarketResult } from '../../app/home'

type PlaceProps = TouchableOpacityProps & {
  data: MarketResult
}

export function Place ({data, ...rest}: PlaceProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image style={styles.image} source={{ uri: data.cover }}/>

      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{data.description}</Text>

        <View style={styles.footer}>
          <IconTicket size={16} color={colors.red.base}/>
          <Text style={styles.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
