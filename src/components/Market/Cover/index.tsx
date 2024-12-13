import React from 'react'
import { ImageBackground, View } from 'react-native'
import { styles } from './styles'
import { Button } from '../../Button'
import { router } from 'expo-router'
import { IconArrowLeft } from '@tabler/icons-react-native'

export type CoverProps = {
  uri?: string
}

export function Cover ({ uri }: CoverProps) {
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button
          style={{ width: 40, height: 40 }}
          onPress={() => router.back()}
        >
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  )
}
