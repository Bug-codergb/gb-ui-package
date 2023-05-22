type IType = "danger" | "primary" | "wanring" | "default";
interface IProps{
  type: IType,
  text?:number|string|boolean
}
export type {
  IProps,
  IType
}