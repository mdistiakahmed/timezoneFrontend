import { useState } from 'react';
import AddButton from '../components/AddButton';
import AllTimezones from '../components/AllTimezones';
import AddTimezoneDialog from '../components/AddTimezoneDialog';
import Topbar from '../components/Topbar';

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
    </div>
  );
};

export default Home;
