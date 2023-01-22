import { MapaLeaflet, IMapaLeafletProps, ModalWrapper, Tabela } from '../../../shared/components';
import { getExemploDescarte } from '../../../shared/services/api';
import { IDescarte } from '../../../shared/interfaces';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';
import { useMemo, useState } from 'react';
import { formatDate } from '../../../shared/services';

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
  const descartes = [getExemploDescarte()];
  const { modalRealizarDescarte, descarteSolicitado } = useExecutarDescarteContext();
  const [modalMapaLeafletAberto, setModalMapaLeafletAberto] = useState(false);
  const [latLngMapaLeaflet, setLatLngMapaLeaflet] = useState<[number, number]>([0, 0]);

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
