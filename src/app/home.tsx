import { Alert, Text, View } from 'react-native'
import { api } from '@/clients/api'
import { useEffect, useState } from 'react'
import { Categories, Places, PlaceResult } from '@/components'
import MapView, { Callout, Marker } from 'react-native-maps'
import { colors } from '../styles/colors'
import { fontFamily } from '../styles/font-family'
import { router } from 'expo-router'

export type CategoryResult = {
  id: string,
  name: string
}

export type MarketResult = PlaceResult & {
  latitude: number
  longitude: number
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494
}

export default function Home () {
  const [ categories, setCategories ] = useState<CategoryResult[]>([])
  const [ category, setCategory ] = useState<CategoryResult | null>(null)
  const [ markets, setMarkets ] = useState<MarketResult[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
      setCategory(data[0])
    } catch (err){
      console.log(err)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias')
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return

      const { data } = await api.get(`/markets/category/${category?.id}`)
      console.log(JSON.stringify(data, null, 2))
      setMarkets(data)
    } catch (err){
      console.log(err)
      Alert.alert('Locais', 'Não foi possível carregar os locais')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [category])

  return (
    <View style={{ flex: 1, backgroundColor: '#CECECE' }}>
      <Categories data={categories} onSelect={setCategory} selected={category}/>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier='current'
          coordinate={currentLocation}
          image={require('@/assets/location.png')}
        />
        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets}/>
    </View>
  )
}
