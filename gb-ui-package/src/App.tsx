import React, {
  memo, FC, ReactElement, useEffect,useState
} from "react";
//import Button from "./packages/Button";
//import Calendar from "./packages/Calendar/index";
//import Image from "./packages/Image/index";

import Transfer from "./packages/Transfer/index";

import { AppWrapper } from "./style";
import "./style.css";
import axios from "axios";
const App: FC = (): ReactElement => {
  useEffect(() => {
    document.onselectstart = () => false;
  }, []);

  const [imgList, setImgList] = useState<any[]>([]);
  // useEffect(() => {
  //   axios.get("http://localhost:3003/list").then((data) => {
  //     setImgList(data.data.data);
  //   })
  // },[])
  return (
    <AppWrapper>
      {/* <Button type={'wanring'} text="点击" /> */}
      {/* <Calendar/> */}
      
      {/* <div className="container">
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
      </div> */}
      <Transfer
        source={
          [
            {
              id: 1001,
              name:"JavaScript"
            },
            {
              id: 1002,
              name: "swift",
              children: [
                {
                  parentId:1002,
                  id: 10021,
                  name: "ui",
                },
                {
                  id: 10022,
                  parentId:1002,
                  name: "lina",
                  children: [
                    {
                      parentId:10022,
                      id: 100221,
                      name:"gblina",
                    },
                    {
                      parentId:10022,
                      id: 100222,
                      name:"郭斌李娜",
                    }
                  ]
                },
                {
                  parentId:1002,
                  id: 10023,
                  name: "gb",
                }
              ]
            },
            {
              id: 1003,
              name:"kotlin"
            },
            {
              id: 1004,
              name:"pyhon"
            },
            {
              id: 1005,
              name:"go"
            },
            {
              id: 1006,
              name:"c++"
            },
            {
              id: 1007,
              name:"c"
            },
          ]
        }
        target={
         []
        } />
    </AppWrapper>
  )
}
export default memo(App);