import { useState } from "react";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
 } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { useRouter } from "next/navigation";

 import { useCreateChannelModal } from "../store/use-create-channel-modal";
 import { useCreatechannel } from "../api/use-create-channel";
 import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Toast } from "sonner";

 export const CreateChannelModal = () => { 
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } useCreateChannel();
  const [ open, setOpen ] = useCreateChannelModal();

  const handleClose = () => {
    setName("");
    setOpen(false);
  };
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.repalce(/\s+/g,"-").toLowerCase();
        setName(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(
        { name, workspaceId }
        {
         onSuccess:  (id) =>> {
          toast.success("Channel created");
          router.push('/workspace/${workspaceId}/channel/${id}');
          handleClose();
          },
          onError: () => {
            Toast.error("Failed to create channel")
          }
        },
      );
    };

    return {
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent>
             <DialogHeader>
                  <DialogTitle>Add a channel</DialogTitle>
             </DialogHeader>
             <form onSubmit={handleSubmit} className="space-y-4">
             <Input 
               value={name}
               disabled={isPending}
               onChanfe={handleChange}
               required
               autoFocus
               minLength={3}
               maxLength={80}
               placeholder="e.g.plan-budget"
             />
             <div className="flex justify-end">
                <Button disabled={false}>
                  Create 
                </Button>
             
             </div>
             </form>
         </DialogContent>
        </Dialog>
    };
};