const express = require('express');
const app     = express();

app.set('config', require('./config'));
app.get('config').services.forEach(provider => provider(app));

app.listen(app.get('config').http.port, () => {
    console.log('service running');
});
