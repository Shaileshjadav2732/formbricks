"use client";

import { joinTeamAction, leaveTeamAction } from "@/modules/ee/teams/team-list/actions";
import { CreateTeamModal } from "@/modules/ee/teams/team-list/components/create-team-modal";
import { OtherTeams } from "@/modules/ee/teams/team-list/components/other-teams";
import { YourTeams } from "@/modules/ee/teams/team-list/components/your-teams";
import { TOtherTeam, TUserTeam } from "@/modules/ee/teams/team-list/types/teams";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { getFormattedErrorMessage } from "@formbricks/lib/actionClient/helper";
import { Button } from "@formbricks/ui/components/Button";
import { H3 } from "@formbricks/ui/components/Typography";

interface TeamsViewProps {
  organizationId: string;
  teams: { userTeams: TUserTeam[]; otherTeams: TOtherTeam[] };
}

export const TeamsView = ({ organizationId, teams }: TeamsViewProps) => {
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState<boolean>(false);

  const router = useRouter();

  const leaveTeam = async (teamId: string) => {
    const leaveTeamActionResponse = await leaveTeamAction({ teamId });
    if (leaveTeamActionResponse?.data) {
      router.refresh();
    } else {
      const errorMessage = getFormattedErrorMessage(leaveTeamActionResponse);
      toast.error(errorMessage);
    }
  };

  const joinTeam = async (teamId: string) => {
    const joinTeamActionResponse = await joinTeamAction({ teamId });
    if (joinTeamActionResponse?.data) {
      router.refresh();
    } else {
      const errorMessage = getFormattedErrorMessage(joinTeamActionResponse);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <H3>Teams</H3>
        <Button variant="primary" size="sm" onClick={() => setOpenCreateTeamModal(true)}>
          Create Team
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <YourTeams teams={teams.userTeams} leaveTeam={leaveTeam} />
        <OtherTeams teams={teams.otherTeams} joinTeam={joinTeam} />
      </div>
      {
        <CreateTeamModal
          open={openCreateTeamModal}
          setOpen={setOpenCreateTeamModal}
          organizationId={organizationId}
        />
      }
    </div>
  );
};
