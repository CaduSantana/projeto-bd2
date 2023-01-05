import { Button } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAppThemeContext } from "../shared/contexts";

export const AppRoutes = () => {
    const {toggleTheme} = useAppThemeContext();
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/pagina-inicial" element={<Button variant='contained' color="primary" onClick={toggleTheme}> Teste button</Button>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} /> {/* Redirect to home page */}
        </Routes>
    )
}