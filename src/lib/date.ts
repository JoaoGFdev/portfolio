import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const formatDate = (
  date: Date | number | string,
  type: string,
  ptBr?: boolean,
) => {
  return format(date, type, ptBr ? { locale: ptBR } : {})
}
