const mongoose = require('mongoose');

// Connect to MongoDB with mongoose. Making sure indexes will be created.
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});