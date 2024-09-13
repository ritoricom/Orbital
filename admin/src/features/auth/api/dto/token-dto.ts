import { Token } from "@/features/auth";

export interface TokenDto {
  token: string;
  lifetime: number;
}

export const fromTokenDto = (dto: TokenDto): Token => ({
  token: dto.token,
  expired: dto.lifetime,
});
