import * as React from 'react';
import { StyleProp, StyleSheetProperties, ViewStyle } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const SearchBar = ({ style }:Props) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query:string) => setSearchQuery(query);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={[
          style, 
          {marginLeft:10,
          marginRight:10}]}
      />
    </>
  );
};
