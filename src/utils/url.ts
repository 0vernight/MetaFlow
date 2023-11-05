/**
 *
 */
import { type LocationQuery } from 'vue-router'

export const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {} as LocationQuery)
}
