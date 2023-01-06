import { Button } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleDrawerOpen } = useDrawerContext();
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/pagina-inicial" element={<Button variant='contained' color="primary" onClick={ toggleDrawerOpen }> Toggle drawer</Button>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} /> {/* Redirect to home page */}
        </Routes>
    );
};