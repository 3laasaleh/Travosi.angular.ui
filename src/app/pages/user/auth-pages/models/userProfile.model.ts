import { RoleEnum } from "../../../../core/enums/role.enum";

export interface UserProfileDTO{
              userName: string;
              userId: string;
              role: RoleEnum;
              email: string;
              mobile: string;
              firstName?: string;
              lastName?: string;
              profileImageUrl?: string | null;
}

