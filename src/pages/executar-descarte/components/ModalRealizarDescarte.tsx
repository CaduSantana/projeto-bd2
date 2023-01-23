import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { DialogOpcoes, ModalWrapper } from '../../../shared/components';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';
import { ListaFuncionariosSelecionados } from './ListaFuncionariosSelecionados';
import { ModalSelecionarDestino } from './ModalSelecionarDestino';
import { ModalSelecionarVeiculo } from './ModalSelecionarVeiculo';
import { TabelaFuncionariosDisponiveis } from './TabelaFuncionariosDisponiveis';

export const ModalRealizarDescarte: React.FC = () => {
  const [dialogEscolhaDestinoAberto, setDialogEscolhaDestinoAberto] = useState(false);

  const { modalRealizarDescarte, funcionariosSelecionados, modalDestino } = useExecutarDescarteContext();

  const possivelRealizarDescarte = useMemo(
    () =>
      funcionariosSelecionados.value.length > 0 &&
      funcionariosSelecionados.value.every(({ veiculoUtilizado }) => veiculoUtilizado),
    [funcionariosSelecionados]
  );

  return (
    <ModalWrapper
      open={modalRealizarDescarte.open}
      onClose={function () {
        modalRealizarDescarte.setOpen(false);
      }}
    >
      <TabelaFuncionariosDisponiveis />

      <ListaFuncionariosSelecionados />

      <Button
        variant='contained'
        disabled={!possivelRealizarDescarte}
        onClick={function () {
          setDialogEscolhaDestinoAberto(true);
        }}
      >
        Realizar descarte
      </Button>

      <ModalSelecionarVeiculo />

      <DialogOpcoes
        open={dialogEscolhaDestinoAberto}
        onClose={function () {
          setDialogEscolhaDestinoAberto(false);
        }}
        title='Como será escolhido o destino do descarte?'
        text='Você pode escolher entre cadastrar o destino manualmente ou escolher o destino utilizando o mapa.'
        actions={[
          {
            text: 'Cadastrar manualmente',
            onClick: function () {
              setDialogEscolhaDestinoAberto(false);
              modalDestino.setOption('manual');
              modalDestino.setOpen(true);
            },
          },
          {
            text: 'Utilizar mapa',
            onClick: function () {
              setDialogEscolhaDestinoAberto(false);
              modalDestino.setOption('mapa');
              modalDestino.setOpen(true);
            },
          },
        ]}
      />

      <ModalSelecionarDestino />
    </ModalWrapper>
  );
};
