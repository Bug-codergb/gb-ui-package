import {
  useState,
  useEffect
} from "react";
export const useMouse = () => {
  const [pos,setPos] = useState([0,0]);
  useEffect(() => {
    document.addEventListener("mousemove", handler, false);
  },[])
  const handler = (e:MouseEvent) => {
    setPos([e.clientX,e.clientY])
  }
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handler);
    }
  },[])
  return pos
}