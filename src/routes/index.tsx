import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, SolicitarDescarte, GerenciarVeiculos, GerenciarFuncionarios } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: 'restore_from_trash',
        path: '/solicitar-descarte',
        label: 'Solicitar um descarte',
      },
      {
        icon: 'local_shipping',
        path: '/gerenciar-veiculos',
        label: 'Gerenciar veículos',
      },
      {
        icon: 'people',
        path: '/gerenciar-funcionarios',
        label: 'Gerenciar funcionários',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />
      <Route path='/solicitar-descarte' element={<SolicitarDescarte />} />
      <Route path='/gerenciar-veiculos' element={<GerenciarVeiculos />} />
      <Route path='/gerenciar-funcionarios' element={<GerenciarFuncionarios />} />
      <Route path='*' element={<Navigate to='/pagina-inicial' />} /> {/* Redirect to home page */}
    </Routes>
  );
};
