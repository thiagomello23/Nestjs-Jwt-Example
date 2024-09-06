import { SetMetadata } from "@nestjs/common";

export const ROLE = "role"

export function Role(roles: string) {
    return SetMetadata(ROLE, roles)
}