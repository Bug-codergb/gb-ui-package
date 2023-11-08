interface ITabBar{
  label: string;
  children?: ITabBar[],
  icon?:string
}
const tabBar:ITabBar[] = [
  {
    label: "插入",
    children: [
      {
        label: "表格",
        icon:require("../../../assets/img/tabbar/table.png")
      },
      {
        label: "图片",
        icon:require("../../../assets/img/tabbar/pic.png")
      },
      {
        label: "形状",
        icon:require("../../../assets/img/tabbar/shape.png")
      }
    ]
  },
  {
    label:"绘图"
  },
  {
    label:"设计"
  },
  {
    label:"切换"
  },
  {
    label:"动画"
  },
  {
    label:"幻灯片放映"
  },
  {
    label:"审阅"
  },
  {
    label:"视图"
  },
  {
    label:"录制"
  },
  {
    label:"形状格式"
  }
]
export {
  tabBar
}
export type {
  ITabBar
}