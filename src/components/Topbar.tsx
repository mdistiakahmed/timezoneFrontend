import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = () => {
  console.log('insidde topbar');
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {/* Display when screen is less then medium  */}
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            TimeZone
          </Typography>

          <MenuIcon />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
