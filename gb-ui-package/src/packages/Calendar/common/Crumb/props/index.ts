import { IGBTime } from "../../../../../utils/general";

interface IProps{
  date: IGBTime,
  width?: number,
  pre?: () => void,
  next?: () => void,
  current?:()=>void
}
export type {
  IProps
  
}