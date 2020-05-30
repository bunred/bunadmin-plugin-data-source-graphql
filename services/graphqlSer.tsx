import request from "@/utils/scripts/request"
import storedToken from "@/utils/scripts/storedToken"
import { ENV } from "@/utils/config"
import { ServiceProps } from "../types"
import { notice } from "@/core"
import i18next from "i18next"

export default async function graphqlSer({
  query,
  variables,
  operationName,
  url,
  prefix,
  headers,
  onError
}: ServiceProps) {
  const token = await storedToken()

  const res = await request(url || "/graphql", {
    prefix: prefix || ENV.MAIN_URL,
    method: "POST",
    headers: headers || { token },
    data: JSON.stringify({ query, variables, operationName })
  })

  const { data, errors } = res

  if (!data || errors) {
    if (onError) {
      await onError(errors)
    } else {
      await notice({
        title: i18next.t("Request Failed"),
        severity: "error",
        content: JSON.stringify(errors)
      })
    }

    return
  }

  return res
}
