import AddButton from '../../common-components/AddButton';
import Topbar from '../../common-components/Topbar';
import TimeZoneCreateModal from './TimeZoneModal/TimeZoneCreateModal';
import useTimeZoneData from './useTimeZoneData';
import { TimeZoneDataContext } from '../../../context/TimeZoneDataContext';
import TimeZoneTable from './TimeZoneTable/TimeZoneTable';

const Home = () => {
    const timeZoneDataLogic = useTimeZoneData();
    return (
        <TimeZoneDataContext.Provider value={timeZoneDataLogic}>
            <div>
                <Topbar />
                <TimeZoneTable />
                <AddButton
                    onClick={() => timeZoneDataLogic.setAddModalOpen(true)}
                    title="Add New Timezone"
                />
                <TimeZoneCreateModal
                    isOpen={timeZoneDataLogic.addModalOpen}
                    onCancel={() => timeZoneDataLogic.setAddModalOpen(false)}
                />
            </div>
        </TimeZoneDataContext.Provider>
    );
};

export default Home;
