import { View, Text, Alert, Modal, StatusBar } from 'react-native'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import { api } from '@/clients/api'
import { useEffect, useState, useRef } from 'react'
import { MarketResult } from '../home'
import { Loading, Cover, Detail, Button } from '@/components'
import { Coupon } from '../../components/Market/Coupon'
import { CameraView, useCameraPermissions } from 'expo-camera'

export default function Market () {
  const [market, setMarket] = useState<MarketResult>()
  const [coupon, setCoupon] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [couponIsFetching, setCouponIsFetching] = useState<boolean>(false)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState<boolean>(false)

  const [_, requestPermission] = useCameraPermissions()
  const params = useLocalSearchParams<{id: string}>()

  const qrLock = useRef<boolean>(false)
  console.log(params.id)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setMarket(data)
      setIsLoading(false)
    } catch (err) {
      Alert.alert('Erro', 'Não foi possivel carregar os dados', [
        {
          text: 'OK', onPress: () => router.back()
        }
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()

      if (!granted) {
        Alert.alert('Erro', 'Permissão de câmera negada')
      }

      qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível utilizar a camera')
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch(`/coupons/${id}`)

      Alert.alert('Cupom', data.coupon)
      setCoupon(data.coupon)
    } catch (err) {
      console.log(err)
      Alert.alert('Erro', 'Não foi possível resgatar o cupom')
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)

    Alert.alert("Cupom", "Deseja regatar o cupom? Não é possível reutilizar o mesmo cupom", [
      { style: 'cancel', text: 'Cancelar' },
      { style: 'default', text: 'Resgatar', onPress: () => getCoupon(id) }
    ])
  }


  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!market) return <Redirect href={'/home'} />

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' hidden={isVisibleCameraModal} />
      <Cover uri={market.cover}/>
      <Detail data={market} />
      {coupon && <Coupon code={coupon} />}

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing='back'
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
