import { Text, View } from 'react-native'
import { styles } from './styles'
import { IconProps } from '@tabler/icons-react-native'
import { colors } from '@/styles/colors'
import { ComponentType } from 'react'

type StepProps = {
  title: string
  description: string
  icon: ComponentType<IconProps>
}

export function Step (props: StepProps) {
  const { title, description, icon: Icon } = props

  return (
    <View style={styles.container}>
      <Icon size={32} color={colors.red.base}/>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}
