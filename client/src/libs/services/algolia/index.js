// Algolia Search module

import algoliasearch from 'algoliasearch'
// import { algoliaClient } from 'libs/general-config-juicy'
// algoliaClient.HITS_PER_PAGE;
import { algoliaClient } from 'libs/general-config'

const ALGOLIA_CLIENT = algoliasearch(algoliaClient.appId, algoliaClient.apiKey)
const INDEX = ALGOLIA_CLIENT.initIndex(algoliaClient.searchIndex)

export const fetchCategory = async (
  categoryName,
  page = 0,
  filterParents = false,
) => {
  try {
    let response = await INDEX.search(categoryName, {
      restrictSearchableAttributes: ['Category'],
      hitsPerPage: algoliaClient.HITS_PER_PAGE,
      facetFilters: filterParents ? [['isVariant:false']] : [],
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
          return resolve(hits)
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

export const fetchItems = async (
  query,
  pageSize = 500,
  page = 0,
  filterParents = false,
) => {
  try {
    let response = await INDEX.search(query, {
      // restrictSearchableAttributes: ['title', 'description'],
      hitsPerPage: pageSize,
      facetFilters: filterParents
        ? [['isVariant:false']]
        : [['isVariant:true']],
      page,
    })
    return response
  } catch (err) {
    // console.log("ALGOLIA SEARCH INDEX ERROR ->", err);
    return null
  }
}
