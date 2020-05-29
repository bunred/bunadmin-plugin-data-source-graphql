/**
 * Remote data controller
 */
import request from "@/utils/scripts/request"
import storedToken from "@/utils/scripts/storedToken"
import { ENV } from "@/utils/config"
import { ServiceProps } from "../types"

export default async function graphqlSer({
  query,
  variables,
  operationName,
  url,
  prefix,
  headers
}: ServiceProps) {
  const token = await storedToken()

  return request(url || "/graphql", {
    prefix: prefix || ENV.MAIN_URL,
    method: "POST",
    headers: headers || { token },
    data: JSON.stringify({ query, variables, operationName })
  })
}
