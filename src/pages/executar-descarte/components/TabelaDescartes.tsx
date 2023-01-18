import { MapaLeaflet, IMapaLeafletProps, ModalWrapper, Tabela } from '../../../shared/components';
import { getExemploDescarte } from '../../../shared/services/api';
import { formatDate } from '../../../shared/services';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';
import { useMemo, useState } from 'react';

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

  const linhasTabela: string[][] = useMemo(
    () =>
      descartes.map((descarte) => [
        `${descarte.solicitante.nome} ${descarte.solicitante.sobrenome}`,
        formatDate(descarte.solicitadoEm),
        descarte.produtosDescartados
          .map((itemProduto) => `${itemProduto.produto.nome} (${itemProduto.quantidade})`)
          .join(', '),
        `${descarte.origem.rua}, ${descarte.origem.numero} - ${descarte.origem.bairro}`,
      ]),
    [descartes]
  );

  return (
    <>
      <Tabela
        cabecalho={['Solicitado por', 'Momento da solicitação', 'Itens descartados', 'Local de origem']}
        alinhamentos={['left', 'left', 'center', 'left']}
        linhas={linhasTabela}
        acoes={[
          {
            icon: 'map',
            funcao: (linhaIndex) => {
              setLatLngMapaLeaflet([
                descartes[linhaIndex].origem.coordinates?.lat ?? 0,
                descartes[linhaIndex].origem.coordinates?.long ?? 0,
              ]);
              setModalMapaLeafletAberto(true);
            },
          },
          {
            icon: 'auto_delete',
            funcao: (linhaIndex) => {
              descarteSolicitado.setValue(descartes[linhaIndex]);
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
