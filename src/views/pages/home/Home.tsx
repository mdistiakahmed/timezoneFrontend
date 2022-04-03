import { useState } from 'react';
import AddButton from '../../common-components/AddButton';
import AllTimezones from './AllTimezones';
import AddTimezoneDialog from './AddTimezoneDialog';
import Topbar from '../../common-components/Topbar';
import Toast from '../../common-components/Toast';
import CssBaseline from '@mui/material/CssBaseline';
import { AlertSeverity } from '../../../constants/GeneralConstants';

const Home = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <div>
      <Topbar />
      <AllTimezones />
      <AddButton onClick={() => setModalOpen(true)} />
      <AddTimezoneDialog
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onAdd={() => {}}
        title="Add TimeZone"
      />
      <CssBaseline />
      <Toast message='This is a toast a great one!!' alertSeverity={AlertSeverity.SUCCESS}/>
    </div>
  );
};

export default Home;
