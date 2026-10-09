export interface HealthResponse {
  status: 'ok';
  service: 'stayrelay-api';
}

export function getHealthResponse(): HealthResponse {
  return { status: 'ok', service: 'stayrelay-api' };
}
