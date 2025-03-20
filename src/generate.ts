import { JsonValue } from '@protobuf-ts/runtime';
import { PostService } from "./generated/protobuf/blog/post";
import { MethodInfo } from '@protobuf-ts/runtime-rpc';
import {code, imp} from 'ts-poet';

interface GoogleApiHttpOptions {
  get?: string;
  post?: string;
  put?: string;
  delete?: string;
  body?: string;
}

function parseGoogleApiHttpOptions(v: MethodInfo['options']): GoogleApiHttpOptions | null {
  if (typeof v !== 'object') {
    return null;
  }
  const http = v['google.api.http'];
  if (typeof http !== 'object') {
    return null;
  }

  return http as GoogleApiHttpOptions;
}

async function main() {
  const methods = PostService.methods
  // .map(method => {
  //   const options = parseGoogleApiHttpOptions(method.options)
  //   console.log(`[${method.name}] In: ${method.I}, Out: ${method.O}, ${JSON.stringify(options)}`)

  //   return code`

  //   `;
  // });

  const output = code`
    const requestInfoByEndpoint = {
      ${methods.map(method => {
        const options = parseGoogleApiHttpOptions(method.options)
        if (!options) {
          return null;
        }
        return code`
          ${method.name}: {
            url: ${options.get},
            method: ${method.name},
          }
        `;
      })}
    }

    export function typedFetch(url: string, options: RequestInit) {
      const response = await fetch(url, options);
      return response.json();
    }
  `;

  console.log(output.toString());
}

main().catch(error =>{
  console.error(error);
  process.exitCode = 1;
})
