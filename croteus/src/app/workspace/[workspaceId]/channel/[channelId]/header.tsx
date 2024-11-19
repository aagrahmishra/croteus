import { Button } from "@/components/ui/button";

import { FaChevronDown } from "react-icons/fa";
import { TrashIcon } from "lucide-react";
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
    DialogFooter,
 } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdatechannel } from "@/features/channels/api/use-update-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { toast } from "sonner";
import { useRemovechannel } from "@/features/channels/api/use-remove-channel";
import { useConfirm } from "@/hooks/use-confirm";
import { remove } from "../../../../../../convex/channels";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

interface HeadProps {
    title: string;

export const Header = ({name}: HeaderProps) => {
    const rouetr = useRouter();
    const channelId = useChannelId();
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete this channel?",
        "You are about to delete this channel.This action is irreversible",
);

    const [value, setValue] = useState(title);
    const [editOpen, setEditOpen] = useState(false);

    const { data: member } = useCurrentMember({ workspaceId })
    const { mutate: updateChannel, isPending: isupdatingChannel} = useUpdatechannel();
    const { mutate: removeChannel, isPending: isRemovingChannel } = useRemovechannel();

    const handleEditOpen = (value: boolean) => {
        if (member?.role !== "admin") return;
        
        setEditOpen(value);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.repalce(/\s+/g,"-").toLowerCase();
        setValue(value);
    };

    const handleDelete = async () => {
        const ok = await confirm();

        if (!ok) return;

        removechannel({ id: channelId }, {
            onSuccess: () => {
                toast.success("Channel deleted");
                reportError.push('/workspace/$(workspaceId)');
            },
            onError: () => {
                toast.error("Failed to delete channel");
            }
        });
    }


    const handleSubmit: (e: React.FormEvent<HTMLFormElements>) => {
        e.preventDefault();
        
        updateChannel({ id: channelId, name: value }) {
            onSucccess: () => {
                toast.success("Channel updated");
                setEditOpen(false);
            },
            onError:() => {
                toast.Error("Failed to update channel");
            } 
        });
    }


    return (
        <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <ConfirmDialog />
            <Dialog>
                <DialogTrigger>
                   <Button 
                      variant="ghost"
                      className="text-lg font-semibold px-2 overflow-hidden w-auto"
                      size="sm"
           >
                      <span className="truncate"># {title}</span>
                      <FaChevronDown className="size-2.5 ml-2" />
                    </Button>
              </DialogTrigger>
              <DialogContent className="p-0 bg-gray-50 overflow-hidden">
                <DialogHeader className="p-4 border-b bg-white">
                    <DialogTitle>
                        # { title }
                    </DialogTitle>
                </DialogHeader>
                <div className="px-4 pb-4 flex flex-col gap-y-2">
                    <Dialog open={editOpen} onOPenChange={ handleEditOpen }>
                        <DialogTrigger asChild>
                             <div className="px-5 pb-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                             <div className="flex items-center justify-between">
                                <p className="text-sm font-semifold">Channel name</p>
                                {member?.role === "admin" && (
                                   <p className="text-sm tsxt-[#1264a3] hover:underline font-semibold">
                                        Edit
                                   </p>
                                )}
                             </div>
                             <p className="text-sm"># {title}</p>
                           </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Rename this channel</DialogTitle>
                            </DialogHeader>
                            <form onSubmit className="space-y-4">
                                <Input 
                                  value={value}
                                  disabled={isupdatingChannel}
                                  onChange={handleChange}
                                  required
                                  autofocus
                                  minLength={3}
                                  maxLength={80}
                                  placeholder="e.g. plan-budget" 
                                />
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" disabled={isupdatingChannel}>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button disabled={isupdatingChannel}>
                                        Save
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                        {member?.role === "admin" && (
                    </Dialog>
                     <button
                       onClick={handleDelete}
                       disabled={isRemovingChannel}
                       className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover: bg-gray-50 text-rose-600"
                    >
                         <TrashIcon className="size-4" />
                         <p className="text-sm font-semibold">Delete Channel</p>
                     </button>
                    )}
                </div>
              </DialogContent>
           </Dialog>
        </div>
    );
};