import { FlatList, View } from 'react-native'
import { Category } from '../Category'
import { CategoryResult } from '@/app/home'
import { styles } from './styles'

type CategoriesProps = {
  data: CategoryResult[]
  selected: CategoryResult | null
  onSelect: (category: CategoryResult) => void
}

export function Categories ({ data, onSelect, selected }: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={item.id}
          name={item.name}
          onPress={() => onSelect(item)}
          isSelected={selected?.id === item.id}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  )
}
