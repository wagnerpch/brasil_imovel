export function useShare() {
  const shareProperty = async (property: {
    title: string;
    address: string;
    city: string;
    state: string;
  }) => {
    if (!navigator.share) {
      // Fallback para copiar o link para a área de transferência
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      return 'Link copiado para a área de transferência!';
    }

    try {
      await navigator.share({
        title: property.title,
        text: `Confira este imóvel: ${property.title} em ${property.address}, ${property.city}, ${property.state}`,
        url: window.location.href,
      });
      return 'Compartilhado com sucesso!';
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return null; // Usuário cancelou o compartilhamento
      }
      return 'Erro ao compartilhar. Link copiado para a área de transferência.';
    }
  };

  return { shareProperty };
}
