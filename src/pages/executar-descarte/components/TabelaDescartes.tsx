import { MapaLeaflet, IMapaLeafletProps, ModalWrapper, Tabela, AlertaFalha } from '../../../shared/components';
import { IDescarte } from '../../../shared/interfaces';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';
import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../../../shared/services';
import DescartesService from '../../../shared/services/api/descartes/DescartesService';
import { CircularProgress } from '@mui/material';

type ModalMapaLeaftletProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
} & IMapaLeafletProps;

const ModalMapaLeaftlet: React.FC<ModalMapaLeaftletProps> = ({ open, setOpen, ...props }) => {
  function handleModalClose() {
    setOpen(false);
  }

  return (
    <ModalWrapper open={open} onClose={handleModalClose}>
      <MapaLeaflet {...props} />
    </ModalWrapper>
  );
};

export const TabelaDescartes = () => {
  // States de carregamento de dados
  const [descartes, setDescartes] = useState<IDescarte[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'success' | 'fail'>('loading');

  // States do componente
  const [modalMapaLeafletAberto, setModalMapaLeafletAberto] = useState(false);
  const [latLngMapaLeaflet, setLatLngMapaLeaflet] = useState<[number, number]>([0, 0]);

  // States de contexto
  const { modalRealizarDescarte, descarteSolicitado, signal: { value: signal } } = useExecutarDescarteContext();

  useEffect(() => {
    setLoadingStatus('loading');

    DescartesService.getAllDescartes()
      .then((descartes) => {
        setDescartes(descartes.filter((descarte) => descarte.destino === null));
        setLoadingStatus('success');
      })
      .catch(() => {
        setLoadingStatus('fail');
      });
  }, [signal]);

  // Memoize linhas da tabela
  const tableData = useMemo(
    () =>
      descartes.map((descarte) => ({
        key: descarte.uuid,
        value: descarte,
      })),
    [descartes]
  );

  return (
    <>
      {loadingStatus === 'success' && (
        <Tabela
          columns={[
            {
              key: 'solicitante',
              label: 'Solicitado por',
            },
            {
              key: 'momento',
              label: 'Momento da solicitação',
            },
            {
              key: 'itens',
              label: 'Itens descartados',
            },
            {
              key: 'origem',
              label: 'Local de origem',
            },
          ]}
          alignments={['left', 'left', 'center', 'left']}
          data={tableData}
          mapper={(descarte) => {
            const descarteValue = descarte as IDescarte;
            return [
              `${descarteValue.solicitante.nome} ${descarteValue.solicitante.sobrenome}`,
              formatDate(descarteValue.solicitadoEm),
              descarteValue.produtosDescartados
                .map(({ produto, quantidade }) => `${produto.nome} (${quantidade})`)
                .join(', '),
              `${descarteValue.origem.rua} - ${descarteValue.origem.numero} - ${descarteValue.origem.bairro}`,
            ];
          }}
          actions={[
            {
              icon: 'map',
              onClick: function (descarte) {
                const descarteValue = descarte as IDescarte;
                if (descarteValue.origem.coordinates) {
                  setLatLngMapaLeaflet([descarteValue.origem.coordinates.lat, descarteValue.origem.coordinates.long]);
                  setModalMapaLeafletAberto(true);
                }
              },
              isAvailable: function (descarte) {
                return !!(descarte as IDescarte).origem.coordinates;
              },
            },
            {
              icon: 'auto_delete',
              onClick: function (descarte) {
                descarteSolicitado.setValue(descarte as IDescarte);
                modalRealizarDescarte.setOpen(true);
              },
            },
          ]}
        />
      )}
      {loadingStatus === 'loading' && <CircularProgress />}
      {loadingStatus === 'fail' && <AlertaFalha />}

      <ModalMapaLeaftlet
        open={modalMapaLeafletAberto}
        setOpen={setModalMapaLeafletAberto}
        lat={latLngMapaLeaflet[0]}
        lng={latLngMapaLeaflet[1]}
        width={50}
        height={50}
      />
    </>
  );
};
