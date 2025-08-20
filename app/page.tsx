import Maps from '@/components/Maps';
import styles from './page.module.scss';
import Inquiry from '@/components/Inquiry';

export default async function Home() {
    return (
        <div className={styles.page}>
            <Maps />
            <Inquiry />
        </div>
    );
}
