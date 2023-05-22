import React, { memo, FC, ReactElement } from "react";
import Button from "./packages/Button";
const App:FC = ():ReactElement => {
  return (
    <div>
      <Button type={'wanring'} text="点击"/>
    </div>
  )
}
export default memo(App);