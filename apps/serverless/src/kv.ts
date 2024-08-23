export class KV {
  private kv: KVNamespace

  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  async get_members(): Promise<string[]> {
    const usernames = await this.kv.get('members', 'text')
    return usernames?.split('\n') ?? []
  }

  async get_user_id(username: string): Promise<string | null> {
    return this.kv.get(`id:${username}`, 'text')
  }

  async put_user_id(username: string, id: number): Promise<void> {
    await this.kv.put(`id:${username}`, id.toString())
  }

}
