import { Body, Controller, Get, Headers, Inject, Post, Res } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { AuthService } from './auth.service.js'

interface LoginBody {
  email?: string
  password?: string
}

@Controller('api')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() body: LoginBody, @Res() reply: FastifyReply) {
    const result = this.authService.login(body.email || '', body.password || '')
    if (!result) return reply.code(401).send({ message: '이메일 또는 비밀번호를 확인해주세요.' })
    return reply.send(result)
  }

  @Get('me')
  me(@Headers('authorization') authorization: string | undefined, @Res() reply: FastifyReply) {
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null
    if (!token) return reply.code(401).send({ message: '인증 토큰이 필요합니다.' })

    try {
      return reply.send({ user: this.authService.verifyToken(token) })
    } catch {
      return reply.code(401).send({ message: '유효하지 않거나 만료된 토큰입니다.' })
    }
  }
}
