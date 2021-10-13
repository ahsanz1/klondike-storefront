// Algolia Search module

import algoliasearch from 'algoliasearch'
import { resolveOnChange } from 'antd/lib/input/Input'
// import { algoliaClient } from 'libs/general-config-juicy'
// algoliaClient.HITS_PER_PAGE;
import { algoliaClient } from 'libs/general-config'

const ALGOLIA_CLIENT = algoliasearch(algoliaClient.appId, algoliaClient.apiKey)
const INDEX = ALGOLIA_CLIENT.initIndex(algoliaClient.searchIndex)

export const fetchCategory = async (categoryName, page = 0) => {
  try {
    let response = await INDEX.search(categoryName, {
      restrictSearchableAttributes: ['Category'],
      hitsPerPage: algoliaClient.HITS_PER_PAGE,
      page,
    })
    return response
  } catch (err) {
    // console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null
  }
}

export const searchFilters = async query => {
  try {
    return new Promise((resolve, reject) => {
      INDEX.search('', {
        facetFilters: query,
      })
        .then(({ hits }) => {
          return resolveOnChange(hits)
        })
        .catch(err => {
          reject(err)
        })
    })
  } catch (err) {
    // console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null
  }
}

export const fetchItems = async (query, pageSize = 10, page = 0) => {
  try {
    let response = await INDEX.search(query, {
      restrictSearchableAttributes: ['title', 'description'],
      hitsPerPage: pageSize,
      page,
    })
    return response
  } catch (err) {
    // console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null
  }
}
