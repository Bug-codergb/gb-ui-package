import React, {
  memo, FC, ReactElement, useEffect,useState
} from "react";
import Button from "./packages/Button";
import Calendar from "./packages/Calendar/index";
import Image from "./packages/Image/index";
import { AppWrapper } from "./style";
import "./style.css";
import axios from "axios";
const App: FC = (): ReactElement => {
  useEffect(() => {
    document.onselectstart = () => false;
  }, []);

  const [imgList, setImgList] = useState<any[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3003/list").then((data) => {
      setImgList(data.data.data);
    })
  },[])
  return (
    <AppWrapper>
      {/* <Button type={'wanring'} text="点击" /> */}
      {/* <Calendar/> */}
      
      <div className="container">
        <ul className="img-container">
          {
            imgList && imgList.length !== 0 && imgList.map((item, index) => {
              return <li key={item.id}>
                <Image
                  src={item.imgURL}
                  error={"http://localhost:3003/img/error"}
                  loading={ "http://localhost:3003/img/loading"}
                  perload={1} />
              </li>
            })
          }
        </ul>
      </div>
    </AppWrapper>
  )
}
export default memo(App);