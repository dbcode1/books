import { format, compareAsc } from 'date-fns'
import sub from 'date-fns/sub'

export async function dateGenerator(num) {
  const today = Date.now()
  const backDate = sub(Date.now(),{ months: num })
  const date = format(new Date(backDate), 'MM/dd/yyyy');
  console.log(date);

}
