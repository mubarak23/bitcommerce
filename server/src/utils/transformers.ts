import { ValueTransformer } from "typeorm"
import { isNullOrUndefined } from "./core"


// export class ColumnNumericTransformer {
//   to(data: number): number {
//     return data;
//   }
//   from(data: string): number {
//     return parseFloat(data);
//   }
// }

// https://github.com/typeorm/typeorm/issues/873

export class ColumnNumericTransformer implements ValueTransformer {
	to(data?: number | null): number | null {
		if (!isNullOrUndefined(data)) {
			return data
		}
		return null
	}

	from(data?: string | null): number | null {
		if (!isNullOrUndefined(data)) {
			const res = parseFloat(data)
			if (isNaN(res)) {
				return null
			} 
			return res
			
		}
		return null
	}
}

export class ColumnNumericArrayTransformer {
  to(data: number[]): number[] {
    return data;
  }
  from(data: string[]): number[] | undefined {
    return data ? data.map(x => parseInt(x)) : undefined
  }
}
