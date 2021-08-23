import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios } from "@/utils/nuxt-instance"
import { Book } from "@/models"

interface Show {
  id: Book['id']
}

@Module({
  name: 'books',
  stateFactory: true,
  namespaced: true
})
export default class Books extends VuexModule {
  private books = [] as Book[]
  private book = {} as Book

  public get $all() {
    return this.books
  }

  public get $single() {
    return this.book
  }

  @Mutation
  private SET_ALL(books: Book[]) {
    this.books = books
  }

  @Mutation
  private SET_SINGLE(book: Book) {
    this.book = book
  }

  @Action({
    commit: "SET_ALL"
  })
  public async index() {
    const books = await $axios.$get("/books")
      .catch(() => {})

    if (!books) return [];

    return books
  }

  @Action({
    commit: "SET_SINGLE"
  })
  public async show({ id }: Show) {
    const book = await $axios.$get(`/books/${id}`)
    .catch(() => {})

    if (!book) return [];

    return book
  }
}
