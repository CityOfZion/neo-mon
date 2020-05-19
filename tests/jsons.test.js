const fs = require('fs')
const fetch = require('node-fetch')

const jsonFiles = ["mainnet.json", "testnet.json"]

describe("json files are valid", () => {
  jsonFiles.forEach(file => {
    test(`${file} is valid`, async () => {
      expect(()=>readJSON(file)).not.toThrow()
    })
  })
})

function readJSON(file){
  const content = fs.readFileSync(file)
  return JSON.parse(content)
}

jsonFiles.forEach(file => {
  describe(`nodes in ${file} are operational`, () => {
    readJSON(file).sites
      .filter(n=>n.type === "RPC")
      .map(n=>`${n.protocol}://${n.url}:${n.port}`)
      .forEach(node => {
        test(`${node} is up`, async () => {
          expect.assertions(4)
          try{
            const blockcountResponse = await getBlockCount(node)
            expect(blockcountResponse.id).toBe(1)
            expect(blockcountResponse.jsonrpc).toBe("2.0")
            expect(blockcountResponse.error).not.toBeDefined()
            expect(blockcountResponse.result).toBeDefined()
          } catch(e){}
        })
      })
  })
})

function getBlockCount(node){
  return fetch(node, {
    method: 'post',
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getblockcount",
      "params":[],
      "id": 1
    }),
    headers: { 'Content-Type': 'application/json' },
    timeout: 4000,
  }).then(res => res.json())
}
