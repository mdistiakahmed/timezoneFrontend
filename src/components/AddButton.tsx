import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const AddButton = () => {
  return (
    <Tooltip title="Add New TimeZone">
    <IconButton aria-label="add" sx={{ position: 'fixed', zIndex: 999, bottom: 10,right:10}}>
          <AddCircleOutlineIcon color="primary" sx={{":hover": {transform: 'scale(1.2)'}, minHeight: 60, minWidth: 50}}/>

    </IconButton>
    </Tooltip>
  )
}

export default AddButton