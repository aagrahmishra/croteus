"use client";

import { useEffect, useState } from "react";

import { CreateChannelmodal } from "@/features/channels/api/components/create-channel-modal";
import { CreateWorkspacemodal } from "@/features/workspaces/components/create-workspace-modal";

export const Modals = () => {
    const [mounted , setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);
    
    if(!mounted) return null;

    return(
        <>
        <CreateChannelModal />
         <CreateWorkspacemodal />
        </>
    );
};