"use client";
//import {useEffect, useState} from 'React'
import {CloseIcon} from '@/components/svg'
import { ApiDocs } from "@/types";

type TProps = {
  modalTile: string | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({
  modalTile,
  open,
  setOpen,
  children,
}: TProps) {
  if (!open) return null;
  return (
    <div
      className="absolute top-0 left-0 z-10 flex items-center justify-center w-dvw h-dvh bg-zinc-800/50 backdrop-blur-xs"
    >
      <div className="relative flex flex-col h-[80dvh] w-[80dvw] bg-zinc-950 border border-zinc-700 rounded-xl shadow-lg">
        <h2 className="p-8 pb-6 text-2xl font-medium border-b border-b-zinc-700 2xl:text-3xl">{modalTile}</h2>
        <button onClick={()=>setOpen(false)}className='h-8.5 w-8.5 text-zinc-600 flex items-center justify-center absolute top-8 right-8 transition duration-150 ease-in-out cursor-pointer hover:text-zinc-50'>
            <CloseIcon height='2rem' width='2rem'/>
            </button>
        <div className="w-full h-0 grow">{children}</div>
      </div>
    </div>
  );
}
