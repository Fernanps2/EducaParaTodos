import React, { useEffect, useState } from 'react';
import { View, Button,Image, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { openGallery } from '../Controlador/multimedia';

export default function AniadirPictograma() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <TouchableOpacity style={styles.cardWithImage} onPress={() => openGallery()}></TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  cardWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    }
  }
});