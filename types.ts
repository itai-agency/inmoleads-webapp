
export enum PropertyStatus {
  Pendiente = 'pendiente',
  Visitada = 'visitada',
  Viable = 'viable',
  NoViable = 'no_viable',
  EnRevision = 'en_revision',
}

export interface Property {
  id: string;
  nombre: string;
  direccion: string;
  tipo: 'casa' | 'departamento';
  habitaciones: number;
  banos: number;
  superficie_m2: number;
  adeudo_infonavit: number;
  adeudo_agua: number;
  adeudo_luz: number;
  adeudo_predial: number;
  status: PropertyStatus;
  coordenadas: {
    lat: number;
    lng: number;
  };
  comentarios_cliente: string | null;
}
