const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {MONGO_URL, FRONT_URL} = require("./config");

const filters = require("./routes/filters");
const scrapingProduct = require("./routes/scrapingProduct");
const config = require("./config");

app.use(
	cors({
		// origin: config.FRONT_URL,
		origin: '*',
	})
);

// Body-parser middleware
app.use(
	bodyParser.json({
		limit: '50mb',
	}));

// Connect to MongoDB
mongoose
	.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

app.use('/test', (req, res) => {
	return res.status(200).json({welcome: 'welcome to here'});
});
app.use("/api/filters", filters);
app.use("/api/scrapingProduct", scrapingProduct);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
