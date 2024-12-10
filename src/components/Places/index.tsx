import { useWindowDimensions, Text } from 'react-native'
import { Place, PlaceResult } from '../Place'
import BottomSheet, {  BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { styles } from './styles'

export type PlacesProps = {
  data: PlaceResult[]
}

export function Places (props: PlacesProps) {
  const { data } = props
  const dimensions = useWindowDimensions()
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Place data={item}/>}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Explore locais perto de você</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  )
}
