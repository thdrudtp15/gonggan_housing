import Maps from '@/components/Maps';
import styles from './page.module.scss';
import { createClient } from '@/lib/supabase';

export default async function Home() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('portfolio').select();

    console.log(data);

    return (
        <div className={styles.page}>
            <Maps />
        </div>
    );
}
