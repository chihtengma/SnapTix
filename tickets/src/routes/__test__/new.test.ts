import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
   const response = await request(app).post("/api/tickets").send({});

   expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed", async () => {
   const response = await request(app).post("/api/tickets").send({});

   expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
   const response = await request(app).post("/api/tickets").set("Cookie", global.getCookie()).send({});

   expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
   await request(app)
      .post("/api/tickets")
      .set("Cookie", getCookie())
      .send({
         title: "",
         price: 10
      })
      .expect(400);
   await request(app)
      .post("/api/tickets")
      .set("Cookie", getCookie())
      .send({
         price: 10
      })
      .expect(400);
});

it("returns an error if an invalid prices is provided", async () => {
   await request(app)
      .post("/api/tickets")
      .set("Cookie", getCookie())
      .send({
         title: "test",
         price: -10
      })
      .expect(400);
   await request(app)
      .post("/api/tickets")
      .set("Cookie", getCookie())
      .send({
         title: "test"
      })
      .expect(400);
});

it("creates a ticket with valid input", async () => {
   let tickets = await Ticket.find({});
   expect(tickets.length).toEqual(0);

   await request(app)
      .post("/api/tickets")
      .set("Cookie", global.getCookie())
      .send({
         title: "test",
         price: 20
      })
      .expect(201);

   tickets = await Ticket.find({});
   expect(tickets.length).toEqual(1);
});
