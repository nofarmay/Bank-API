const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.use(express.json());
const uniqid = require('uniqid') ;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello bank')
})

app.get('/user', (req, res) => {
 
    const contents = fs.readFileSync('data/user.json', 'utf8')
    console.log(contents)
    res.send(contents)
  })

  app.get('/account', (req, res) => { 
    const contents = fs.readFileSync('data/account.json', 'utf8')
    console.log(contents)
    res.send(contents) 
  })

  app.post('/user', (req, res) => { 
    console.log(req.body);
    const contents = fs.readFileSync('data/user.json', 'utf8')
    const users = JSON.parse(contents)
    const newUser = {id:uniqid,
    name:req.body.name,
    lastName:req.body.lastName,
    isActive:true
}
users.push(newUser)
console.log(users);
fs.writeFileSync('data/user.json',JSON.stringify(users))
    // console.log(contents)
    res.send(newUser) 
  })


  app.get('/account/:accountId', (req, res) => { 
    const accountId = req.params.accountId
    console.log(req.params);
    console.log(accountId);
    const contents = fs.readFileSync('data/account.json', 'utf8')
    const accounts = JSON.parse(contents)
    const account = accounts.find(currAccount => currAccount.id===accountId)
    res.send(account) 
  })

  app.get('/user/:userId', (req, res) => { 
    const userId = req.params.userId
    console.log(req.params);
    console.log(userId);
    const contents = fs.readFileSync('data/user.json', 'utf8')
    const users = JSON.parse(contents)
    const user = users.find(curruser => curruser.id===userId)
    res.send(user) 
  })

  app.post('/account', (req, res) => { 
    console.log(req.body);
    const contents = fs.readFileSync('data/account.json', 'utf8')
    const accounts = JSON.parse(contents)
    const newAccount = {id:"id",
    cash:"0",
    credit:"0",
    owner:req.body.owner,
}
accounts.push(newAccount)
console.log(accounts);
fs.writeFileSync('data/account.json',JSON.stringify(accounts))
    // console.log(contents)
    res.send(newAccount) 
  })

  app.post('/account/deposit',(req,res) => {
    const contents = fs.readFileSync('data/account.json', 'utf8') 
    const accounts = JSON.parse(contents)
    const accountId = req.body.id
    console.log(accountId);
    const currAccount = accounts.find(currAccount => currAccount.id===accountId)
    // res.send(accountId) 
    currAccount.cash+=req.body.amount;
    fs.writeFileSync('data/account.json',JSON.stringify(accounts));
    res.send(currAccount.cash.toString())

  } 
 )

 app.put('/account/addcredit',(req,res) => {
    const contents = fs.readFileSync('data/account.json', 'utf8') 
    const accounts = JSON.parse(contents)
    const accountId = req.body.id
    console.log(accountId);
    accounts.find(currAccount => currAccount.id===accountId)
    const currAccount = accounts.find(currAccount => currAccount.id===accountId)
    currAccount.credit+=req.body.addcredit
    fs.writeFileSync('data/account.json',JSON.stringify(accounts));
    res.send(currAccount.credit.toString())
   }
)

app.put('/account/decremente',(req,res) => { 
    const contents = fs.readFileSync('data/account.json','utf8') 
    const accounts = JSON.parse(contents)
    const accountId = req.body.id
    console.log(accountId);
    accounts.find(currAccount => currAccount.id===accountId)
    const currAccount = accounts.find(currAccount => currAccount.id===accountId)
    currAccount.credit-=req.body.decrementecredit
    fs.writeFileSync('data/account.json',JSON.stringify(accounts));
    res.send(currAccount.credit.toString())
   }
)

app.post('/account/transfer',(req,res) => { 
    const contents = fs.readFileSync('data/account.json','utf8') 
    const accounts = JSON.parse(contents)
    const accountId = req.body.id
    const reciverAccountId = req.body.reciverid
    console.log(accountId);
    accounts.find(currAccount => currAccount.id===accountId)
    const currAccount = accounts.find(currAccount => currAccount.id===accountId)
    const futureReciverAccount = accounts.find( futureReciverAccount => futureReciverAccount.id===reciverAccountId)
    const transferMoney = (transferReq ,giverCredit,reciverAccount) => {
    const transferReq = req.body.transfer
    const giverCredit = currAccount.credit
    const reciverAccount = futureReciverAccount.cash
    if (transferReq<giverCredit){currAccount.credit-=req.body.transfer,
        reciverAccount.cash+=req.body.transfer}
   else
throw "cannot transfer,there is not enough cash in the giving account"
}
    fs.writeFileSync('data/account.json',JSON.stringify(accounts));
    res.send(currAccount.transfer.toString())
   }
)
