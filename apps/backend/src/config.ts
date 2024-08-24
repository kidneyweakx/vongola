import 'dotenv/config'

export const get_config = () => {
  return {
    CREATE_KEY: process.env.CREATE_KEY,
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  }
}