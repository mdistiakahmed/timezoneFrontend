import { useState } from 'react';
import AddButton from '../../common-components/AddButton';
import AllTimezones from './AllTimezones';
import AddTimezoneDialog from './AddTimezoneDialog';
import Topbar from '../../common-components/Topbar';
import CssBaseline from '@mui/material/CssBaseline';

const Home = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    return (
        <div>
            <Topbar />
            <AllTimezones />
            <AddButton
                onClick={() => setModalOpen(true)}
                title="Add New Timezone"
            />
            <AddTimezoneDialog
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                onAdd={() => {}}
                title="Add TimeZone"
            />
            <CssBaseline />
        </div>
    );
};

export default Home;
