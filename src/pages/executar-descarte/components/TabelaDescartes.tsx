import { Tabela } from '../../../shared/components';
import { getExemploDescarte } from '../../../shared/services/api';
import { formatDate } from '../../../shared/services';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';
import { useMemo } from 'react';

export const TabelaDescartes = () => {
  const descartes = [getExemploDescarte()];
  const { modalRealizarDescarte, descarteSolicitado } = useExecutarDescarteContext();

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
    <Tabela
      cabecalho={['Solicitado por', 'Momento da solicitação', 'Itens descartados', 'Local de origem']}
      alinhamentos={['left', 'left', 'center', 'left']}
      linhas={linhasTabela}
      acoes={[
        {
          icon: 'map',
          funcao: () => {
            // TODO mostrar a localização no mapa usando Leaflet
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
  );
};
