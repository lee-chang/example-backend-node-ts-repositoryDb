import { Schema, model } from 'mongoose'
import { Role } from '@/interfaces/entities/role.interface'
import { uuidDBGenerator } from '@/utils/UuidGenerator.util'

const roleSchema = new Schema<Role>(
  {
    _id: {
      type: String,
      default: uuidDBGenerator.generate(),
    },
    name: {
      type: String,
      require: true,
      unique: true,
    },
    permissions: {
      type: [String],
    },
    users: [
      {
        ref: 'User',
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const RoleModel = model<Role>('Role', roleSchema)
