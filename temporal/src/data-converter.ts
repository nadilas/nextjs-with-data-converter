import { BinaryPayloadConverter, CompositePayloadConverter, EncodingType, METADATA_ENCODING_KEY, Payload, PayloadConverterWithEncoding, UndefinedPayloadConverter } from '@temporalio/common';
import { encode, decode } from '@temporalio/common/lib/encoding';
import * as superjson from 'superjson';

class SuperjsonPayloadConverter implements PayloadConverterWithEncoding {
	public encodingType = 'json/plain' as EncodingType;

	fromPayload(payload: Payload): any {
		return payload.data ? superjson.parse(decode(payload.data)) : undefined;
	}

	toPayload(value: any): Payload | undefined {
		if (value === undefined) {
			return undefined;
		}
		return {
			metadata: {
				[METADATA_ENCODING_KEY]: encode(this.encodingType),
				format: encode('extended'),
			},
			data: encode(superjson.stringify(value)),
		};
	}
}


export const payloadConverter = new CompositePayloadConverter(
	new UndefinedPayloadConverter(),
	new BinaryPayloadConverter(),
	new SuperjsonPayloadConverter(),
);

