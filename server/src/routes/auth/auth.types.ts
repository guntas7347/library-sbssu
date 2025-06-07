import type { FastifyReply, FastifyRequest } from "fastify";

export interface LoginRequestBody {
  userName: string;
  password: string;
}

export type loginContext = {
  password: string;
  hash: string;
  _id: string;
  role: string;
  secret: string | null;
  userType: string;
};

export type AuthLoginRequest = FastifyRequest<{
  Body: { userName: string; password: string; totp: string };
}>;

export type Auth2FARequest = FastifyRequest<{
  Body: { totp: string };
}>;

export type AuthUserNameRequest = FastifyRequest<{
  Body: { userName: string };
}>;

export type AuthCodeRequest = FastifyRequest<{
  Body: { code: string };
}>;

export type AuthLinkRequest = FastifyRequest<{
  Body: { url: string };
}>;

export type ForgotPasswordRequest = FastifyRequest<{
  Body: { userName: string; url: string };
}>;

export type ResetPasswordRequest = FastifyRequest<{
  Body: { password: string; code: string; totp: string };
}>;

export type AuthReply = FastifyReply;

export type ResetPasswordBody = {
  password: string;
  code: string;
  totp: string;
};

export type LoginBody = { userName: string; password: string; totp: string };

export type ForgotPasswordBody = { userName: string; url: string };
