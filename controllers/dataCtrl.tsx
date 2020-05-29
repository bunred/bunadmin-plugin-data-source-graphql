/**
 * Remote data controller
 */
import { notice } from "@/core"
import graphqlSer from "../services/graphqlSer"
import { DataCtrl } from "../types"

export default async function dataCtrl({
  SchemaName,
  tableQuery,
  query
}: DataCtrl) {
  const { page } = tableQuery

  const { data: res, errors } = await graphqlSer({ query })

  if (errors) {
    await notice({
      title: "Request failed",
      severity: "error",
      content: JSON.stringify(errors)
    })
    return {
      page: page,
      data: [],
      totalCount: 0
    }
  }

  const data = res && res[SchemaName]
  const totalCount =
    res &&
    res[`${SchemaName}_aggregate`] &&
    res[`${SchemaName}_aggregate`]["aggregate"]["count"]

  return {
    page: page,
    data: data,
    totalCount: totalCount
  }
}
