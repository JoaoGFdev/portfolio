import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (
  date: Date | number | string,
  type: string,
  locale?: string,
) => {
  return format(date, type, locale === "pt" ? { locale: ptBR } : {})
}
