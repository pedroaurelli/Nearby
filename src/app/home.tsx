import { Alert, Text, View } from 'react-native'
import { api } from '@/clients/api'
import { useEffect, useState } from 'react'
import { Categories, Places, PlaceResult } from '@/components'

export type CategoryResult = {
  id: string,
  name: string
}

type MarketsProps = PlaceResult & {

}

export default function Home () {
  const [ categories, setCategories ] = useState<CategoryResult[]>([])
  const [ category, setCategory ] = useState<CategoryResult | null>(null)
  const [ markets, setMarkets ] = useState<MarketsProps[]>([])

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
      <Places data={markets}/>
    </View>
  )
}
