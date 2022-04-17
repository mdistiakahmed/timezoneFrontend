import IconButton from '@mui/material/IconButton';
import { TimeZoneDataModel } from '../../../../constants/DataModel';
import CustomCard from '../../../common-components/CustomCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TableEntry = ({
    name,
    city,
    hourDiff,
    minuteDiff,
}: TimeZoneDataModel) => {
    const title = <span>{name}</span>;
    const subheader = <p>{city}</p>;
    const body = () => {
        return (
            <div>
                <p>{hourDiff}</p>
                <p>{minuteDiff}</p>
            </div>
        );
    };
    const actions = () => {
        return (
            <div>
                <IconButton aria-label="edit" onClick={() => {}}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => {}}>
                    <DeleteForeverIcon sx={{ fill: 'red' }} />
                </IconButton>
            </div>
        );
    };
    return (
        <CustomCard
            title={title}
            subheader={subheader}
            body={body()}
            cardActions={actions()}
        />
    );
};

export default TableEntry;
