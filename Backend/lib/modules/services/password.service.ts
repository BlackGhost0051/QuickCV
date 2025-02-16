import bcrypt from 'bcrypt';

class PasswordService{
    private saltRounds: number = 10;

    async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword;
    }

    async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>{
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }
}

export default PasswordService;