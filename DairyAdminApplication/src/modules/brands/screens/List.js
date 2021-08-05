import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { Block, Text, Button } from './../../../components';
import { getAllBrands, setBrandListInStore } from './../actions';

const List = ({ navigation }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brandReducer.brands);
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const fetchBrands = async () => {
        const { brands } = await dispatch(getAllBrands());
        if (mounted) {
          await dispatch(setBrandListInStore(brands));
        }
      };
      fetchBrands();
      return () => {
        mounted = false;
      };
    }, []),
  );

  const renderItem = ({ item }) => {
    return (
      <Block noflex>
        <Text>{item.Title}</Text>
      </Block>
    );
  };

  return (
    <Block margin={10}>
      <FlatList
        data={brands}
        renderItem={renderItem}
        keyExtractor={(item) => `brand-${item.Id}`}
      />
      <Button mode="contained" onPress={() => navigation.navigate('Create')}>
        Add New Brand
      </Button>
    </Block>
  );
};

export default List;
