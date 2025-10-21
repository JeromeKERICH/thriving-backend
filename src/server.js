const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const helmet = require("helmet");



dotenv.config();
connectDB();



const paymentsRouter = require('./routes/payment');
const webhooksRouter = require('./routes/webhook');
const contactRouter = require('./routes/contact');
const assessmentsRouter = require('./routes/assessment');
const subscriberRoutes = require("./routes/subscriber");
const eventsRouter = require('./routes/events');
const programRegistrationRoutes = require('./routes/programRegistrationRoutes');



const app = express();

// Basic middleware
app.use(helmet());

app.use(cors({
    origin: "http://localhost:5173",  // not https
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
app.use(express.json());




// Routes (note: webhook route must use raw body and be mounted BEFORE express.json if using express.json globally)
// If express.json() applied globally, make sure webhooks route uses express.raw() as shown earlier
app.use('/api/payments', paymentsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/assessment', assessmentsRouter);
app.use("/api/subscribe", subscriberRoutes);
app.use('/api/events', eventsRouter);
app.use('/api/program-registration', programRegistrationRoutes);

// mount webhooks separately so it uses raw parser
const webhook = require('./routes/webhook');
app.use('/api/webhooks', webhook);

app.get('/', (req, res) => res.send('Thriving Moms API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
