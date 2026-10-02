/** Ritmo de leitura confortável para texto corrido na tela. */
export const PALAVRAS_POR_SEGUNDO = 3.2;

export function contarPalavras(texto: string) {
  return texto.split(/\s+/).filter(Boolean).length;
}

/**
 * Quanto do texto já deveria ter passado, de 0 a 1. Anda no ritmo de leitura,
 * ou no do vídeo quando ele é mais rápido: um vídeo longo não arrasta o texto,
 * e um vídeo curto não termina com texto sobrando.
 */
export function progressoDeLeitura(video: HTMLVideoElement, palavras: number) {
  if (!video.duration) return 0;
  const peloVideo = video.currentTime / video.duration;
  const tempoDeLeitura = Math.max(1, palavras / PALAVRAS_POR_SEGUNDO);
  return Math.min(1, Math.max(peloVideo, video.currentTime / tempoDeLeitura));
}
