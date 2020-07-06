const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()

const app = require("../app")

chai.use(chaiHttp)

const { expect } = chai;

describe('Testing the order endpoint:',()=>{
    it('It Should create order',(done)=>{
        const order = {
            "productName" : "Macho",
            "productId" : 84,
            "orderQuantity":50,
            "orderPrice" : 15
        };
        chai.request(app)
            .post("/api/v1/orders")
            .set("Accept","application/json")
            .send(order)
            .end((err,res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({
                    productName : order.productName,
                    productId : order.productId,
                    orderQuantity : order.orderQuantity,
                    orderPrice : order.orderPrice                    
                });
                done();
            });
    });

    it("It should not create order with incomplete details",(done)=>{
        const order = {
            "productName" : "Macho",
            "productId" : 84,
            "orderQuantity":50,
        };
        chai.request(app)
            .post("/api/v1/orders")
            .set("Accept","application/json")
            .send(order)
            .end((err,res)=>{
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("It should get all orders",(done)=>{
        chai.request(app)
            .get("/api/v1/orders")
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                res.body.data[0].should.have.property('orderId');
                res.body.data[0].should.have.property('productName')
                res.body.data[0].should.have.property('orderQuantity')
                res.body.data[0].should.have.property('orderPrice')
                done();
            });
    });

    /* it("It should get a particular order",(done)=>{
        const id = 2;
        chai.request(app)
            .get(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                res.body.data.should.have.property("orderId");
                res.body.data.should.have.property("productName");
                res.body.data.should.have.property("orderQuantity");
                res.body.data.should.have.property("orderPrice");
                done();
            });
    }); */

    it("It should not get a particular order with invalid id",(done)=>{
        const id = 85;
        chai.request(app)
            .get(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`OrderId ${id} doesnot exist to retrive data`)
                done();
            });
    });

    it("It should not get a particular order non-numeric id value",(done)=>{
        const id = "jhjhg";
        chai.request(app)
            .get(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`Please enter valid numeric value`)
                done();
            });
    });

   /*  it("It should update a order",(done)=>{
        const id = 1;
        const updateOrder = {
            productName : "Halwa",
            orderQuantity : 500,
            orderPrice : 100
        }
        chai.request(app)
            .put(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .send(updateOrder)
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                expect(res.body.data).to.include({
                    productName : updateOrder.productName,
                    orderQuantity : updateOrder.orderQuantity,
                    orderPrice : updateOrder.orderPrice
                });
                done();
            });
    }); */

    it("It should not update with invalid order id",(done)=>{
        const id = 189;
        const updateOrder = {
            productName : "Halwa",
            orderQuantity : 500,
            orderPrice : 100
        }
        chai.request(app)
            .put(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .send(updateOrder)
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`OrderId ${id} doesnot exists to update`)
                done();
            });
    });

    it("It should not update with non-numeric order id",(done)=>{
        const id = "liy";
        const updateOrder = {
            productName : "Halwa",
            orderQuantity : 500,
            orderPrice : 100
        }
        chai.request(app)
            .put(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .send(updateOrder)
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`Please enter valid numeric value`)
                done();
            });
    });

    /* it("It should delete order with paticular id",(done)=>{
        const id = 8;
        chai.request(app)
            .delete(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(200);
                res.body.should.have.property("message").eql(`Order deleted successfully`)
                done();
            });
    }); */

    it("It should not delete order with invalid order id",(done)=>{
        const id = 658;
        chai.request(app)
            .delete(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`OrderId ${id} doesnot exists to delete`)
                done();
            });
    });

    it("It should not delete order with non-numeric order id",(done)=>{
        const id = "hyt";
        chai.request(app)
            .delete(`/api/v1/orders/${id}`)
            .set("Accept","application/json")
            .end((err,res)=>{
                expect(res.status).to.equal(404);
                res.body.should.have.property("message").eql(`Please enter valid numeric value`)
                done();
            });
    });

});

