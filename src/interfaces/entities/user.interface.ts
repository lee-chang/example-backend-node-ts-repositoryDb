import { Auth } from '../auth.interface'
import { Phone } from '../partials/phone.interface'

export interface User extends Auth {
  _id: string
  userName: string
  fullName: string
  authority: string[]
  verified: boolean
  login_code: string
  phone: Phone
  createdAt: Date
  updatedAt: Date
}
