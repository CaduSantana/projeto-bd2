import { MapaInterativoLeaflet, ModalEndereco, ModalWrapper } from '../../../shared/components';
import { useExecutarDescarteContext } from '../ExecutarDescarteContext';

export const ModalSelecionarDestino: React.FC = () => {
  const { modalDestino } = useExecutarDescarteContext();

  return (
    <>
      {modalDestino.option === 'manual' ? (
        <ModalEndereco
          open={modalDestino.open}
          onClose={function () {
            modalDestino.setOpen(false);
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
            modalDestino.setEndereco({
              ufId,
              municipioId,
              rua,
              numero,
              bairro,
              cep,
              complemento,
            });
            modalDestino.setOpen(false);
          }}
        />
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
            latInicial={modalDestino.coordinates?.lat ? modalDestino.coordinates.lat : -23.55052}
            lngInicial={modalDestino.coordinates?.lng ? modalDestino.coordinates.lng : -46.633309}
            onMarkerMove={function (position: { lat: number; lng: number }) {
              modalDestino.setCoordinates({
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
