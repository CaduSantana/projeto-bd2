import { Environment } from '../../../enviroment';
import EnderecosService from '../enderecos/EnderecosService';
import PessoasService from '../pessoas/PessoasService';

interface DescarteGet {
  solicitado_em: Date;
  uuid_solicitante: string;
  uuid_destino: string;
  uuid_origem: string;
}

async function getAllDescartes() {
  const response = await fetch(`${Environment.URL_BASE}/descartes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: DescarteGet[] = await response.json();

  if (data) {
    // Map assíncrono para obter UF pelo id_uf de cada municipio
    return await Promise.all(
      data.map(async (descarte) => {
        const solicitante = await PessoasService.getPessoaByUUID(descarte.uuid_solicitante);
        const destino = await EnderecosService.getEnderecoByUUId(descarte.uuid_destino);
        const origem = await EnderecosService.getEnderecoByUUId(descarte.uuid_origem);
        return {
          solicitado_em: descarte.solicitado_em,
          solicitante,
          destino,
          origem,
        };
      })
    );
  }

  return Promise.reject('Não foi possível obter os descartes');
}

export default {
  getAllDescartes,
};
