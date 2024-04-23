/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantsScreen({ navigation }) {
  // Component state, que almacenara en un array la lista de restaurantes
  // restaurants = array que almacenara la lista de restaurantes, setRestaurants = funcion que seteara restaurants con la lista
  // dada como parametro a dicha funcion
  const [restaurants, setRestaurants] = useState([])

  // Effect que tomara dos paramentros
  // 1- Funcion a ejecutar, en este caso esperar dos segundos y llamar a setRestaurants para añadir
  // setear restaurants con el metodo getAll
  // 2- Parametro opcional que identifica que objetos haran que, al ser cambiados, se ejecute la funcion del primer
  // parametro. Si se deja vacia, se ejecuta la funcion cada vez que se renderice la pagina.
  useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll)
      console.log('Restaurants loaded')
    }, 2000)
  }, [])

  // Funcion que se encarga de mostar / renderizar un objeto que contiene todas sus propiedades
  // En este caso, se muestra por cada restaurante, un boton con el nombre del restaurante que,
  // al pulsarlo, redirige a la vista de los detalles de ese restaurante
  const renderRestaurant = ({ restaurant }) => {
    return (
      <Pressable
      style = {styles.row}
      onPress = {() => {
        navigation.navigate('RestaurantDetaileScreen', { id: restaurant.id })
      }}>
        <TextRegular>
          {restaurant.name}
        </TextRegular>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  }
})
