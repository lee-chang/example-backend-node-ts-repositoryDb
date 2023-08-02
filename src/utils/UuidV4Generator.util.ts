import { v4 as uuidV4 } from 'uuid'

export interface UuidGenerator {
  generate: () => string
}


export const uuidV4Generator: UuidGenerator = {
  generate: () => uuidV4()
}
