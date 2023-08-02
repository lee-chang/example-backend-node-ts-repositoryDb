import { model, Schema } from 'mongoose'
import { Task } from '@/interfaces/task.interface'
import { uuidV4Generator } from '@/utils/UuidV4Generator.util'

const taskSchema: Schema = new Schema<Task>(
  {
    _id: {
      type: String,
      default: uuidV4Generator.generate(),
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const TaskModel = model<Task>('Task', taskSchema)
export default TaskModel
