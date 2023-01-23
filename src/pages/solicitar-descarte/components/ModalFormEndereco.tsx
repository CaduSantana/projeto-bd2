import { ModalEndereco } from '../../../shared/components';
import DescartesService from '../../../shared/services/api/descartes/DescartesService';
import { useSolicitarDescarteContext } from '../SolicitarDescarteContext';

export const ModalFormEndereco: React.FC = () => {
  // Estados do context
  const { modalEnderecoAberto, produtosAdicionados, snackbar } = useSolicitarDescarteContext();

  return (
    <ModalEndereco
      open={modalEnderecoAberto.value}
      onClose={function () {
        modalEnderecoAberto.setValue(false);
      }}
      onClickConfirm={function (
        ufId: number,
        municipioId: number,
        rua: string,
        numero: number,
        bairro: string,
        cep: number,
        complemento: string
      ) {
        DescartesService.solicitarDescarte({
          origem: {
            rua,
            numero,
            complemento,
            bairro,
            cep: cep.toString(),
            municipioId,
          },
          produtosDescartados: produtosAdicionados.value,
        }).then(() => {
          produtosAdicionados.setValue([]);
          modalEnderecoAberto.setValue(false);
          snackbar.mensagem.setValue('Solicitação de descarte realizada com sucesso!');
          snackbar.tipo.setValue('success');
          snackbar.aberto.setValue(true);
          setTimeout(() => {
            snackbar.aberto.setValue(true);
            setTimeout(() => {
              snackbar.aberto.setValue(false);
            }, 2000);
          }, 200);
        });
        modalEnderecoAberto.setValue(false);
      }}
    />
  );
};
