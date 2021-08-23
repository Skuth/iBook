import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'

interface Store {
  email: string
  password: string
}

type Token = string | null

@Module({ name: 'auth', stateFactory: true, namespaced: true })
export default class Auth extends VuexModule {
  private token = '' as Token

  @Mutation
  private UPDATE_TOKEN(token: Token) {
    this.token = token
  }

  @Action({
    rawError: true,
    commit: "UPDATE_TOKEN"
  })
  async create({ email, password }: Store) {
    const { accessToken } = await $axios.$post('/login', { email, password })

    $cookies.set('token', accessToken, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return accessToken
  }

  @Action({
    rawError: true,
    commit: "UPDATE_TOKEN"
  })
  public update() {
    const token = $cookies.get('token') || null
    return token
  }

  @Action({
    rawError: true,
    commit: "UPDATE_TOKEN"
  })
  public destroy() {
    $cookies.remove('token')
    return null
  }
}
