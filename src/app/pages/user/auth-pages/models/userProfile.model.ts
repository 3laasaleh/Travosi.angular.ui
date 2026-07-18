import { RoleEnum } from "../../../../core/enums/role.enum";

export interface UserProfileModel{
              userName: string;
              userId: string;
              role: RoleEnum;
              email: string;
              mobile: string;
}

