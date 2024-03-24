// @ts-expect-error - This is a workaround for the missing type definition
import jsquashWasmBinary from '@jsquash/jxl/codec/dec/jxl_dec.wasm';
import { init as jsquashInit } from '@jsquash/jxl/decode';
import 'jimp';

declare const Jimp: typeof import('jimp');

// 初期化を一度だけ
let decodeFunction;
export async function transformJpegXLToBmp(response: Response): Promise<Response> {
  if (!decodeFunction) {
    const { decode } = await jsquashInit(undefined, {
      locateFile: () => {},
      wasmBinary: jsquashWasmBinary,
    });
    decodeFunction = decode;
  }

  const imageData = decodeFunction(await response.arrayBuffer())!;
  const bmpBinary = await new Jimp(imageData).getBufferAsync(Jimp.MIME_BMP);

  return new Response(bmpBinary, {
    headers: {
      'Cache-Control': 'public',
      'Content-Type': 'image/bmp',
    },
  });
}