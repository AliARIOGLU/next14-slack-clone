import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Info } from "lucide-react";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data } = useGetWorkspace({ id: workspaceId });

  const [open, setOpen] = useState(false);

  const { data: channels } = useGetChannels({ workspaceId });
  const { data: members } = useGetMembers({ workspaceId });

  const onSelectChannel = (channelId: string) => {
    router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    setOpen(false);
  };

  const onSelectMember = (memberId: string) => {
    router.push(`/workspace/${workspaceId}/member/${memberId}`);
    setOpen(false);
  };

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {data?.name}</span>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Channels">
              {channels?.map((channel) => (
                <CommandItem
                  key={channel._id}
                  onSelect={() => onSelectChannel(channel._id)}
                >
                  {channel.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Members">
              {members?.map((member) => (
                <CommandItem
                  key={member._id}
                  onSelect={() => onSelectMember(member._id)}
                >
                  {member.user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
