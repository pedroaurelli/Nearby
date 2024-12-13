import { View, Text } from 'react-native'
import { MarketResult } from '../../../app/home'
import { styles } from './styles'
import { Info } from '../Info'
import { IconMapPin, IconPhone, IconTicket } from '@tabler/icons-react-native'

type DetailProps = {
  data: MarketResult
}

export function Detail ({ data }: DetailProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.description}</Text>

      <View style={styles.group}>
        <Text style={styles.title}>Informações</Text>

        <Info icon={IconTicket} description={`${data.coupons} cupons disponíveis`}/>
        <Info icon={IconMapPin} description={data.address}/>
        <Info icon={IconPhone} description={data.phone}/>
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>Regulamento</Text>
        {data.rules.map(rule => (
          <Text
            key={rule.id}
            style={styles.rule}
          >
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}
