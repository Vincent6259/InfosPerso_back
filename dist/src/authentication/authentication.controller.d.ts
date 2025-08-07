import { AuthRequest, JwtPayload } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { authenticationWithUserResponse, Tokens } from './types';
export declare class AuthenticationController {
    private authenticationService;
    constructor(authenticationService: AuthenticationService);
    signUp(createUserDtot: CreateUserDto): Promise<authenticationWithUserResponse>;
    signIn(signInDto: SignInDto): Promise<authenticationWithUserResponse>;
    refresh(req: AuthRequest): Promise<Tokens>;
    logout(req: AuthRequest): Promise<void>;
    getProfile(req: AuthRequest): JwtPayload | undefined;
}
