import AddButton from '../../common-components/AddButton';
import AllTimezones from './AllTimezones';
import Topbar from '../../common-components/Topbar';
import TimeZoneCreateModal from './TimeZoneModal/TimeZoneCreateModal';
import useTimeZoneData from './useTimeZoneData';
import { TimeZoneDataContext } from '../../../context/TimeZoneDataContext';

const Home = () => {
    const timeZoneDataLogic = useTimeZoneData();
    return (
        <TimeZoneDataContext.Provider value={timeZoneDataLogic}>
            <div>
                <Topbar />
                <AllTimezones />
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
