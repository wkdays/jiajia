import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<{
        email: string;
        username: string;
        name: string | null;
        id: number;
        role: string;
        createdAt: Date;
    }>;
}
