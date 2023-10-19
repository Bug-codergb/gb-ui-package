type IType = "danger" | "primary" | "wanring" | "default" |"info";
interface IProps{
  type?: IType,
  round?:boolean,
  text?: number | string | boolean,
  disabled?:boolean,
  onClick?:()=>void
}
export type {
  IProps,
  IType
}