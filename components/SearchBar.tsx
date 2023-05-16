import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query:string) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};
