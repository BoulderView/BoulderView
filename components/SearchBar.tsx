import * as React from 'react';
import { useState } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInputSubmitEditingEventData, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
  searchFunction: (query: string) => void;
  onChangefunction?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  style, 
  searchFunction, 
  placeholder="search",
  onChangefunction
}:Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query:string) => setSearchQuery(query);

  const onSubmitSearch = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const query = event.nativeEvent.text;
    searchFunction(query);
  };

  return (
    <>
      <Searchbar
        placeholder={placeholder}
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitSearch}
        value={searchQuery}
        style={[
          style, 
          {margin: 10}
        ]}
      />
    </>
  );
};
