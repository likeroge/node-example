import {App} from "./App";
import {config} from "../config/config";
import {userRouter} from "./domain/users/user.router";
import {paymentRouter} from "./domain/payment/payment.router";

const app = new App(config.app.port)

app.addRoute(userRouter, '/users')
app.addRoute(paymentRouter, '/payment')
app.start()