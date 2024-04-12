import {useTheme} from '@react-navigation/native';
import React, {useState, memo} from 'react';
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceEffect } from '../../components/utils/Debouncer';
import { useTranslation } from 'react-i18next';

interface Props {
  onClickSearch: (query: string) => void;
}

const SearchBar: React.FC<Props> = ({onClickSearch}) => {
  const [searchText, setSearchText] = useState('');
  const {colors} = useTheme();

  useDebounceEffect(
    () => {
      onClickSearch(searchText)
    },
    [searchText],
    500
  );

  const handleSearch = (text: string) => {
    setSearchText(text)
  };

  const clearSearch = () => {
    setSearchText('');
  };

  const {t} = useTranslation();

  const placeHolderText = t('searchPlaceholder')

  return (
    <View style={styles.container}>
      <Icon style={styles.searchButton} name="search-outline" size={24} color={colors.text} />
      <TextInput
        autoCorrect={false}
        style={[styles.input, {color: colors.text}]}
        placeholder={placeHolderText}
        placeholderTextColor={colors.text}
        value={searchText}
        onChangeText={handleSearch}
      />
      {searchText !== '' && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Icon name="close-circle-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 4,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  clearButton: {
    padding: 10,
    marginLeft: 5,
  },
});

export default memo(SearchBar);
