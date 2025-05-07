import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNames} from '../hooks/useNames';
import {useDispatch} from 'react-redux';
import {setList} from '../redux/namesSlice.ts';

export const HomeScreen = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const {names} = useNames();
  const dispatch = useDispatch();

  const {width, height} = useWindowDimensions();
  const isPortrait = height >= width;
  const numColumns = isPortrait ? 1 : 2;

  const filteredData = useMemo(() => {
    const baseList =
      keyword.length >= 3
        ? names.filter(item =>
            item.name.toLowerCase().includes(keyword.toLowerCase()),
          )
        : names;

    return [...baseList].sort((a, b) => a.name.localeCompare(b.name));
  }, [keyword, names]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  const handleDelete = (itemId?: string) => {
    const itemsToDelete = itemId ? [itemId] : selectedItems;
    const newNames = names.filter(item => !itemsToDelete.includes(item.id));
    dispatch(setList(newNames));
    setSelectedItems([]);
  };

  const renderItem = useCallback(
    ({item}: any) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleItemSelection(item.id)}>
          <View
            style={[
              styles.checkboxInner,
              selectedItems.includes(item.id) && styles.checkboxSelected,
            ]}
          />
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    ),
    [selectedItems],
  );

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.searchContainer}
        placeholder={'Search'}
        onChangeText={setKeyword}
      />
      {selectedItems.length > 0 && (
        <TouchableOpacity
          style={styles.deleteSelectedButton}
          onPress={() => handleDelete()}>
          <Text style={styles.deleteSelectedText}>
            Delete Selected ({selectedItems.length})
          </Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filteredData}
        key={numColumns}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
        bounces={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  deleteIcon: {
    width: 22,
    height: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  container: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 9,
    borderColor: '#E0E0E0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 16,
    height: 16,
    borderRadius: 2,
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 5,
  },
  deleteSelectedButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteSelectedText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
