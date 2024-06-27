import { createContext, useState } from "react";
import { setDefaultLocale } from "react-datepicker";

export const SearchContext = createContext({
    searchKey: ' ',
    searchText: ' ',
    searchScope: ' ',
    searchResult: [],
    isSearchbarActive: false,
    setSearchInfo: () => { },
    setSearchKey: () => { },
    setSearchText: () => { },
    setSearchScope: () => { },
    setSearchResult: () => { },
    setIsSearchbarActive: () => { }
});

export default function SearchContextProvider({ children }) {

    const [searchBar, setSearchBar] = useState({
        searchKey: '',
        searchText: '',
        searchScope: '',
        searchResult:[],
        isSearchbarActive: false,
    })

    function updateSearchInfo() {

    }

    function updateSearchKey(key) {

    }

    function updateSearchText(text) {

    }

    function updateSearchScope(scope) {

    }

    function updateSearchBarActiveStatus() {
        setSearchBar((prevSearchBar) => ({
            ...prevSearchBar,
            isSearchbarActive: !prevSearchBar.isSearchbarActive
        }))

    }

    const cntxtValue = {
        searchKey: searchBar.searchKey,
        searchText: searchBar.searchText,
        searchScope: searchBar.searchScope,
        isSearchbarActive: searchBar.isSearchbarActive,
        setSearchInfo: updateSearchInfo,
        setSearchKey: updateSearchKey,
        setSearchText: updateSearchText,
        setSearchScope: updateSearchScope,
        setIsSearchbarActive: updateSearchBarActiveStatus
    }

    return (<SearchContext.Provider value={cntxtValue}>
        {children}
    </SearchContext.Provider>)
}