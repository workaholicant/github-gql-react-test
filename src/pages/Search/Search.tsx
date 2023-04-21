import { useCallback, useEffect, useState } from 'react';
import './Search.css';
import { Repository, User } from '../../graphql/types';
import { ApolloError, useLazyQuery } from '@apollo/client';
import { Query } from '../../graphql';
import { UserResults } from './components/UserResults';
import { RepoResults } from './components/RepoResults';

export enum SearchType {
  USER = 'Users',
  REPO = 'Repositories',
}

function Search() {
  const [query, setQuery] = useState<string>('');
  const [startSearch, setStartSearch] = useState<boolean>(false)
  const [currentSearchType, setCurrentSearchType] = useState(SearchType.USER);
  const [results, setResults] = useState<(User | Repository)[]>([]);

  const defaultQueryResultHandler = {
    onCompleted: (data: any) => {
      setStartSearch(false)
      setResults(data?.search?.nodes)
    },
    onError: (e: ApolloError) => {
      console.log("Error happened", e.message)
      setStartSearch(false)
    }
  }

  const [searchUsers, { data: userData, fetchMore: fetchMoreUsers, loading: isUserLoading }] = useLazyQuery(Query.searchUsers, defaultQueryResultHandler);
  const [searchRepositories, { data: repoData, fetchMore: fetchMoreRepos, loading: isRepoLoading }] = useLazyQuery(Query.searchRepositories, defaultQueryResultHandler);

  useEffect(() => {
    if (!startSearch || query.length < 1) return
    try {
      const searchFn = currentSearchType === SearchType.REPO ? searchRepositories : searchUsers;
      searchFn({ variables: { query, cursor: null } });
    } catch (error) {
      console.log(error)
    }
  }, [startSearch, currentSearchType])

  const handleLoadMore = useCallback(async () => {
    console.log("Load more called")

    const searchFn = currentSearchType === SearchType.REPO ? fetchMoreRepos : fetchMoreUsers;
    const searchCursor = currentSearchType === SearchType.REPO ? repoData?.search?.pageInfo?.endCursor : userData?.search?.pageInfo?.endCursor;

    await searchFn({
      variables: { query, cursor: searchCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.search.nodes;
        const pageInfo = fetchMoreResult.search.pageInfo;

        return newEdges.length
          ? {
            search: {
              ...prevResult.search,
              pageInfo,
              nodes: [...prevResult.search.nodes, ...newEdges],
            }
          }
          : prevResult;
      }
    })

  }, [fetchMoreRepos, fetchMoreUsers, query, repoData, currentSearchType, userData])

  function renderSideBarItem(itemType: SearchType, index: number) {
    function onSearchTypeChangeHandler(itemType: SearchType) {
      setCurrentSearchType(itemType)
      setStartSearch(true)
    }

    return <div
      key={index}
      className={`sidebar-option ${itemType === currentSearchType ? 'sidebar-selected' : ''}`}
      onClick={() => { itemType !== currentSearchType && onSearchTypeChangeHandler(itemType) }}>
      {itemType}
    </div>
  }

  function renderSearchResult(searchType: SearchType): JSX.Element {

    return searchType === SearchType.REPO ? (
      <RepoResults isLoading={isRepoLoading} results={results as Repository[]} repositoryCount={repoData?.search.repositoryCount} />
    ) : searchType === SearchType.USER ? (
      <UserResults isLoading={isUserLoading} results={results as User[]} userCount={userData?.search?.userCount} />
    ) : <></>
  }

  return (
    <div className="search-page">
      <div className="header">
        <div className="search-bar">
          <input
            className='search-input'
            type="text"
            placeholder={`Search ${currentSearchType}`}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setStartSearch(true)}
          />
          <button className='search-button' onClick={() => setStartSearch(true)}>Search</button>
        </div>
      </div>

      <div className="body-container">
        <div className="sidebar">
          <div className='sidebar-item-container'>
            {
              [SearchType.USER, SearchType.REPO].map(renderSideBarItem)
            }
          </div>
        </div>
        <div className="search-results">
          {renderSearchResult(currentSearchType)}
        </div>
      </div>
    </div>
  );
}

export default Search;
