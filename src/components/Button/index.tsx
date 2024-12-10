import { TouchableOpacity, TouchableOpacityProps, Text, TextProps, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import { colors } from '@/styles/colors'
import { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import { ComponentType } from 'react'

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button ({ children, style, isLoading = false, ...rest }: ButtonProps) {

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      { isLoading ? <ActivityIndicator size='small' color={colors.gray[100]} /> : children }
    </TouchableOpacity>
  )
}

type IconProps = {
  icon: ComponentType<TablerIconProps>
}

function Icon ({ icon: Icon }: IconProps) {
  return (
    <Icon size={24} color={colors.gray[100]} />
  )
}

function Title ({ children }: TextProps) {
  return (
    <Text style={styles.title}>
      {children}
    </Text>
  )
}

Button.Title = Title
Button.Icon = Icon

export { Button }
