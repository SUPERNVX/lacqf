# Instruções para Conversão WebM

## Vídeo Dark Mode Convertido
Para implementar o WebM no hero, você precisa:

1. **Converter o vídeo**: `Hero dark.mp4` → `Hero dark.webm`
2. **Colocar o arquivo**: `public/videos/Hero dark.webm`
3. **O código já está preparado** para usar WebM com fallback MP4

## Comando de Conversão (FFmpeg)
```bash
ffmpeg -i "Hero dark.mp4" -c:v libvpx-vp9 -b:v 1M -c:a libopus "Hero dark.webm"
```

## Benefícios do WebM
- ✅ **Compressão Superior**: Mesmo resultado visual com ~70% menos tamanho
- ✅ **Performance**: Carregamento mais rápido, especialmente mobile
- ✅ **Compatibilidade**: Browsers modernos suportam WebM
- ✅ **Fallback**: MP4 garante funcionamento universal

O código no `Hero.jsx` já implementa:
```html
<source src="/videos/Hero dark.webm" type="video/webm" />
<source src="/videos/Hero dark.mp4" type="video/mp4" />
```

Assim que você colocar o arquivo `Hero dark.webm` na pasta `public/videos/`, o site automaticamente usará a versão WebM (mais leve) quando suportada pelo browser.
