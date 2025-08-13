import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
    // const supabase = await createClient();
    // const { data, error } = await supabase.auth.getUser();
    // if (!data.user || error) {
    //     redirect('/');
    // }

    return <div>관리자 페이지</div>;
};

export default AdminPage;
