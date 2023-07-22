import React, { memo, FC, ReactElement } from "react";
import Button from "./packages/Button";
import Calendar from "./packages/Calendar/index";
import "./style.css";
const App:FC = ():ReactElement => {
  return (
    <div>
      {/* <Button type={'wanring'} text="点击" /> */}
      <Calendar/>
    </div>
  )
}
export default memo(App);