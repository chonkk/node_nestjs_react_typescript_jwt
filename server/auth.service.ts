import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface User {
  id: string
  name: string
  email: string
}

interface LoginUser extends User {
  password: string
}

@Injectable()
export class AuthService {
  private readonly demoUser: LoginUser = {
    id: 'usr_01',
    name: '민지',
    email: 'demo@nova.io',
    password: 'nova1234',
  }

  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

  login(email: string, password: string) {
    if (email !== this.demoUser.email || password !== this.demoUser.password) return null

    const user: User = {
      id: this.demoUser.id,
      name: this.demoUser.name,
      email: this.demoUser.email,
    }
    return { token: this.jwtService.sign(user), user }
  }

  verifyToken(token: string): User {
    return this.jwtService.verify<User>(token)
  }
}
