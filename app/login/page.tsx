import { login, signup } from '@/action/login';

export default function LoginPage() {
    return (
        <div>
            <h1>관리자 로그인</h1>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <button formAction={login}>Log in</button>
                {/* <button formAction={signup}>Sign up</button> */}
            </form>
        </div>
    );
}
