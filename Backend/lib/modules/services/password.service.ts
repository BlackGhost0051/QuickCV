import bcrypt from 'bcrypt';

class PasswordService{

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }
}

export default PasswordService;