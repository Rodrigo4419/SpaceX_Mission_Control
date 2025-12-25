import SidebarComponent from "@/components/layout/Sidebar";

type TProps={
show:boolean;
setShow:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Drawer({show, setShow}:TProps){

    const handleClose= (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(!show)
    }
  };
    if(!show)return null
    return(
    <div className="absolute top-0 left-0 h-dvh w-dvw bg-zinc-950/40" onClick={handleClose}>
    <div className="animate-slide-drawer delay-75 h-dvh w-[68dvw] p-4 bg-zinc-900 border-r border-r-zinc-800">
       <SidebarComponent /> 
    </div>
    </div>)
}