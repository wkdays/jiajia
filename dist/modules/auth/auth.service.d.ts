import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
            name: string | null;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        token: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: string;
            name: string | null;
        };
    }>;
    getProfile(userId: number): Promise<{
        email: string;
        username: string;
        name: string | null;
        id: number;
        role: string;
        createdAt: Date;
    }>;
    private generateToken;
}
