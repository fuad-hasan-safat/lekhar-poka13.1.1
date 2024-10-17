import { useRouter } from "next/router";
import { createContext, useRef, useState } from "react";
import { setDefaultLocale } from "react-datepicker";

export const SearchContext = createContext({
    searchAreaRef: null,
    searchKey: ' ',
    searchText: ' ',
    searchScope: ' ',
    selectedIteam: -1,
    searchResult: [],
    isSearchbarActive: false,
    isSearChPageActive: false,
    setSearchInfo: () => { },
    setSearchKey: () => { },
    setSearchText: () => { },
    setSearchScope: () => { },
    setSearchResult: () => { },
    setIsSearchbarActive: () => { },
    setIsSearChPageActive: () => { },
    handleKeyDown: () => { }
});

export default function SearchContextProvider({ children }) {

    const router = useRouter();

    const [searchBar, setSearchBar] = useState({
        searchKey: '',
        searchText: '',
        searchScope: '',
        selectedIteam: -1,
        searchResult: [],
        isSearchbarActive: false,
        isSearChPageActive: false,
    })

    const searchRef = useRef(null);

    function updateSearchInfo() {

    }

    function updateSearchKey(key) {
        setSearchBar((prevSearchBar) => ({
            ...prevSearchBar,
            searchKey: key
        }))
    }

    function updateSearchText(text) {

    }

    function updateSearchScope(scope) {

    }

    function updateSearchBarActiveStatus(status) {
        setSearchBar((prevSearchBar) => ({
            ...prevSearchBar,
            isSearchbarActive: status
        }))

    }

    function updateResult(result) {
        setSearchBar((prevSearchBar) => ({
            ...prevSearchBar,
            searchResult: result
        }))
    }

    function updateSearchPageActiveStatus(status){
        setSearchBar((prevSearchBar) => ({
            ...prevSearchBar,
            isSearChPageActive: status
        }))
    }

    function KeyDownHandle(e) {

        // console.log(e.key)
        if (searchBar.selectedIteam < searchBar.searchResult.length) {
            if (e.key === "ArrowUp" && searchBar.selectedIteam > 0) {
                // setSelectedIteam((prev) => prev - 1);
                setSearchBar((prevSearchbar) => ({
                    ...prevSearchbar,
                    selectedIteam: prevSearchbar.selectedIteam - 1
                }))
            } else if (
                e.key === "ArrowDown" &&
                searchBar.selectedIteam < searchBar.searchResult.length - 1
            ) {
                // setSelectedIteam((prev) => prev + 1);
                setSearchBar((prevSearchbar) => ({
                    ...prevSearchbar,
                    selectedIteam: prevSearchbar.selectedIteam + 1
                }))
            } else if (e.key === "Enter") {
                if (searchBar.selectedIteam != -1) {
                    setSearchBar((prevSearchbar) => ({
                        ...prevSearchbar,
                        searchKey: '',
                        isSearChPageActive:false 
                    }))
                    router.push(`/post/${searchBar.searchResult[searchBar.selectedIteam]?._id}`)

                }
            }
        } else {
            setSearchBar((prevSearchbar) => ({
                ...prevSearchbar,
                selectedIteam: -1
            }))
        }

    }

    const cntxtValue = {
        searchAreaRef: searchRef,
        searchKey: searchBar.searchKey,
        searchText: searchBar.searchText,
        searchScope: searchBar.searchScope,
        searchResult: searchBar.searchResult,
        selectedIteam: searchBar.selectedIteam,
        isSearchbarActive: searchBar.isSearchbarActive,
        isSearChPageActive: searchBar.isSearChPageActive,
        setSearchInfo: updateSearchInfo,
        setSearchKey: updateSearchKey,
        setSearchText: updateSearchText,
        setSearchScope: updateSearchScope,
        setSearchResult: updateResult,
        setIsSearchbarActive: updateSearchBarActiveStatus,
        setIsSearChPageActive: updateSearchPageActiveStatus,
        handleKeyDown: KeyDownHandle
    }

    return (<SearchContext.Provider value={cntxtValue}>
        {children}
    </SearchContext.Provider>)
}