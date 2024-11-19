"use client";

import { Loader, TriangleAlert } from "lucide-react";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { useCreateChannelModal } from "@/features/channels/api/store/use-create-channel-modal";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";

const WorkspaceIdPage = () = {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId});
  const { data: ChannelS, isLOading: channelisLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0?._id], [channels]);
   const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (workspaceLoading || channelsLoading || memberLoading || !member || !workspace) return;

    if (channelId) {
      router.push('/workspace/${workspaceId}/channel/${channelId}');
    } else if (!open && isAdmin) {
      setOpen(true);
    }

  }, [
    member,
    memberloading,
    isAdmin,
    channelId,
    workspaceLoading,
    channelsLoading,
    workspace,
    open,
    setOpen,
    router,
    workspaceId,
  ]);

  
  if (workspaceLoading || channelsLoading || memberLoading) {
    return ( 
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
          <Loader className="size-6 animate-spinn text-muted-foreground" /> 
       </div>
   );
}

  if (!workspace || !member) {
    return ( 
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6 text-muted-foreground" /> 
        <span className="text-sm text-muted-foreground">
          Workspace not found 
        </span>
     </div>
  );
}

 return ( 
   <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
     <TriangleAlert className="size-6 text-muted-foreground" /> 
     <span className="text-sm text-muted-foreground">
       No channel found
     </span>
    </div>
  );
};  

export default WorkspaceIdPage;