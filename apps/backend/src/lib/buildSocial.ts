import { MerkleTree } from 'merkletreejs'

export const buildSocial = (social: any) => {
  const leaves = Object.keys(social).map((key) => social[key])
  const tree = new MerkleTree(leaves, (a: any, b: any) => a + b, { sort: true })
  return tree.getHexRoot()
}