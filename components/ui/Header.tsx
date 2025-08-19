import { signOut } from '@/action/login';
import { createClient } from '@/utils/supabase/server';

const Header = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <header>
            {data.user && (
                <form action={signOut}>
                    <button>로그아웃</button>
                </form>
            )}
        </header>
    );
};

export default Header;
