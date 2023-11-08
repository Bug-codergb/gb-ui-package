import React, {
  memo, FC, ReactElement, useEffect,useState
} from "react";
//import Button from "./packages/Button";
//import Calendar from "./packages/Calendar/index";
//import Image from "./packages/Image/index";

import Transfer from "./packages/Transfer/index";
import Text from "./packages/Text";

import DragList from "./packages/DragList/index";

import Editor from "./packages/Editor";
import { AppWrapper } from "./style";
import "./style.css";
import axios from "axios";

import { removeTreeNode } from "./packages/Transfer/utils/index";
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
  const source=[
    {
      parentId:-1,
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
      name: "go",
      children: [
        {
          id: 10051,
          parentId: 1005,
          name: "云原生",
        },
        {
          id: 10052,
          parentId: 1005,
          name: "大数据",
        },
        {
          id: 10053,
          parentId: 1005,
          name: "人工智能",
        },
        {
          id: 10054,
          parentId: 1005,
          name: "移动互联网",
          children: [
            {
              id: 100541,
              parentId: 10054,
              name: "flutter",
            },
            {
              id: 100542,
              parentId: 10054,
              name: "rn",
            },
            {
              id: 100543,
              parentId: 10054,
              name: "uniapp",
              children: [
                {
                  id: 1005431,
                  parentId: 100543,
                  name: "hbuilder",
              
                },
                {
                  id: 1005432,
                  parentId: 100543,
                  name: "vscode",
                  children: [
                    {
                      id: 10054321,
                      parentId: 1005432,
                      name: "elsint",
                     
                    },
                    {
                      id: 10054322,
                      parentId: 1005432,
                      name: "prettier",
                     
                    },
                    {
                      id: 10054323,
                      parentId: 1005432,
                      name: "abyin",
                      
                    },
                  ]
                }
              ]
            },
          ]
        },
        {
          id: 10055,
          parentId: 1005,
          name: "app",
        }
      ]
    },
    {
      id: 1006,
      name:"c++"
    },
    {
      id: 1007,
      name:"c"
    },
  ];

  return (
    <AppWrapper>
      <Editor/>
      {/* <DragList/> */}
      {/* <Text maxLine={2} text="滕王阁序》是唐代文学家王勃创作的一篇骈文。文章由洪都的地势、人才写到宴会，写滕王阁的壮丽，眺望的广远，扣紧秋日，景色鲜明；再从宴会娱游写到人生遇合，抒发身世之感；接着写作者的遭遇并表白要自励志节，最后以应命赋诗和自谦之辞作结"/> */}
       {/* <Button type={'danger'} text="点击我好吗" onClick={()=>console.log("jing")}/> */}
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
      {/* <Transfer
        source={source}
        target={
         []
        } /> */}
    </AppWrapper>
  )
}
export default memo(App);