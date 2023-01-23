import { useState } from 'react';
import { MapaInterativoLeaflet, ModalEndereco, ModalWrapper } from '../../../shared/components';
import { IPessoa, IVeiculo } from '../../../shared/interfaces';
import DescartesService from '../../../shared/services/api/descartes/DescartesService';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const ModalSelecionarDestino: React.FC = () => {
  const {
    descarteSolicitado,
    funcionariosSelecionados,
    modalDestino,
    modalRealizarDescarte,
    snackbar,
    signal: { toggle: toggleSignal },
  } = useExecutarDescarteContext();
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: -22.12077189709656,
    lng: -51.40811411654623,
  });

  function handlerRealizarDescarte(
    rua: string,
    numero: number,
    complemento: string,
    bairro: string,
    cep: number,
    municipioId: number
  ) {
    modalDestino.setOpen(false);
    modalRealizarDescarte.setOpen(false);
    if (!descarteSolicitado.value) return;

    DescartesService.executarDescarte(
      descarteSolicitado.value.uuid,
      funcionariosSelecionados.value as { funcionario: IPessoa; veiculoUtilizado: IVeiculo }[],
      {
        rua: rua,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep.toString(),
        municipioId: municipioId,
      }
    ).then(() => {
      toggleSignal();
      setTimeout(() => {
        snackbar.aberto.setValue(true);
        snackbar.mensagem.setValue('Descarte realizado com sucesso!');
        snackbar.tipo.setValue('success');
        setTimeout(() => {
          snackbar.aberto.setValue(false);
        }, 2000);
      }, 200);
    });
  }

  return (
    <>
      {modalDestino.option === 'manual' ? (
        <>
          <ModalEndereco
            open={modalDestino.open}
            onClose={function () {
              modalDestino.setOpen(false);
            }}
            onClickConfirm={function (
              _ufId: number,
              municipioId: number,
              rua: string,
              numero: number,
              bairro: string,
              cep: number,
              complemento: string
            ) {
              handlerRealizarDescarte(rua, numero, complemento, bairro, cep, municipioId);
            }}
          />
        </>
      ) : (
        <ModalWrapper
          open={modalDestino.open}
          onClose={function () {
            modalDestino.setOpen(false);
          }}
        >
          <MapaInterativoLeaflet
            height={50}
            width={50}
            latInicial={-22.12077189709656}
            lngInicial={-51.40811411654623}
            onMarkerMove={function (position: { lat: number; lng: number }) {
              setCoordinates({
                lat: position.lat,
                lng: position.lng,
              });
            }}
          />
        </ModalWrapper>
      )}
    </>
  );
};
