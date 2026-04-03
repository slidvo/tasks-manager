import  {generateJwt,JwtPayload} from "@src/utils/jwt"

describe('generateJwt Test', ()=>{
    it("test", ()=>{
        const payload : JwtPayload = {
            id: 1,
            email: 'email@email.com'
        }

        const token = generateJwt(payload)
        console.log(`token ${token}`)
        //TODO Дописать проверку корректности токена
    })
})