import { View, Text, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '@/clients/api'
import { useEffect, useState } from 'react'
import { MarketResult } from '../home'
import { Loading } from '@/components'

export default function Market () {
  const params = useLocalSearchParams<{id: string}>()
  const [market, setMarket] = useState<MarketResult>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setMarket(data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possivel carregar os dados', [
        {
          text: 'OK', onPress: () => router.back()
        }
      ])
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  )
}
