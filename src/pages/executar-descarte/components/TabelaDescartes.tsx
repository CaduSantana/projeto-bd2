import { Tabela } from '../../../shared/components';
import { getExemploDescarte } from '../../../shared/services/api';
import { formatDate } from '../../../shared/services';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const TabelaDescartes = () => {
  const descartes = [getExemploDescarte()];
  const { modalRealizarDescarte } = useExecutarDescarteContext();

  return (
    <Tabela
      cabecalho={['Solicitado por', 'Momento da solicitação', 'Itens descartados', 'Local de origem']}
      alinhamentos={['left', 'left', 'center', 'left']}
      linhas={descartes.map((descarte) => [
        `${descarte.solicitante.nome} ${descarte.solicitante.sobrenome}`,
        formatDate(descarte.solicitadoEm),
        descarte.produtosDescartados
          .map((itemProduto) => `${itemProduto.produto.nome} (${itemProduto.quantidade})`)
          .join(', '),
        `${descarte.origem.rua}, ${descarte.origem.numero} - ${descarte.origem.bairro}`,
      ])}
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
            modalRealizarDescarte.setValue(true);
          },
        },
      ]}
    />
  );
};
