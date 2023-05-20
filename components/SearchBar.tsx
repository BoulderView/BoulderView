import * as React from 'react';
import { useState } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInputSubmitEditingEventData, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
  searchFunction: (query: string) => void;
}

export const SearchBar = ({ style, searchFunction }:Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query:string) => setSearchQuery(query);

  const onSubmitSearch = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const query = event.nativeEvent.text;
    searchFunction(query);
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        onSubmitEditing={onSubmitSearch}
        value={searchQuery}
        style={[
          style, 
          {marginLeft:10,
          marginRight:10}
        ]}
      />
    </>
  );
};
