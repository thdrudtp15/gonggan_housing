import { signOut } from '@/action/login';
import { createClient } from '@/utils/supabase/server';

import styles from './Header.module.scss';
import Link from 'next/link';

const Header = async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="portfolio">시공사례</Link>
                    </li>
                </ul>
            </nav>
            {data.user && (
                <form action={signOut}>
                    <button>로그아웃</button>
                </form>
            )}
        </header>
    );
};

export default Header;
