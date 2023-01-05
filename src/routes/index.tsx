import { Button } from "@mui/material"
import { Navigate, Route, Routes } from "react-router-dom"

export const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/pagina-inicial" element={<Button> Teste button</Button>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} /> {/* Redirect to home page */}
        </Routes>
    )
}