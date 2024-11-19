"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import  Image  from "next/image";
import { Loader } from "lucide-react";
import Link from "next/Link";
import VerificationInput from "react-verification-input";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useJoin } from "@/features/workspaces/api/use-join";
import { Toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";

//  interface JoinPageProps {
    // params: {
        // workspaceId: string;
    // };
// };


const JoinPage = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useJoin();
    const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });

    const isMember = useMemo(() => data?.isMember, [data?.isMember]);
    
    useEffect(() => {
        if (isMember) {
            router.push('/workspace/${workspaceId}');
        }

    }, [isMember, router, workspaceId]);

    const handleComplete = (value: string) => {
        mutate({ workspaceId, JoinCode: value }, {
            onSuccess: (id) => {
                router.replace('/workspace/${id');
                Toast.success("workspace joined");
            },
            onErrpr: () => {
                toast.Error("failed to join workspace")
            }
        })
    }

   if (isLoading) {
    return(
        <div className="h-full flex items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    )
   }


    return (
        <div className="h-full flex flex-coll gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-md">

          <Image src="/favicon.ico" width={60} height={60} alt="Favicon" />
          <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
            <div className="flex flex-col gap-y-2 items-center">
                <h1 className="text-2xl font-bold">
                   Join {data?.name}     
                </h1>
                <p className="text-md text-muted-foreground">
                  Enter the workspace code to join     
                </p> 

            </div>
            <VerificationInput
              onComplete={handlecomplete}
              length={6} 
              className={{
                container: cn("flex gap-x-2", isPending && "opacity-50 cursor-not-allowed"),
                character: "uppercase h-auto rounnded-md border-gray-300 flex items-center justify-center text-lg font-mediumtext-gray-500"
                characterinactive: "bg-muted",
                characterSelected: "bg-white text-black",
                charactersFilled: "bg-white text-black"
              }}
              autoFocus
            />
          </div>
          <div className="flex gap-y-4">
             <Button
              size="lg"
              variant="outline"
              acChild
             >
                <Link href="/">
                 Back to home
                </Link>
             </Button>  
          </div>
        </div>
    );
}

export default JoinPage;