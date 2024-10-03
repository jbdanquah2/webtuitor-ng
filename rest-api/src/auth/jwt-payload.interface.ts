export interface JwtPayload {
    id: string;
    email: string;
    name: string;
    role: string;
    last_login: Date;
    created_at: Date;
    updated_at: Date;
}
