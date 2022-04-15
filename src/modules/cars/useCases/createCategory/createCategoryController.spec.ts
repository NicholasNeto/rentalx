
import { app } from '@shared/infra/http/app'
import request from 'supertest'


describe('Create Category Controller',  () => {
    it("should list available cars", async () => {
        await request(app).get("/cars/available").expect(200)
    })
})